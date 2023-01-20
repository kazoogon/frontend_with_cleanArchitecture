import { provideTodoPresenter } from 'di/presenters'

export const useTodos = () => {
  return provideTodoPresenter()
}
