import * as React from "react";
import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { getSession, signIn } from "next-auth/react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { login, checkToken } from '../util/api';

const theme = createTheme();

export default function LoginPage() {
  //   const router = useRouter();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const validationSchema = Yup.object().shape({
    // email: Yup.string().email('Must be a valid email').required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);

    try {
        const result = await login({
          // email: data.email,
          username: data.username,
          password: data.password,
        });
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Login Berhasil");

         if (result.user.role === "finance") {
          navigate("/approval", { replace: true });
        }else if (result.user.role === "crew") {
          navigate("/scanner", { replace: true });
        }else {
          navigate("/orders", { replace: true });
        }

        // navigate("/orders", { replace: true });
        navigate(0);
      } catch (error) {
        toast.error(error.message);
      }
    
      setLoading(false);
  };

  const checkTokenExpiration = async () => {
    const result = await checkToken();
    if (result.success) {
      navigate("/orders", { replace: true });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // navigate('/orders', {replace: true});
      checkTokenExpiration();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  {...register("username")}
                  error={errors.username ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.username?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  error={errors.password ? true : false}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <LoadingButton
                  type="submit"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 2, mb: 2 }}
                  loading={loading}
                  variant="contained"
                >
                  Login
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
