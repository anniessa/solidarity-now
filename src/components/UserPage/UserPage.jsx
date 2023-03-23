import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostItem from '../PostItem/PostItem';
import {
  Box,
  Button,
  Avatar
} from "@mui/material";
import SpiderWeb from '../graphics/spider_web.png';


import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const posts = useSelector((store) => store.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_POST_BY_ID', payload: user.id })
    dispatch({type: 'FETCH_IMAGE'})
  }, []);

  const submitFile = (event) => {
    event.preventDefault();
    
  }

  // event handler to manage file change and update reducer
  function fileSelected(event){
    const selectedFile = [...event.target.file];
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
      <form className='form' onSubmit={submitFile} encType="multipart/form-data">
      <Avatar
        alt='profile picture'
        src={SpiderWeb}
        sx={{ width: 70, height: 70 }} />
        <input onChange={fileSelected} type='file'></input>
        <Button type='submit' color='secondary'>Upload Picture</Button>
      </form>

      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
        {posts.map((post, i) => {
          return <PostItem key={i} posts={post} />
        })}
      </Box>
    </div>
  )
}

// this allows us to use <App /> in index.js
export default UserPage;
