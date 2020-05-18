'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const when = require('when');
const client = require('./client');

const follow = require('./follow'); // function to hop multiple links by "rel"
const stompClient = require('./websocket-listener');

const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todos: [], attributes: [], page: 1, pageSize: 2, links: {}, loggedInOwner: this.props.loggedInOwner};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
        this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
    }

    loadFromServer(pageSize) {
        follow(client, root, [ // <1>
            {rel: 'todos', params: {size: pageSize}}]
        ).then(todoCollection => { // <2>
            return client({
                method: 'GET',
                path: todoCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                /**
                 * Filter unneeded JSON Schema properties, like uri references and
                 * subtypes ($ref).
                 */
                Object.keys(schema.entity.properties).forEach(function (property) {
                    if (schema.entity.properties[property].hasOwnProperty('format') &&
                        schema.entity.properties[property].format === 'uri') {
                        delete schema.entity.properties[property];
                    }
                    else if (schema.entity.properties[property].hasOwnProperty('$ref')) {
                        delete schema.entity.properties[property];
                    }
                });

                this.schema = schema.entity;
                this.links = todoCollection.entity._links;
                return todoCollection;
            });
        }).then(todoCollection => { // <3>
            return todoCollection.entity._embedded.todos.map(todo =>
                client({
                    method: 'GET',
                    path: todo._links.self.href
                })
            );
        }).then(todoPromises => { // <4>
            return when.all(todoPromises);
        }).done(todos => { // <5>
            this.setState({
                todos: todos,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: this.links
            });
        });
    }

    onCreate(newTodo) {
        follow(client, root, ['todos']).done(response => {
            client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: newTodo,
                headers: {'Content-Type': 'application/json'}
            })
        })
    }

    onUpdate(todo, updatedTodo) {
        if(todo.entity.owner.name === this.state.loggedInOwner) {
            updatedTodo["owner"] = todo.entity.owner;
            client({
                method: 'PUT',
                path: todo.entity._links.self.href,
                entity: updatedTodo,
                headers: {
                    'Content-Type': 'application/json',
                    'If-Match': todo.headers.Etag
                }
            }).done(response => {
                /* Let the websocket handler update the state */
            }, response => {
                if (response.status.code === 403) {
                    alert('ACCESS DENIED: You are not authorized to update ' +
                        todo.entity._links.self.href);
                }
                if (response.status.code === 412) {
                    alert('DENIED: Unable to update ' + todo.entity._links.self.href +
                        '. Your copy is stale.');
                }
            });
        } else {
            alert("You are not authorized to update");
        }
    }

    onDelete(todo) {
        client({method: 'DELETE', path: todo.entity._links.self.href}
        ).done(response => {/* let the websocket handle updating the UI */},
            response => {
                if (response.status.code === 403) {
                    alert('ACCESS DENIED: You are not authorized to delete ' +
                        todo.entity._links.self.href);
                }
            });
    }

    onNavigate(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then(todoCollection => {
            this.links = todoCollection.entity._links;

            return todoCollection.entity._embedded.todos.map(todo =>
                client({
                    method: 'GET',
                    path: todo._links.self.href
                })
            );
        }).then(todoPromises => {
            return when.all(todoPromises);
        }).done(todos => {
            this.setState({
                todos: todos,
                attributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.loadFromServer(pageSize);
        }
    }

    refreshAndGoToLastPage(message) {
        follow(client, root, [{
            rel: 'todos',
            params: {size: this.state.pageSize}
        }]).done(response => {
            if (response.entity._links.last !== undefined) {
                this.onNavigate(response.entity._links.last.href);
            } else {
                this.onNavigate(response.entity._links.self.href);
            }
        })
    }

    refreshCurrentPage(message) {
        follow(client, root, [{
            rel: 'todos',
            params: {
                size: this.state.pageSize,
                page: this.state.page.number
            }
        }]).then(todoCollection => {
            this.links = todoCollection.entity._links;
            this.page = todoCollection.entity.page;

            return todoCollection.entity._embedded.todos.map(todo => {
                return client({
                    method: 'GET',
                    path: todo._links.self.href
                })
            });
        }).then(todoPromises => {
            return when.all(todoPromises);
        }).then(todos => {
            this.setState({
                page: this.page,
                todos: todos,
                attributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
        stompClient.register([
            {route: '/topic/newTodo', callback: this.refreshAndGoToLastPage},
            {route: '/topic/updateTodo', callback: this.refreshCurrentPage},
            {route: '/topic/deleteTodo', callback: this.refreshCurrentPage}
        ]);

    }

    render() {
        return (
            <div>
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                <TodoList todos={this.state.todos}
                              links={this.state.links}
                              pageSize={this.state.pageSize}
                              attributes={this.state.attributes}
                              onNavigate={this.onNavigate}
                              onUpdate={this.onUpdate}
                              onDelete={this.onDelete}
                              updatePageSize={this.updatePageSize}
                              loggedInOwner={this.state.loggedInOwner}/>
            </div>
        )
    }
}

class CreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newTodo = {};
        this.props.attributes.forEach(attribute => {
            newTodo[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onCreate(newTodo);
        this.props.attributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = ''; // clear out the dialog's inputs
        });
        window.location = "#";
    }

    render() {
        const inputs = this.props.attributes.map(attribute =>
            {
                switch (attribute) {
                    case "text":
                        return (
                            <p key={attribute}>
                                <input type="text" placeholder={attribute} ref={attribute} className="field"/>
                            </p>
                        )
                    case "priority":
                        return (
                            <p key={attribute}>
                                priority: <select id="priority" placeholder={attribute} ref={attribute} className="field">
                                <option value="LOW" selected>LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>
                            </p>
                        )
                    case "isCompleted":
                        return (
                            <p key={attribute}>
                                isCompleted: <select id="priority" placeholder={attribute} ref={attribute} className="field" disabled>
                                <option value="false" selected>false</option>
                                <option value="true">true</option>
                            </select>
                            </p>
                        )
                }
            }
        );
        return (
            <div>
                <a href="#createTodo">Create</a>

                <div id="createTodo" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Create new todo</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

class UpdateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleIsCompletedChange = this.handleIsCompletedChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const updatedTodo = {};
        this.props.attributes.forEach(attribute => {
            let node = ReactDOM.findDOMNode(this.refs[attribute]);
            let index = null;
            let options = null
            switch (attribute) {
                case "text":
                    updatedTodo[attribute] = node.value.trim();
                    break;
                case "priority":
                    updatedTodo[attribute] = node.value;
                    break
                case "isCompleted":
                     break
                default:
                    break
            }
            let work =  ReactDOM.findDOMNode(this.refs[attribute]).value.trim()
            updatedTodo[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onUpdate(this.props.todo, updatedTodo);
        window.location = "#";
    }

    handlePriorityChange(event) {
        let node = ReactDOM.findDOMNode(this.refs["priority"]);
        node.value = event.target.value
    }

    handleIsCompletedChange(event) {
        let node = ReactDOM.findDOMNode(this.refs["isCompleted"]);
        node.value = event.target.value
    }

    render() {
        const inputs = this.props.attributes.map(attribute =>
            {
                switch (attribute) {
                    case "text":
                        return (
                            <p key={attribute}>
                                <input type="text"
                                       placeholder={attribute}
                                       defaultValue={this.props.todo.entity[attribute]}
                                       ref={attribute} className="field"/>
                            </p>
                        )
                    case "priority":
                        return (
                            <p key={attribute}>
                                priority: <select id="priority" placeholder={attribute} ref={attribute} className="field" defaultValue={this.props.todo.entity[attribute]} onChange={this.handlePriorityChange}>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>
                            </p>
                        )
                    case "isCompleted":
                        return (
                            <p key={attribute}>
                                isCompleted: <select id="priority" placeholder={attribute} ref={attribute} className="field" defaultValue={this.props.todo.entity[attribute]} onChange={this.handleIsCompletedChange}>
                                <option value="false">false</option>
                                <option value="true">true</option>
                            </select>
                            </p>
                        )
                }
            }
        );

        const dialogId = "updateTodo-" + this.props.todo.entity._links.self.href;
        const isOwnerCorrect = this.props.todo.entity.owner.name === this.props.loggedInOwner;

        if (isOwnerCorrect === false) {
            return (
                <div>
                    <a>Not Your Todo</a>
                </div>
            )
        } else {
            return (
                <div key={this.props.todo.entity._links.self.href}>
                    <a href={"#" + dialogId}>Update</a>
                    <div id={dialogId} className="modalDialog">
                        <div>
                            <a href="#" title="Close" className="close">X</a>

                            <h2>Update an todo</h2>

                            <form>
                                {inputs}
                                <button onClick={this.handleSubmit}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }

};

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
        const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
        }
    }

    handleNavFirst(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }
    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }
    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }
    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }

    render() {
        const todos = this.props.todos.map(todo =>
            <Todo key={todo.entity._links.self.href}
                      todo={todo}
                      attributes={this.props.attributes}
                      onUpdate={this.props.onUpdate}
                      onDelete={this.props.onDelete}
                      loggedInOwner={this.props.loggedInOwner}/>
        );

        const navLinks = [];
        if ("first" in this.props.links) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
        }
        if ("prev" in this.props.links) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
        }
        if ("next" in this.props.links) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
        }
        if ("last" in this.props.links) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
        }

        return (
            <div>
                <input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                <table>
                    <tbody>
                    <tr>
                        <th>State</th>
                        <th>Text</th>
                        <th>Priority</th>
                        <th>Owner</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {todos}
                    </tbody>
                </table>
                <div>
                    {navLinks}
                </div>
            </div>
        )
    }
}

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.todo);
    }

    render() {
        return (
            <tr>
                <td>{this.props.todo.entity.isCompleted ? 'Done' : 'Open'}</td>
                <td>{this.props.todo.entity.text}</td>
                <td>{this.props.todo.entity.priority}</td>
                <td>{this.props.todo.entity.owner.name}</td>
                <td>
                    <UpdateDialog todo={this.props.todo}
                                  attributes={this.props.attributes}
                                  onUpdate={this.props.onUpdate}
                                  loggedInOwner={this.props.loggedInOwner}/>
                </td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}

ReactDOM.render(
    <App loggedInOwner={document.getElementById('ownername').innerHTML} />,
    document.getElementById('react')
)
