
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../card/Card';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from '@mui/material';
import './favouriteList.css';

export default function FavouriteList() {
  const listFavour = useSelector((state) => state.favourite.likeItem);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const handleClickOpen = () => {
    if (localStorage.getItem('token') !== null) {
      navigate('/');
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2 className='list__title'>FAVORITES</h2>
      <div className="list__cards">
        {listFavour.length === 0 ? (
          <div className="empty__message">
            <p>You have not liked any movie yet.</p>
            <Button onClick={handleClickOpen} className="add__movies__button">Add more movies</Button>
          </div>
        ) : (
          listFavour.map((LikeMovie) => (
            <div key={LikeMovie.id}>
              <Card movie={LikeMovie} />
            </div>
          ))
        )}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Login Required</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please log in to add movies to your favorites.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => navigate('/login')} autoFocus>
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
