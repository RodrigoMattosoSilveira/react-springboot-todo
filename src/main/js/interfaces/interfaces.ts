// Todo interface
export interface TodoInterface {
  id: string;
  text: string;
  priority: string,
  isCompleted: boolean;
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
    id: string,
	priority: string,
    text: string,
	todos: TodoInterface[];
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

// Rest Parameters Links Interface
export interface RestLinksActionInterface {
	type: string,
	links: any
}
