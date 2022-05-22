import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import config from "../config";
import useAxios from 'axios-hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, Box, TextField, Typography, Container, Grid, Avatar, Checkbox, FormControlLabel } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import useUser from '../hooks/user-hook';

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  acceptTerms: boolean;
  thirsteenYearsOld: boolean;
};

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required !")
    .email("Email is invalid !")
    .max(50, "Must be maximum 50 characters !"),
  firstName: yup
    .string()
    .required("Firstname is required !"),
  lastName: yup
    .string()
    .required("Lastname is required !"),
  password: yup
    .string()
    .required("Password is required !")
    .min(6, "Must be at least 6 characters !")
    .max(40, "Must be maximum 40 characters !"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match !'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions !'),
  thirsteenYearsOld: yup
    .boolean()
    .oneOf([true], 'You must be at least 13 years old !')
    
}).required();

export default function Register() {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const userContext = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [{ data, loading, error }, execute] = useAxios(
    {
      url: `${config.API_URL}/users`,
      method: "POST",
    },
    { manual: true }
  );

  useEffect(() => {
    if (data) {
      setHelperText({
        text: 'Successful account creation !',
        type: 'success',
      });
    }

    if (error) {
      setHelperText({
        text: error.response?.data?.message,
        type: 'error',
      });
    }
  }, [data, error]);

  const [helperText, setHelperText] = useState<any>(null);

  const onSubmit = handleSubmit((data: FormData) => {
    execute({
      data: { ...data, repeatPassword: undefined, acceptTerms: undefined, thirsteenYearsOld: undefined },
    });
  });

  useEffect(() => {
    localStorage.removeItem("accessToken");
    
    userContext.setUser({
      isLoggedIn: false,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
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
            Sign up
          </Typography>
          <FormProvider {...methods} >
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    error={errors.firstName ? true : false}
                    helperText={errors.firstName?.message}
                    {...register("firstName")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName?.message}
                    {...register("lastName")}
                  />
                </Grid>
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Confirm password"
                    type="password"
                    id="repeatPassword"
                    autoComplete="new-password"
                    error={errors.repeatPassword ? true : false}
                    helperText={errors.repeatPassword?.message}
                    {...register("repeatPassword")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="I accept the terms and conditions"
                    {...register("acceptTerms")}
                  />
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="I confirm that I am 13 years old or older"
                    {...register("thirsteenYearsOld")}
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
                Sign Up
              </LoadingButton>

              {helperText && (
                <Alert severity={helperText.type}>
                  {helperText.text}
                </Alert>
              )}

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">
                    Already have an account? Sign in
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
