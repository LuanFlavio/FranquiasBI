import { Icon } from '@iconify/react'
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { deleteData } from 'src/store/apps/user'

interface DialogDeleteUserProps {
  open: boolean
  idUser: number
  handleClose: () => void
}

const DialogDeleteUser = ({ idUser, open, handleClose }: DialogDeleteUserProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = () => {
    dispatch(deleteData(idUser)).then(res => res.payload ? handleClose() : null)
  }

  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: '85%', textAlign: 'center', '& svg': { mb: 4, color: 'warning.main' } }}>
            <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
            <Typography>Tem certeza que deseja deletar esse usuário?</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant='contained' color='error' onClick={() => handleSubmit()}>
          Deletar
        </Button>
        <Button variant='outlined' color='secondary' onClick={handleClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteUser
