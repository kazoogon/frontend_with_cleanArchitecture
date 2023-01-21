import TodoUseCase from 'domain/useCases/TodoUseCase'
import { Todo } from 'domain/entities/Todo'

export default class TodoPresenter {
  constructor(private readonly todoUseCase: TodoUseCase) {}

  getTodos() {
    return this.todoUseCase.getTodos()
  }

  deleteTodo(id: number) {
    return this.todoUseCase.deleteTodo(id)
  }

  createTodo(val: string) {
    return this.todoUseCase.createTodo(val)
  }

  updateTodo(item: Todo) {
    return this.todoUseCase.updateTodo(item)
  }
}
