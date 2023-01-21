import { Todo } from 'domain/entities/Todo'

export interface TodoRepository {
  getTodos(): Todo[]
  deleteTodo(id: number): Todo[]
  addTodo(val: string): Todo[]
  updateTodo(item: Todo): Todo[]
}
