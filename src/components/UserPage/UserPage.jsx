import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import PostItem from '../PostItem/PostItem';
import {
  Box,
  Button,
  Avatar
} from "@mui/material";
import SpiderWeb from '../graphics/spider_web.png';
<graphic></graphic>

import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const posts = useSelector((store) => store.post);
  const [file, setFile] = useState();
  const [images, setImages] = useState([])
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'GET_POST_BY_ID', payload: user.id})
  }, []);

  const submitFile = (event) => {
    event.preventDefault();
    setImages([...images]);
    dispatch({type: 'UPLOAD_IMAGE', payload: images})
  }

  const fileSelected = (event) => {
    const file = event.target.files[0]
    setFile(file)
  }
 
  return (
    <div className="container">
      <h2 className="title">Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <Avatar 
      alt='profile picture' 
      src={SpiderWeb}
      sx={{width: 80, height: 80}} />
  
      <input onChange={fileSelected} type='file' accept='image/*'></input>
      <Button onClick={submitFile}>Send Files</Button>
  

      <h3>You can edit your posts and resubmit or delete if they have been fulfilled.</h3>

      <Box sx={{display: 'flex', flexDirection: 'column', flexWrap:'wrap'}}>
        {posts.map((post, i) => {
                return <PostItem key={i} posts={post}/>
            })}
      </Box>
    </div>
  )
}

// this allows us to use <App /> in index.js
export default UserPage;
