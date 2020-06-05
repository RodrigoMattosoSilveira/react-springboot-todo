import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "../reducers/rootReducer";
import axios from 'axios';

export const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(axios)));
