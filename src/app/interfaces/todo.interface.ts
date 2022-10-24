export interface ITodo {
  id: string;
  userId: string
  todoTitle: string;
  isCompleted: boolean;
  createdAt: Date
}

export interface IAddTodoRequest {
  todoTitle: string
}

export interface IAddTodoSuccessResponse {
  todo: ITodo
}

export interface IRemoveTodoRequest {
  todoId: string
}

export interface IRemoveTodoSuccessResponse {
  todos: ITodo[]
}

export interface ICompleteTodoRequest {
  todoId: string
}

export interface ICompleteTodoSuccessResponse {
  todo: ITodo
}
