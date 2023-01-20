import React from 'react'
import { useTodos } from 'components/pages/Todo/hook'
import { Todo } from 'domain/entities/Todo'

const TodoList = () => {
  const list = useTodos().getTodos()
  return (
    <ul>
      {list.map((item: Todo) => (
        <li>{item.content}</li>
      ))}
    </ul>
  )
}

export default TodoList
