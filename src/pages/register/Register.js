
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Button } from '@mui/material';
import { TextInput } from 'react-materialize';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


export default function Register() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);



  const signUp = (user) => {
    return fetch('https://640c4dd9a3e07380e8f11292.mockapi.io/userCINE')
      .then((response) => response.json())
      .then((data) => {
        const existedUser = data.find((existed) => existed.username === user.username);
        if (existedUser) {
          throw new Error('Username already existed!')
        } else {
          return fetch('https://640c4dd9a3e07380e8f11292.mockapi.io/userCINE', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Error signing up');
              }
              return response.json();
            })
            .then((data) => {
              console.log('Sign up successfully: ', data);
              navigate('/login');
            })
            .catch((error) => {
              console.log('Error sign up: ', error);
              alert('Error signing up');
            });
        }
      })
      .catch((error) => {
        console.log('Error checking username: ', error);
        setFail(true);
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, email, password };
    signUp(user);
  };

  const handleCloseFail = () => {
    setFail(false);
    window.location.reload();
  };

  return (
    <div className='wrapper_signUp'>
      <img src='https://img.freepik.com/premium-vector/cinema-background-vector_1436-29.jpg' alt='bg_signUp' />
      <div className='signUp_content'>
        <h3>Sign up</h3>
        <form onSubmit={handleSubmit}>
          <TextInput
            id="email-input"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required

          />
          <br></br>
          <TextInput
            id="username-input"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required

          />
          <br></br>
          <TextInput
            id="password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required

          />
          <br></br>
          <Button style={{ backgroundColor: '#CE5959', fontWeight: 'bold', fontSize: '1rem' }} fullWidth variant="contained" type='submit' >
            Sign Up
          </Button>
        </form>
      </div>
      <Dialog
        open={fail}
        onClose={handleCloseFail}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Error signing up"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invalid username or password!
          </DialogContentText>
        </DialogContent>
        <Button onClick={() => navigate('/login')} autoFocus>
          Login
        </Button>
        <DialogActions>
          <Button autoFocus onClick={handleCloseFail}>
            Retry sign up
          </Button>

        </DialogActions>
      </Dialog>
    </div>

  )
}
