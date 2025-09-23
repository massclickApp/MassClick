import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authAction.js';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Link,
  TextField,
  Typography,
  Stack,
  CssBaseline,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from './googleIcon.js';
import { useNavigate } from 'react-router-dom';
import companyLogo from "../../assets/mclogo.png";

function ColorSchemeToggle({ mode, setMode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <IconButton
      aria-label="toggle light/dark mode"
      disabled={!mounted}
      sx={{
        border: '1px solid #ccc',
        transition: 'all 0.3s',
        '&:hover': { transform: 'rotate(20deg)', backgroundColor: '#f5f5f5' },
      }}
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Login({ setIsAuthenticated }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [mode, setMode] = useState('light');

  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: { main: '#ea6d11' },
        secondary: { main: '#1976d2' },
        background: { default: mode === 'light' ? '#f8f9fa' : '#121212' },
      },
      typography: { fontFamily: `'Inter', sans-serif` },
    }), [mode]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (auth.user && auth.accessToken) {
      localStorage.setItem("username", auth.user.username || auth.user.email);
      localStorage.setItem("accessToken", auth.accessToken);
      localStorage.setItem("refreshToken", auth.refreshToken);
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
  }, [auth, navigate, setIsAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh' }}>
        
        {/* Left Side - Login Form */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', px: 4 }}>
          <Paper elevation={6} sx={{ p: 6, borderRadius: 4, width: { xs: '90%', sm: 450 } }}>
            <Stack spacing={4}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <IconButton color="primary"><BadgeRoundedIcon /></IconButton>
                  <Box component="img" src={companyLogo} alt="Company Logo" sx={{ height: 40 }} />
                </Box>
                <ColorSchemeToggle mode={mode} setMode={setMode} />
              </Box>

              <Stack spacing={1}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Sign in</Typography>
                <Typography variant="body2">
                  New to company? <Link href="#">Sign up!</Link>
                </Typography>
              </Stack>

              <Button variant="outlined" fullWidth startIcon={<GoogleIcon />} sx={{ borderRadius: 3 }}>
                Continue with Google
              </Button>

              <Divider>or</Divider>

              {auth.error && <Typography color="error">{auth.error.message || auth.error}</Typography>}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextField
                  label="Username"
                  size="small"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  size="small"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
                  <Link href="#">Forgot password?</Link>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={auth.loading}
                  sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
                >
                  {auth.loading ? 'Logging in...' : 'Sign in'}
                </Button>
              </form>

              <Typography variant="caption" sx={{ textAlign: 'center', mt: 4 }}>
                © MassClick {new Date().getFullYear()}
              </Typography>
            </Stack>
          </Paper>
        </Box>

        {/* Right Side - Info Section */}
        <Box sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)',
          flexDirection: 'column',
          textAlign: 'center',
          px: 6,
          gap: 3
        }}>
          <Typography sx={{ color: '#fff', fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            India's Best Local Business Search Engine
          </Typography>
          <Typography sx={{ color: '#fff', fontSize: '2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>
            Widely used local search engine
          </Typography>
          <Typography sx={{ color: '#fff', fontSize: '1.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
            Provides info on restaurants, shops, services, and more
          </Typography>
          <Typography sx={{ color: '#fff', fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
            Offers user reviews, ratings, contact details, and directions
          </Typography>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
