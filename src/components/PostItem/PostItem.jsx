import TagItem from "../TagItem/TagItem";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Checkbox,
} from "@mui/material";
import "./PostItem.css";

function PostItem({ posts }) {
  const dispatch = useDispatch();

  const tagsStore = useSelector((store) => store.tag);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "GET_POST_BY_ID", payload: user.id });
  }, []);

  const handleDelete = () => {
    dispatch({ type: "DELETE_POST", payload: posts.id });
  };

  const [isEditing, setEditing] = useState(false);

  let [fullPost, setFullPost] = useState({
    id: posts.id,
    post_type: posts.post_type,
    content: posts.content,
    additional_resource: posts.additional_resource,
    tags: posts.tags,
  });

  const handleEdit = () => {
    setEditing(!isEditing);
    // console.log('posts.id in key', posts.id)
  };

  const handleChange = (event, key) => {
    setFullPost({ ...fullPost, [key]: event.target.value });
  };

  const handleTag = (tagObject) => {
    const newCopy = { ...fullPost };
    if (newCopy.tags.some((tag) => tagObject.id === tag.id)) {
      newCopy.tags = newCopy.tags.filter((tag) => tag.id !== tagObject.id);
    } else {
      newCopy.tags.push(tagObject);
    }
    setFullPost(newCopy);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "EDIT_POST",
      payload: fullPost,
    });
    setEditing(!isEditing);
  };
  // console.log('posts', posts.id);
  return (
    <div className="container">
      <Grid
        container
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
        spacing={2}
      >
        {isEditing ? (
          <>
            <Box component="form">
              <Grid item m={2}>
                <Card sx={{ width: 300, height: "100%" }} key={posts.id}>
                  <CardContent>
                    <RadioGroup
                      row
                      aria-labelledby="offer-request-form"
                      name="Offer or Request"
                      value={fullPost.post_type}
                      onChange={(e) => {
                        handleChange(e, "post_type");
                      }}
                    >
                      <FormControlLabel
                        value="Request"
                        control={<Radio />}
                        label="Request"
                      />
                      <FormControlLabel
                        value="Offer"
                        control={<Radio />}
                        label="Offer"
                      />
                    </RadioGroup>

                    <TextField
                      className="text-field"
                      fullWidth
                      label="What are you offering/requesting?"
                      value={fullPost.content}
                      onChange={(e) => {
                        handleChange(e, "content");
                      }}
                    />
                    <TextField
                      className="text-field"
                      fullWidth
                      label="Any resources you want to share?"
                      value={fullPost.additional_resource}
                      onChange={(e) => {
                        handleChange(e, "additional_resource");
                      }}
                    />

                    <ul>
                      <p>Tags</p>
                      {tagsStore.map((storedTag) => {
                        return (
                          <li key={storedTag.id}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={fullPost.tags?.some(
                                    (tag) => tag?.id === storedTag?.id
                                  )}
                                  onChange={(e) => handleTag(storedTag)}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              value={storedTag.id}
                              label={storedTag.tag_name}
                            />
                          </li>
                        );
                      })}
                    </ul>
                    <CardActionArea sx={{ display: "flex", justifyContent: "space-evenly" }}>
                      <Button type="button" onClick={handleEdit}>
                        Cancel
                      </Button>
                      <Button type="submit" value="save" onClick={handleEditSubmit}>
                        {" "}
                        Save
                      </Button>
                    </CardActionArea>
                  </CardContent>
                </Card>
              </Grid>
            </Box>
          </>
        ) : (
          <div className="container">
            <Grid item m={2}>
              <Card sx={{ width: 300, height: "100%" }}>
                <CardContent>
                  <p className="card-item-title">Request or Offer?</p>
                  <p>{posts.post_type}</p>
                  <p className="card-item-title">
                    What are you requesting or offering?
                  </p>
                  <p>{posts.content}</p>
                  <p className="card-item-title">
                    Any additional resources you'd like to share?
                  </p>
                  <p>{posts.additional_resource}</p>
                  <p className="card-item-title">Tags</p>
                  {/* <TagItem posts={posts} /> */}
                  <ul
                    className="current-tag-list"
                    style={{ marginLeft: -45, marginTop: -5 }}
                  >
                    {posts.tags.map((tag, i) => {
                      return (
                        <li key={i} className="current-tag-item">
                          {tag?.tag_name}
                        </li>
                      );
                    })}
                  </ul>

                  <CardActionArea
                    sx={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Button className="delete-btn" onClick={handleDelete}>
                      Delete
                    </Button>
                    <Button className="edit-btn" onClick={handleEdit}>
                      Edit
                    </Button>
                  </CardActionArea>
                </CardContent>
              </Card>
            </Grid>
          </ div>
        )}
      </Grid>
    </div>
  );
}
export default PostItem;
