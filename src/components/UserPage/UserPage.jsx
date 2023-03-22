import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
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

  const fileRef = useRef(null);
  const [file, setFile] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_POST_BY_ID', payload: user.id })
  }, []);


  const submitFile = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPLOAD_IMAGE', payload: file })
  }

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file)
  }

  return (
    <div className="container">
      <h2 className="title">Welcome, {user.username}!</h2>
      <Avatar
        alt='profile picture'
        src={SpiderWeb}
        sx={{ width: 70, height: 70 }} />

      <form className='form' onSubmit={submitFile} action='/image' method='post' encType="multipart/form-data">
        <input onChange={fileSelected} type='file' inputRef={fileRef} name='image'></input>
        <Button type='submit'>Upload Picture</Button>
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
