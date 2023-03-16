import React, {useEffect} from 'react';
import SolidarityWebItem from '../SolidarityWebItem/SolidarityWebItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Grid
} from "@mui/material";

import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const posts = useSelector((store) => store.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_POST_BY_ID" })
  }, []);

  return (
    <div className="container">
      <h2 className="title">Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <h3>You can edit your posts and resubmit, or delete them if they have been fulfilled!</h3>
      {posts.map((post, i) => {
        return (
          <div className='container' key={i}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ maxHeight: 500 }}
            >
              <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                  <p>{post.post_type}</p>
                  <p>{post.content}</p>
                  <p>{post.additional_resource}</p>
                </CardContent>
                <SolidarityWebItem post={post} />
              </Card>
              
            </Grid>
          </div>
        )

      })}



    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
