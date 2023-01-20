import { TodoRepository } from 'domain/repositories/TodoRepository'

export default class TodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  getTodos() {
    return this.todoRepository.getTodos()
  }
}
