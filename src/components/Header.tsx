import { AppBar, Grid, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import useUser from '../hooks/user-hook';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Header() {
  const userContext = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("accessToken");
    userContext.setUser({
      isLoggedIn: false,
    });
    navigate('/');
  }

  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <CodeIcon />

        <Grid container justifyContent={'start'}>
          <Typography variant="h6" noWrap>
            {' PolyCode'}
          </Typography>
        </Grid>

        {
          userContext.user.isLoggedIn && (
            <>
              <Grid container justifyContent={'center'}>
                <Button onClick={() => navigate('/exercises')} color="inherit">
                  <Typography variant="body1" noWrap>
                    Tutorials
                  </Typography>
                </Button>

                <Button onClick={() => navigate('/exercises')} color="inherit">
                  <Typography variant="body1" noWrap>
                    Exercises
                  </Typography>
                </Button>
              </Grid>

              <Grid container justifyContent={'end'}>
                <Button onClick={handleClick} color="inherit">
                  <Typography variant="body1" noWrap>
                    Logout
                  </Typography>
                </Button>
              </Grid>
            </>
          )
        }
      </Toolbar>
    </AppBar>
  );
}