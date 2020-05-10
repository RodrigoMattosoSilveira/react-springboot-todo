'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

const follow = require('./follow'); // function to hop multiple links by "rel"

const root = '/api';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {todos: [], attributes: [], pageSize: 20, links: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
	}

	// tag::follow-2[]
	loadFromServer(pageSize) {
		follow(client, root, [{rel: 'todos', params: {size: pageSize}}]
		).then(todoCollection => {
			return client({
				method: 'GET',
				path: todoCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return todoCollection;
			});
		}).done(todoCollection => {
			this.setState({
				todos: todoCollection.entity._embedded.todos,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: todoCollection.entity._links});
		});
	}
	// end::follow-2[]

	// tag::create[]
	onCreate(newTodo) {
		follow(client, root, ['todos']).then(todoCollection => {
			return client({
				method: 'POST',
				path: todoCollection.entity._links.self.href,
				entity: newTodo,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [
				{rel: 'todos', params: {'size': this.state.pageSize}}]);
		}).done(response => {
			if (typeof response.entity._links.last !== "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		});
	}
	// end::create[]

	// tag::delete[]
	onDelete(todo) {
		client({method: 'DELETE', path: todo._links.self.href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}
	// end::delete[]

	// tag::navigate[]
	onNavigate(navUri) {
		client({method: 'GET', path: navUri}).done(todoCollection => {
			this.setState({
				todos: todoCollection.entity._embedded.todos,
				attributes: this.state.attributes,
				pageSize: this.state.pageSize,
				links: todoCollection.entity._links
			});
		});
	}
	// end::navigate[]

	// tag::update-page-size[]
	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}
	// end::update-page-size[]

	// tag::follow-1[]
	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}
	// end::follow-1[]

	render() {
		return (
			<div>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
				<TodoList todos={this.state.todos}
							  links={this.state.links}
							  pageSize={this.state.pageSize}
							  onNavigate={this.onNavigate}
							  onDelete={this.onDelete}
							  updatePageSize={this.updatePageSize}/>
			</div>
		)
	}
}

// tag::create-dialog[]
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

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
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
// end::create-dialog[]

class TodoList extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	// tag::handle-page-size-updates[]
	handleInput(e) {
		e.preventDefault();
		const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value =
				pageSize.substring(0, pageSize.length - 1);
		}
	}
	// end::handle-page-size-updates[]

	// tag::handle-nav[]
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
			<Todo key={todo._links.self.href} todo={todo} onDelete={this.props.onDelete}/>
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
				<td>{this.props.todo.isCompleted ? 'Done' : 'Open'}</td>
				<td>{this.props.todo.text}</td>
                <td>{this.props.todo.priority}</td>
				<td>
					<button onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
