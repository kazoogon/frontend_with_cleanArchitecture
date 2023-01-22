import React, { useEffect, useReducer, useState } from 'react'
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
import EditIcon from '@mui/icons-material/Edit'
import { Todo } from 'domain/entities/Todo'
import { provideTodoPresenter } from 'di/presenters'
import EditTodoModal from 'components/modals/editTodoModal'
import { KEY_ENTER } from 'components/pages/Todo/constant'

const todoPresenter = provideTodoPresenter()

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>()
  const [createInputValue, setCreateInputValue] = useState<string>('')
  const [update, setUpdate] = useReducer(
    (data: any, partialData: any) => ({ ...data, ...partialData }),
    { isUpdateMode: false, currentUpdateItem: {} }
  )

  useEffect(() => {
    setTodos(todoPresenter.getTodos())
  }, [])

  const deleteItem = (id: number) => {
    const res = todoPresenter.deleteTodo(id)
    setTodos(res)
  }

  const createItem = () => {
    const res = todoPresenter.createTodo(createInputValue)
    setTodos(res)
    setCreateInputValue('')
  }

  const updateModalOpen = (item: Todo) => {
    setUpdate({ isUpdateMode: true, currentUpdateItem: item })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      e.nativeEvent.isComposing ||
      e.key !== KEY_ENTER ||
      createInputValue.length === 0
    )
      return
    createItem()
  }

  const list =
    todos &&
    todos.map((item: Todo) => {
      const { content, id }: Todo = item
      return (
        <ListItem
          key={id}
          secondaryAction={
            <>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  updateModalOpen(item)
                }}
                focusRipple={false}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteItem(id)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemText primary={content} />
        </ListItem>
      )
    })

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: 300, margin: '0 auto', textAlign: 'center' }}
    >
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6">
          🗒 My list
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            id="add"
            label="add new list"
            variant="filled"
            value={createInputValue}
            onChange={(e) => setCreateInputValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            autoFocus={true}
          />
          <Box sx={{ display: 'block' }}>
            <Button
              variant="contained"
              disabled={createInputValue.trim().length === 0}
              onClick={() => createItem()}
            >
              Add
            </Button>
          </Box>
        </Box>
        <List>{list}</List>
      </Grid>
      <EditTodoModal
        update={update}
        setUpdate={setUpdate}
        setTodos={setTodos}
      />
    </Box>
  )
}

export default TodoList
