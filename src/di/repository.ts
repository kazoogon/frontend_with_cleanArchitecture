import { TodoRepository } from 'domain/repositories/TodoRepository'
import TodoData from 'data/TodoData'

export const provideTodoRepository = (): TodoRepository => {
  return new TodoData()
}
