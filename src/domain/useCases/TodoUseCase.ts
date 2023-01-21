import { TodoRepository } from 'domain/repositories/TodoRepository'
import { Todo } from 'domain/entities/Todo'

export default class TodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  getTodos() {
    return this.todoRepository.getTodos()
  }

  deleteTodo(id: number) {
    return this.todoRepository.deleteTodo(id)
  }

  createTodo(val: string) {
    return this.todoRepository.createTodo(val)
  }

  updateTodo(item: Todo) {
    return this.todoRepository.updateTodo(item)
  }
}
