import * as React from 'react';
import { useState,useEffect  } from 'react';
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
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', width: '100%', px: 2 }}>
          
          {/* Header */}
          <Box component="header" sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Company Logo</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>

          {/* Main form */}
          <Box component="main" sx={{ my: 'auto', py: 2, pb: 5, display: 'flex', flexDirection: 'column', gap: 2, width: 400, maxWidth: '100%', mx: 'auto', borderRadius: 'sm', '& form': { display: 'flex', flexDirection: 'column', gap: 2 } }}>
            
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

            <Stack sx={{ gap: 4, mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input     type="text"       
 name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>

                <Stack sx={{ gap: 4, mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Checkbox size="sm" label="Remember me" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                    <Link level="title-sm" href="#">Forgot your password?</Link>
                  </Box>
                  <Button type="submit" fullWidth disabled={auth.loading}>
                    {auth.loading ? 'Logging in...' : 'Sign in'}
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>

          {/* Footer */}
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" sx={{ textAlign: 'center' }}>© Your company {new Date().getFullYear()}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Side Image */}
      <Box sx={(theme) => ({
        height: '100%',
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        left: { xs: 0, md: '50vw' },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
        [theme.getColorSchemeSelector('dark')]: {
          backgroundImage: 'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
        },
      })} />
    </CssVarsProvider>
  );
}
