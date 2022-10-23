export interface ITodo {
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
