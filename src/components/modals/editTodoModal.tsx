import React, { useEffect, useState } from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import { provideTodoPresenter } from 'di/presenters'
import { KEY_ENTER } from 'components/pages/Todo/constant'

const todoPresenter = provideTodoPresenter()

const editModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 8,
  p: 4,
  textAlign: 'center',
}

const EditTodoModal = (props: any) => {
  const { update, setUpdate, setTodos } = props
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    setInputValue(update.currentUpdateItem?.content)
  }, [update.currentUpdateItem])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      e.nativeEvent.isComposing ||
      e.key !== KEY_ENTER ||
      inputValue.length === 0
    )
      return
    handleUpdateTodo()
  }

  const handleUpdateTodo = () => {
    const res = todoPresenter.updateTodo({
      content: inputValue,
      id: update.currentUpdateItem?.id,
    })
    setTodos(res)
    setUpdate({ isUpdateMode: false, currentUpdateItem: {} })
  }

  return (
    <Box sx={{ margin: 'auto 0' }}>
      <Modal
        open={update.isUpdateMode}
        onClose={() => setUpdate({ isUpdateMode: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={editModalStyle}>
          <TextField
            id="add"
            label="add new list"
            variant="filled"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            autoFocus={true}
          />
          <Box sx={{ display: 'block' }}>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              disabled={
                update.currentUpdateItem?.content === inputValue?.trim() ||
                inputValue?.trim().length === 0
              }
              onClick={() => handleUpdateTodo()}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default EditTodoModal
