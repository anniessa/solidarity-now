import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostItem from '../PostItem/PostItem';
import {
  Box,
  Button,
  Avatar
} from "@mui/material";
import './UserPage.css';

function UserPage() {
  const user = useSelector((store) => store.user);
  const posts = useSelector((store) => store.post);

  // console.log('image from store', image);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_POST_BY_ID', payload: user.id })
    dispatch({type: 'GET_TAGS'})
    // dispatch({type: 'SET_UPLOADS'})
  }, []);

  const submitFile = (event) => {
    event.preventDefault();
    dispatch({type: 'FETCH_USER'})
  }

  // event handler to manage file change and update reducer
  function fileSelected(event) {
    const selectedFile = event.target.files[0];
    dispatch({
      type: 'UPLOAD_IMAGE',
      payload: {
        file: selectedFile
      }
    })
    
  }


  return (
    <div className="container">
      <h2 className="title">Welcome, {user.username}!</h2>

      <img src={user.picture} width="750" height="500" controls /> 

      <form className='form' onSubmit={submitFile} encType="multipart/form-data"> 
        <input onChange={fileSelected} type='file'></input>
        <Button type='submit' color='secondary'>Upload Picture</Button>
      </form>

      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
        {posts.map((post, i) => {
          return <PostItem key={post.id} posts={post} />
        })}
      </Box>
    </div>
  )
}

// this allows us to use <App /> in index.js
export default UserPage;
