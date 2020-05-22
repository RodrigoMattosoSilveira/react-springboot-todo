import { TODO_ACTIONS } from '../references/references';
import { TodoActionInterface } from '../interfaces/interfaces';
import { TodoInterface } from '../interfaces/interfaces';
import shortid from "shortid";

const seedTodoList:TodoInterface[] = [
	{id: shortid.generate(), text: 'Learn Scala', isCompleted: false},
	{id: shortid.generate(), text: 'Learn Akka', isCompleted: true},
	{id: shortid.generate(), text: 'Learn MUI Styles', isCompleted: false}
];

export const todo_reducer = (state: TodoInterface[] = seedTodoList, action: TodoActionInterface): TodoInterface[] => {
    switch (action.type) {
        case TODO_ACTIONS.CREATE:
            const todo: TodoInterface =     {
                    id: action.id,
                    text: action.text,
                    isCompleted: false
                }
            return [...state,todo];
        case TODO_ACTIONS.TOGGLE:
            return state.map((todo: TodoInterface) =>
                (todo.id === action.id)
                    ? {...todo, isCompleted: !todo.isCompleted}
                    : todo
            )
        case TODO_ACTIONS.UPDATE:
        return state.map((todo: TodoInterface) =>
                (todo.id === action.id)
                    ? {...todo, text: action.text}
                    : todo
            )
        case TODO_ACTIONS.DELETE:
            return state.filter((todo: TodoInterface) => todo.id !== action.id)
        default:
            return state;
    }
}
