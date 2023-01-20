import { Todo } from 'domain/entities/Todo'

export interface TodoRepository {
  getTodos(): Todo[]
}
