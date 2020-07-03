'use strict';

// Internal dependencies
import { client_setup_get } from './client';
import {todos_read} from "../actions/todos-actions";
import { set_rest_attributes_action, set_rest_links_action } from "../actions/rest_actions";
import {set_hal_page} from "../actions/hal-page-actions";
const follow = require('./follow'); // function to hop multiple links by "rel"

export const loadFromServer = (pageSize, root, dispatch) => {
    const client = client_setup_get();
    follow(client, root,[
        {rel: 'todos', params: {size: pageSize}}]
    ).then(todoCollection => { // <2>
        dispatch(set_hal_page(todoCollection.data.page));
        client({
            method: 'GET',
            url: todoCollection.data._links.profile.href,
            headers: {'Accept': 'application/schema+json'}
        }).then(response => {
            /**
             * Filter unneeded JSON Schema properties, like uri references and
             * subtypes ($ref).
             */
            Object.keys(response.data.properties).forEach(function (property) {
                if (response.data.properties[property].hasOwnProperty('format') &&
                    response.data.properties[property].format === 'uri') {
                    delete response.data.properties[property];
                }
                else if (response.data.properties[property].hasOwnProperty('$ref')) {
                    delete response.data.properties[property];
                }
            });

            // this.response = response.entity;
            // this.links = todoCollection.entity._links;
            dispatch(set_rest_attributes_action(Object.keys(response.data.$schema)));
            // console.log('loadFromServer/links');
            // console.log(todoCollection.data._links);
            dispatch(set_rest_links_action(todoCollection.data._links));

            // save the page object

            const todoPromises = todoCollection.data._embedded.todos.map (todo =>
                client({ method: 'GET', url: todo._links.self.href }))
            Promise.all(todoPromises)
                .then(function (collection) {
                    const todos = collection.map(todo => todo)
                    dispatch(todos_read(todos));
                });
        });
    });
}
