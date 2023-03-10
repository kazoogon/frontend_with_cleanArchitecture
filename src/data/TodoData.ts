// ここでAPIやlocalStorageとのやりとり
import { Todo } from 'domain/entities/Todo'

const KEY_NAME = 'list'
const defaultList = [
  { content: 'fish', id: 0 },
  { content: 'rice', id: 1 },
  { content: 'banana', id: 2 },
]

// TODO: need to think about dependency of database place
const setToLocalStorage = (todos: Todo[]) => {
  const json = JSON.stringify(todos, undefined, 1)
  localStorage.setItem(KEY_NAME, json)
}

// it looks like useCase code, but it's just alternate of backend
export default class TodoData {
  getTodos(): Todo[] {
    let data = localStorage.getItem(KEY_NAME)
    if (data) {
      return JSON.parse(data)
    }

    setToLocalStorage(defaultList)
    return defaultList
  }

  deleteTodo(id: number): Todo[] {
    const deletedData = this.getTodos().filter((item: Todo) => item.id !== id)
    setToLocalStorage(deletedData)
    return deletedData
  }

  createTodo(val: string): Todo[] {
    const todos = this.getTodos()
    const lastDataId = todos.length > 0 ? todos.slice(-1)[0].id : 0
    todos.push({ content: val, id: lastDataId + 1 })
    setToLocalStorage(todos)

    return todos
  }

  updateTodo(item: Todo): Todo[] {
    const todos = this.getTodos()
    const index = todos.findIndex((todo: Todo) => todo.id === item.id)
    todos[index] = item
    setToLocalStorage(todos)

    return todos
  }
}
