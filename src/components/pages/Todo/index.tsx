import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Todo } from 'domain/entities/Todo'
import { provideTodoPresenter } from 'di/presenters'

const todoPresenter = provideTodoPresenter()

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>()
  const [newTodoValue, setNewTodoValue] = useState<string>('')

  useEffect(() => {
    setTodos(todoPresenter.getTodos())
  }, [])

  const deleteItem = (id: number) => {
    const res = todoPresenter.deleteTodo(id)
    setTodos(res)
  }

  const addTodo = () => {
    const res = todoPresenter.addTodo(newTodoValue)
    setTodos(res)
    setNewTodoValue('')
  }

  const list =
    todos &&
    todos.map((item: Todo) => {
      const { content, id }: Todo = item
      return (
        <ListItem
          key={id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon onClick={() => deleteItem(id)} />
            </IconButton>
          }
        >
          <ListItemText primary={content} />
        </ListItem>
      )
    })

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          my list
        </Typography>
        <List>{list}</List>
      </Grid>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          id="add"
          label="add new list"
          variant="filled"
          value={newTodoValue}
          onChange={(e) => setNewTodoValue(e.target.value)}
        />
        <Box sx={{ display: 'block' }}>
          <Button
            variant="contained"
            disabled={newTodoValue.length === 0}
            onClick={() => addTodo()}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default TodoList
