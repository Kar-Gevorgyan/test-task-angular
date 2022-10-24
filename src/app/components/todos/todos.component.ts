import {Component} from '@angular/core';
import * as fromTodo from "../../state/todo/todo.reducer";
import {Store} from "@ngrx/store";
import * as TodoActions from "../../state/todo/todo.actions"
import {map} from "rxjs";
import {faUpDown, faArrowUpWideShort, faArrowDownShortWide} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  public todoTitle: string = '';
  public searchTodoTitle: string = '';
  public status: string = 'all';

  public todoTitleSort: string = '';
  public createdAtSort: string = '';

  public todoTitleSortIcon = faUpDown
  public createdAtSortIcon = faUpDown

  public itemsPerPage: number = 5
  todos$ = this.store
    .select(fromTodo.selectTodos)

  constructor(
    private store: Store<fromTodo.State>,
  ) {
  }

  addTodo() {
    this.store.dispatch(TodoActions.addTodoRequest({todoTitle: this.todoTitle}))
    this.todoTitle = ''
  }

  removeTodo(todoId: string) {
    this.store.dispatch(TodoActions.removeTodoRequest({todoId}))
  }

  completeTodo(todoId: string) {
    this.store.dispatch(TodoActions.completeTodoRequest({todoId}))
  }

  changeStatus() {
    this.todos$ = this.todos$.pipe(
      map(todos => todos.filter(todo => this.status === 'all' ? todo : this.status === 'completed' ? todo.isCompleted : !todo.isCompleted)
      ))
  }

  searchTodos() {
    this.todos$ = this.todos$.pipe(
      map(todos => todos.filter(todo => todo.todoTitle.search(this.searchTodoTitle) !== -1))
    )
  }

  sortTableByTodoTitle() {
    this.createdAtSortIcon = faUpDown
    this.createdAtSort = ''
    this.todoTitleSortIcon = !this.todoTitleSort ? faArrowDownShortWide : this.todoTitleSort === 'asc' ? faArrowUpWideShort : faUpDown
    this.todoTitleSort = !this.todoTitleSort ? 'asc' : this.todoTitleSort === 'asc' ? 'desc' : ''

    this.todos$ = this.todos$.pipe(
      map((todos) => {
        if(!this.todoTitleSort)
          return todos
        else
          todos = [...todos]
          todos.sort((a, b) => {
            return a.todoTitle > b.todoTitle ? 1 : -1
          })

          return this.todoTitleSort === 'asc' ? todos : todos.reverse();
      })
    )
  }

  sortTableByCreatedAt() {
    this.todoTitleSortIcon = faUpDown
    this.todoTitleSort = ''
    this.createdAtSortIcon = !this.createdAtSort ? faArrowDownShortWide : this.createdAtSort === 'asc' ? faArrowUpWideShort : faUpDown
    this.createdAtSort = !this.createdAtSort ? 'asc' : this.createdAtSort === 'asc' ? 'desc' : ''

    this.todos$ = this.todos$.pipe(
      map((todos) => {
        if(!this.createdAtSort)
          return todos
        else
          todos = [...todos]
          todos.sort((a, b) => {
            return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? 1 : -1
          })

        return this.createdAtSort === 'asc' ? todos : todos.reverse();
      })
    )
  }

  changeItemsPerPage() {
    console.log(this.itemsPerPage);
  }
}
