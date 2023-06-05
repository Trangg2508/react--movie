// Login.js
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from 'react-materialize';
import './Login.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [fail, setFail] = useState(false);

      
  const signIn = (user) => {
    return fetch(`https://640c4dd9a3e07380e8f11292.mockapi.io/userCINE`)
    .then(response => response.json())
    .then((data) => {
        const matchedUser = data.find(
          (userData) => userData.username === user.username && userData.password === user.password);
        if(matchedUser) {
          localStorage.setItem('token', matchedUser.username);
          // alert('Login successfully!');
          // setSuccess(true);
          navigate('/');
          window.location.reload();
        } else {
          // alert('Invalid username or password');
          setFail(true);
        }
    })
    .catch((error) => {
      console.log("Error log in: ", error);
      // alert("Error log in");
      setFail(true);
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {username,  password};
    signIn(user);
  }

  const handleCloseFail = () => {
    setFail(false);
    window.location.reload();
  };

  return (
    <>
      <div className='wrapper_login'>
        <div className='login_background'>
          <img src='https://img.freepik.com/premium-photo/movie-background-clapperboard-film-reel-popcorn-3d-glasses-yellow-backdrop-copy-space-top-view_116547-6047.jpg?w=2000' alt='bg_login' />
        </div>
        <div className='login_box'>
          <h3>Sign in</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <TextInput
                id="username-input"
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                
              />

              <TextInput
                id="password-input"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                
              /><br></br>
              <Button type='submit' style={{backgroundColor: '#FFC93C', fontWeight: 'bold', fontSize: '1rem'}} fullWidth variant="contained">
                Login
              </Button>
            </div>
            
          </form>
        </div>
        <Dialog
        open={fail}
        onClose={handleCloseFail}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Error Login"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
             Invalid username or password!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus  onClick={() => navigate('/register')} >
             Sign up
          </Button>
          <Button onClick={handleCloseFail} autoFocus>
            Retry login 
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  )
}
