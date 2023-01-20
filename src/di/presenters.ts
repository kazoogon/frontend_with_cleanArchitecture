import TodoPresenter from 'components/pages/Todo/presenter'
import { provideTodoUseCase } from 'di/useCases'

export const provideTodoPresenter = () => {
  return new TodoPresenter(provideTodoUseCase())
}
