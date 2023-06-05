
import React, { useEffect, useState } from 'react';

export default function Reviews() {
  const [users, setUsers] = useState([]);
  const [review, setReview] = useState('');
  

  const getData = () => {
    fetch(`https://640c4dd9a3e07380e8f11292.mockapi.io/userCINE`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const addComment = (username, review) => {
    const user = users.find((user) => user.username === username);
    if (user && localStorage.getItem('token') !== null) {
      // const updatedReviews = ""
      const updatedUser = { ...user, reviews: review };

      // Update the user data in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );

      console.log('Comment added:', review);
    } else {
      console.log('User not found or review is empty');
    }
  };



  const handleSubmit = e => {
    e.preventDefault();
    const username = localStorage.getItem('token'); 
    const newReview = review; 
    if (newReview) {
      addComment(username, newReview);
    }
    e.target.reset();
    setReview('');
  }
  return (
    <div>
      {localStorage.getItem('token') !== null ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="review"
            value={review}
            style={{color:'white'}}
            onChange={(e) => setReview(e.target.value)}
          />
          <button type="submit">Add Comment</button>
        </form>
      ) : (
        ''
      )}
    </div>
  );
}
