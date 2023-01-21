import { Todo } from 'domain/entities/Todo'

export interface TodoRepository {
  getTodos(): Todo[]
  deleteTodo(id: number): Todo[]
  createTodo(val: string): Todo[]
  updateTodo(item: Todo): Todo[]
}
