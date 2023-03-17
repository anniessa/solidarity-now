import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import PostItem from '../PostItem/PostItem';
import {
  Box
} from "@mui/material";

import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const posts = useSelector((store) => store.post);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'GET_POST_BY_ID', payload: user.id})
  }, []);
 
  return (
    <div className="container">
      <h2 className="title">Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <h3>You can edit your posts and resubmit, or delete them if they have been fulfilled!</h3>

      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap:'wrap'}}>
        {posts.map((post, i) => {
                return <PostItem key={i} post={post}/>
            })}
      </Box>

      <LogOutButton className="navLink" />
    </div>
  )
}

// this allows us to use <App /> in index.js
export default UserPage;
