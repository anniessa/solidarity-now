import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TagItem from "../TagItem/TagItem";

import { Avatar, Card, CardContent, Grid } from "@mui/material";
import Web from "../graphics/spider_web.png";
import "./SolidarityWeb.css";

function SolidarityWeb() {
  const dispatch = useDispatch();

  const allPosts = useSelector((store) => store.post);
  const user = useSelector((store) => store.post);

  // console.log('store posts on solidarity web', allPosts);

  useEffect(() => {
    dispatch({ type: "GET_POST" });
  }, []);

  return (
    <div>
      <section className="post-section">
        <div className="center">
          <h2>Solidarity Web</h2>
          <img src={Web} style={{ width: 200, height: 200 }} />
        </div>
        {allPosts.map((post, i) => {
          return (
            <div className="container" key={i}>
              <Grid
                container
                display="flex"
                direction="column"
                alignItems="center"
                justify="center"
                spacing={3}
                // style={{ maxHeight: 1000 }}
              >
                <Grid item m={2} display="flex">
                  <Card
                    sx={{
                      maxWidth: 320,
                      height: "100%",
                      }}
                      elevation= {8}
                  >
                    <CardContent>
                      <Avatar
                        style={{ width: 45, height: 45 }}
                        src={post.picture}
                      />
                      <p className="card-item-title"> Posted by: </p>
                      <p>{post.username}</p>
                      <p className="card-item-title">Request or Offer?</p>
                      <p>{post.post_type}</p>
                      <p className="card-item-title">
                        What are you requesting or offering?
                      </p>
                      <p>{post.content}</p>
                      <p className="card-item-title">
                        Any additional resources you'd like to share?
                      </p>
                      <p>{post.additional_resource}</p>
                      <p className="card-item-title">Tags</p>
                      <ul
                        className="current-tag-list"
                        style={{ marginLeft: -45, marginTop: -5 }}
                      >
                        {post.tags.map((tag, i) => {
                          return (
                            <li key={i} className="current-tag-item">
                              {tag?.tag_name}
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default SolidarityWeb;
