import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authAction.js';
import {
  CssVarsProvider, extendTheme, useColorScheme, GlobalStyles, CssBaseline,
  Box, Button, Checkbox, Divider, FormControl, FormLabel, IconButton,
  Link, Input, Typography, Stack
} from '@mui/joy';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from './googleIcon.js';
import { useNavigate } from 'react-router-dom';
import companyLogo from "../../assets/mclogo.png"

const customTheme = extendTheme({ defaultColorScheme: 'light' });

function ColorSchemeToggle(props) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      {...props}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (auth.user && auth.accessToken) {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  return (
    <CssVarsProvider theme={customTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: '100vh',
        }}
      >
        {/* Left Form */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: { xs: 2, sm: 4 },
            py: { xs: 2, sm: 4 },
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
  <Box
                component="img"
                src={companyLogo}
                alt="Company Logo"
                sx={{ height: 40 }}
              />
                          </Box>
            <ColorSchemeToggle />
          </Box>

          {/* Main Form */}
          <Box sx={{ width: { xs: '90%', sm: 400 } }}>
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">Sign in</Typography>
                <Typography level="body-sm">
                  New to company?{' '}
                  <Link href="#" level="title-sm">Sign up!</Link>
                </Typography>
              </Stack>

              <Button variant="soft" color="neutral" fullWidth startDecorator={<GoogleIcon />}>
                Continue with Google
              </Button>
            </Stack>

            <Divider>or</Divider>

            {auth.error && (
              <Typography color="danger" level="body-sm">
                {auth.error.message || auth.error}
              </Typography>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <FormControl required>
                <FormLabel>UserName</FormLabel>
                <Input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>

              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Checkbox size="sm" label="Remember me" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <Link level="title-sm" href="#">Forgot your password?</Link>
              </Box>

              <Button type="submit" fullWidth disabled={auth.loading}>
                {auth.loading ? 'Logging in...' : 'Sign in'}
              </Button>
            </form>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, py: 3 }}>
            <Typography level="body-xs" sx={{ textAlign: 'center' }}>
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>

<Box
  sx={{
    flex: 1,
    display: { xs: 'none', md: 'flex' },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderLeft: '1px solid #ccc',
    minHeight: '100vh',
    px: 6,
    textAlign: 'center',
    flexDirection: 'column',
    gap: 2,
  }}
>
  <Typography sx={{ color: '#ea6d11', fontSize: '3rem', fontWeight: 'bold' }}>
    India's Best Local Business Search Engine
  </Typography>
  <Typography sx={{ color: '#ea6d11', fontSize: '2rem' }}>
    One of the most widely used local search engines in India
  </Typography>
  <Typography sx={{ color: '#ea6d11', fontSize: '1.5rem' }}>
    MassClick provides information on a vast range of businesses, including restaurants, shops, service providers, and more
  </Typography>
  <Typography sx={{ color: '#ea6d11', fontSize: '1.2rem' }}>
    It offers user reviews, ratings, contact details, and directions
  </Typography>
</Box>
      </Box>
    </CssVarsProvider>
  );
}
