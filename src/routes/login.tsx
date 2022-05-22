import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import config from "../config";
import useAxios from 'axios-hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, Backdrop, Box, Fade, Modal } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import useUser from '../hooks/user-hook';

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required !"),
  password: yup
    .string()
    .required("Password is required !"),
}).required();

export default function Login() {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [{ data, loading, error }, execute] = useAxios(
    {
      url: `${config.API_URL}/auth/login`,
      method: "POST",
    },
    { manual: true }
  );

  const navigate = useNavigate();
  const userContext = useUser();

  useEffect(() => {
    if (data) {
      localStorage.setItem("accessToken", data.token);
      userContext.setUser({
        isLoggedIn: true,
      });

      navigate("/exercises");
    }

    if (error) {
      setHelperText(error.response?.data?.message);
    }
  }, [userContext, data, error, navigate]);

  useEffect(() => {
    localStorage.removeItem("accessToken");
    
    userContext.setUser({
      isLoggedIn: false,
    });

    if (!localStorage.getItem("modal")) {
      setOpen(true);
      localStorage.setItem("modal", "true");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [helperText, setHelperText] = useState("");

  const onSubmit = handleSubmit((data: FormData) => {
    execute({
      data
    });
  });

  const [open, setOpen] = useState(false);
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Welcome to PolyCode !
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              This is a simple coding app.
            </Typography>
          </Box>
        </Fade>
      </Modal>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <FormProvider {...methods} >
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                    {...register("email")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={errors.password ? true : false}
                    helperText={errors.password?.message}
                    {...register("password")}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                fullWidth
                loading={loading}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>

              {helperText && (
                <Alert severity="error">
                  {helperText}
                </Alert>
              )}

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/register">
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
        </Box>
      </Container>
    </main>
  );
}