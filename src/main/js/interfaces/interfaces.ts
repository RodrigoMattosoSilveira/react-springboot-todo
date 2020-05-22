// Todo interface
export interface TodoInterface {
  id: string;
  text: string;
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
    text: string
}

// Visibility Action Interface
export interface VisibilityFilterActionInterface {
    type: string,
    filter: string
}
