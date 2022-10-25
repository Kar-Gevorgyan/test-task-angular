import {Component, OnInit} from '@angular/core';
import * as fromTodo from "../../state/todo/todo.reducer";
import {Store} from "@ngrx/store";
import * as TodoActions from "../../state/todo/todo.actions"
import {map} from "rxjs/operators";
import {faUpDown, faArrowUpWideShort, faArrowDownShortWide} from '@fortawesome/free-solid-svg-icons';
import {ITodo} from "../../interfaces/todo.interface";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit{
  public todoTitle: string = '';
  public searchTodoTitle: string = '';
  public status: string = 'all';

  public todoTitleSort: string = '';
  public createdAtSort: string = '';

  public todoTitleSortIcon = faUpDown
  public createdAtSortIcon = faUpDown

  todos$ = this.store
    .select(fromTodo.selectTodos)
  public todosData: ITodo[] = []

  public itemsPerPage: number = 5
  public pages: number[] = []
  public currentPage: number = 1;

  constructor(
    private store: Store<fromTodo.State>,
  ) {
  }

  ngOnInit() {
    this.todos$.subscribe(todos => {
      this.todosData = todos
    });
    this.createPaginationPages(this.todosData)
    this.paginateTodos()
  }

  addTodo() {
    this.store.dispatch(TodoActions.addTodoRequest({todoTitle: this.todoTitle}))
    this.todoTitle = ''
    this.filterTodoData()
    this.paginateTodos()
  }

  removeTodo(todoId: string) {
    this.store.dispatch(TodoActions.removeTodoRequest({todoId}))
    this.filterTodoData()
    this.paginateTodos()
  }

  completeTodo(todoId: string) {
    this.store.dispatch(TodoActions.completeTodoRequest({todoId}))
    this.filterTodoData()
    this.paginateTodos()
  }

  sortTableByTodoTitle() {
    if (this.todosData.length)
      this.createdAtSortIcon = faUpDown
      this.createdAtSort = ''
      this.todoTitleSortIcon = !this.todoTitleSort ? faArrowDownShortWide : this.todoTitleSort === 'asc' ? faArrowUpWideShort : faUpDown
      this.todoTitleSort = !this.todoTitleSort ? 'asc' : this.todoTitleSort === 'asc' ? 'desc' : ''

      if (this.todoTitleSort)
        this.todosData.sort((a, b) => {
          return a.todoTitle > b.todoTitle ? 1 : -1
        })

      this.todosData = this.todoTitleSort === 'asc' ? this.todosData : this.todosData.reverse();
  }

  sortTableByCreatedAt() {
    if (this.todosData.length)
      this.todoTitleSortIcon = faUpDown
      this.todoTitleSort = ''
      this.createdAtSortIcon = !this.createdAtSort ? faArrowDownShortWide : this.createdAtSort === 'asc' ? faArrowUpWideShort : faUpDown
      this.createdAtSort = !this.createdAtSort ? 'asc' : this.createdAtSort === 'asc' ? 'desc' : ''

      if (this.createdAtSort)
        this.todosData.sort((a, b) => {
          return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? 1 : -1
        })

      this.todosData = this.createdAtSort === 'asc' ? this.todosData : this.todosData.reverse();
  }

  changeStatus() {
    this.filterTodoData()
    this.paginateTodos()
  }

  searchTodos() {
    this.filterTodoData()
    this.paginateTodos()
  }

  changeItemsPerPage() {
    this.filterTodoData()
    this.paginateTodos()
  }

  filterTodoData() {
    this.todos$.pipe(
      map(todos => todos.filter(todo => (this.status === 'all' ? todo : this.status === 'completed' ? todo.isCompleted : !todo.isCompleted) && todo.todoTitle.search(this.searchTodoTitle) !== -1))
    )
      .subscribe(todos => this.todosData = todos)
    this.createPaginationPages(this.todosData)
  }

  createPaginationPages(todos: ITodo[]) {
    const lastPage = Math.ceil(this.todosData.length / this.itemsPerPage)
    this.currentPage = this.currentPage < lastPage ? this.currentPage : lastPage
    this.pages = []
    todos.forEach((todo, index) => {
        if (!this.pages.includes(Math.ceil((index + 1) / this.itemsPerPage)))
          this.pages.push(Math.ceil((index + 1) / this.itemsPerPage))
    })
  }

  setCurrentPage(page: number) {
    this.filterTodoData()
    this.currentPage = page
    this.paginateTodos()
  }

  paginateTodos() {
    this.todosData = this.todosData.filter((todo, index) => ((index >= (this.currentPage - 1) * this.itemsPerPage) && (index < this.currentPage * this.itemsPerPage)))
  }
}
