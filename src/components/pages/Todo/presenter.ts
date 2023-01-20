import TodoUseCase from 'domain/useCases/TodoUseCase'

export default class TodoPresenter {
  constructor(private readonly todoUseCase: TodoUseCase) {}

  getTodos() {
    return this.todoUseCase.getTodos()
  }
}
