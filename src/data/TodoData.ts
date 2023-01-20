// ここでAPIやlocalStorageとのやりとり
import { Todo } from 'domain/entities/Todo'

export default class TodoData {
  getTodos(): Todo[] {
    return [{ content: 'fish' }, { content: 'rice' }, { content: 'banana' }]
  }
}
