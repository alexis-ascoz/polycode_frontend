import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { Backdrop, Box, Button, Fade, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import useUser from '../hooks/user-hook';

export default function Home() {
  const navigate = useNavigate();
  const userContext = useUser();

  useEffect(() => {
    userContext.setUser({
      isLoggedIn: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <main>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Welcome to PolyCode !
              </Typography>

              <Typography sx={{ mt: 2 }}>
                A small coding learning app.
              </Typography>

              <Button onClick={handleClose}>
                <Typography variant="h6" component="h2">
                  Start coding !
                </Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}>
        <Typography variant="h1" component="h1">
          Poly Code
        </Typography>
        <Typography variant="h5" component="h2">
          The interview cracking platform
        </Typography>

        <Box sx={{
          display: 'flex',
          mt: 4,
          columnGap: 10,
        }}>
          <Button onClick={() => navigate('/register')}>
            <Typography variant="h6" component="h2">
              Create an account
            </Typography>
          </Button>
          
          <Button onClick={() => navigate('/login')}>
            <Typography variant="h6" component="h2">
              Login
            </Typography>
          </Button>
        </Box>
      </Box>

    </main>
  );
}