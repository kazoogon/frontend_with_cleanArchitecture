import React, { useEffect, useReducer, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Todo } from 'domain/entities/Todo'
import { provideTodoPresenter } from 'di/presenters'

const todoPresenter = provideTodoPresenter()

const editModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
}

const EditModal = (props: any) => {
  const { isEditMode, setIsEditMode, currentEditItem, setTodos } = props
  const [val, setVal] = useState<string>(currentEditItem.content)

  return (
    <Box sx={{ margin: 'auto 0' }}>
      <Modal
        open={isEditMode}
        onClose={() => setIsEditMode()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={editModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="add"
              label="add new list"
              variant="filled"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          </Typography>
          <Box sx={{ display: 'block' }}>
            <Button
              sx={{ m: 2 }}
              variant="contained"
              disabled={currentEditItem.content === val}
              onClick={() => {
                const res = todoPresenter.updateTodo({
                  content: val,
                  id: currentEditItem.id,
                })
                setTodos(res)
                setIsEditMode()
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>()
  const [newTodoValue, setNewTodoValue] = useState<string>('')
  const [isEditMode, setIsEditMode] = useReducer(
    (prev: boolean) => !prev,
    false
  )
  const [currentEditItem, setCurrentEditItem] = useState({})

  useEffect(() => {
    setTodos(todoPresenter.getTodos())
  }, [])

  const deleteItem = (id: number) => {
    const res = todoPresenter.deleteTodo(id)
    setTodos(res)
  }

  const createTodo = () => {
    const res = todoPresenter.createTodo(newTodoValue)
    setTodos(res)
    setNewTodoValue('')
  }

  const editItem = (item: Todo) => {
    setIsEditMode()
    setCurrentEditItem(item)
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
                onClick={() => editItem(item)}
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
            value={newTodoValue}
            onChange={(e) => setNewTodoValue(e.target.value)}
          />
          <Box sx={{ display: 'block' }}>
            <Button
              variant="contained"
              disabled={newTodoValue.length === 0}
              onClick={() => createTodo()}
            >
              Add
            </Button>
          </Box>
        </Box>
        <List>{list}</List>
      </Grid>
      <EditModal
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        currentEditItem={currentEditItem}
        setTodos={setTodos}
      />
    </Box>
  )
}

export default TodoList
