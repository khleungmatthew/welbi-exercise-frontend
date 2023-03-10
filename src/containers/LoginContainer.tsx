import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Api from '../api';

import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'center',
    margin: theme.spacing(1, 0, 4)
  },
  submitButton: {
    marginTop: theme.spacing(4),
    backgroundColor: '#00ADD8'
  },
  loginText: {
    textAlign: 'center',
    color: '#fff'
  }
}));

interface Session {
  email: string;
  token?: string;
}

const LoginContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();
  const { heading, submitButton, loginText } = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sessionInput: Session = { email: email };
    const session = await Api.post('start', sessionInput).then((res: unknown) => {
      return (res as Session);
    });
    localStorage.setItem('token', session?.token ?? '');
    navigate('/residents');
  };

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h5">
        Login By Email
      </Typography>
      <form onSubmit={login} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          label="Email"
          fullWidth
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={submitButton}
        >
          <Typography className={loginText} variant ="h6">
            Login
          </Typography>
        </Button>
      </form>
    </Container>
  );
};

export default LoginContainer;
