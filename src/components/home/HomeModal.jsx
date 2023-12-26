import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
}

const HomeModal = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Check if the modal has been shown before
    const isModalShown = localStorage.getItem('isModalShown')
    // If the modal has not been shown, show it and set the flag
    if (!isModalShown) {
      setOpen(true)
      localStorage.setItem('isModalShown', 'true')
    }
  }, [])

  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Welcome to the iShop ecommerce website project, built using React
            and Node! Please read this first...
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            The initial load takes a long time - this is because the website is
            deployed on render.com using a free plan. Don't worry, after the
            initial load, it's fast enough.
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Some useful information for navigating the website:
          </Typography>
          <Typography id='modal-modal-description'>
            - ed.dev.user@proton.me and password 123456 to login for the USER
            experience
          </Typography>
          <Typography id='modal-modal-description'>
            - ed.dev.admin@proton.me and password 123456 to login for the ADMIN
            experience
          </Typography>
          <Typography id='modal-modal-description'>
            - alternatively, you can create your own USER account
          </Typography>
          <Typography id='modal-modal-description'>
            - to simulate a card payment use 4242 4242 4242 4242, 12/ 29, 000,
            00000
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Github repos:{' '}
            <a href='https://github.com/avaseduard/iShop-frontend/tree/new-env'>
              frontend
            </a>{' '}
            &{' '}
            <a href='https://github.com/avaseduard/iShop-backend/tree/new-env'>
              backend
            </a>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default HomeModal
