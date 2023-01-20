import TodoUseCase from 'domain/useCases/TodoUseCase'
import { provideTodoRepository } from 'di/repository'

export const provideTodoUseCase = () => {
  return new TodoUseCase(provideTodoRepository())
}
