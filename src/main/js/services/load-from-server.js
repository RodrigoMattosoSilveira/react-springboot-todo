'use strict';

const when = require('when');
const client = require('./client');
const follow = require('./follow'); // function to hop multiple links by "rel"


const root = '/api';

module.exports = function loadFromServer(pageSize)  {
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
