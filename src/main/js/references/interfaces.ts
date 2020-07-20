// Todo Rest Interface
export interface TodoRestInterface {
	config: any;
	data: TodoInterface;
	headers: any;
	request: XMLHttpRequest;
	status: number;
	statusText: string;
}

// Todo interface
export interface TodoInterface {
  text: string;
  priority: string,
  isCompleted: boolean;
  owner: Owner;
  _links: Links;
}

export interface Owner {
	name: string;
	roles: string[];
}

export interface Links {
	self: Href,
	todo: Href
}

export interface Href {
	href: string
}

// Todo form interface
export interface TodoFormInterface {
  todos: TodoInterface[];
  handleTodoCreate: (todo: TodoInterface) => void;
}

// Todo list interface
export interface TodoListInterface {
  todos: TodoInterface[];
  visibilityFilter: string;
  handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleTodoRemove: (id: string) => void;
  handleTodoComplete: (id: string) => void;
  handleTodoBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Todo item interface
export interface TodoItemInterface {
  handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleTodoRemove: (id: string) => void;
  handleTodoComplete: (id: string) => void;
  handleTodoBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  todo: TodoInterface;
}

// Visibility Filter interface
export interface VisibilityFiltersInterface {
    visibilityFilter: string;
    handleVisibilityFilter: (filter: string) => void;
}

// Todo Action Interface
export interface TodoActionInterface {
    type: string,
	todos: TodoRestInterface[];
}

// Visibility Action Interface
export interface VisibilityFilterActionInterface {
    type: string,
    filter: string
}

// User name Action Interface
export interface AuthenticatedUserActionInterface {
	type: string,
	user_name: string
}

// Rest Parameters Action Interface
export interface RestAttributesActionInterface {
	type: string,
	attributes: any,
}

// Rest Parameters PageSize Interface
export interface RestPageSizeActionInterface {
	type: string,
	pageSize: number,
}

export interface IRestRootAction {
	type: string,
	root: string
}

// Rest Parameters Links Interface
export interface RestLinksActionInterface {
	type: string,
	links: any
}

export type PaginationLinks = { [key: string]: any };

export interface IHalPage {
	number?: number,			// the number of current page
	size?: number, 		    // the number rows per page, a.k.a page size
	totalElements?: number, 	// the number of domain rows
	totalPages?: number     	// the number of pages
}

export interface IHalPageAction {
	type: string,
	halPage: IHalPage
}

export interface ITodoItemStateFilter {
	active?: boolean,
	completed?: boolean
}

export interface ITodoItemStateFilterAction {
	type: string,
	filterType: ITodoItemStateFilter
}

export interface IPrioritiesFilter {
	low?: boolean,
	medium?: boolean,
	high?: boolean
}

export interface IPrioritiesFilterAction {
	type: string,
	filterType: IPrioritiesFilter
}

export interface IWebSocketMessage {
	type: string,
	message: {}
}
export interface  IWebsocketStore {
	count: number,
	messages: IWebSocketMessage[]
}
export interface  IWebsocketAction {
	type: string,
	message?: IWebSocketMessage
}

export interface IWebsocketCallback {
	route: string,
	callback: () => void
}
