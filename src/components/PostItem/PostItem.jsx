import TagItem from "../TagItem/TagItem";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Checkbox
} from "@mui/material";
import './PostItem.css';

function PostItem({posts}) {
    const dispatch = useDispatch();

    const tagsStore = useSelector((store) => store.tag);
    
    // console.log('tagsPosts', tagsPosts)
  useEffect(() => {
    dispatch({type: 'GET_POST_BY_ID', payload: posts.id})
        }, []);

  const handleDelete = () => {
    dispatch({ type: "DELETE_POST", payload: posts.id})
  }
 
    const [isEditing, setEditing] = useState(false);

    let [fullPost, setFullPost] = useState({
      postId: posts.id,
      post_type: posts.post_type,
      content: posts.content,
      additional_resource: posts.additional_resource,
      tags: posts.tags
    })

    const handleEdit = () => {
      setEditing(!isEditing);
    }
  
    const handleChange = (event, key) => {
      setFullPost({ ...fullPost, [key]: event.target.value })
    };
  
    const handleTag = (tagObject) => {
      const newCopy = { ...fullPost }
      if (newCopy.tags.some(tag => tagObject.id === tag.id)) {
          newCopy.tags = newCopy.tags.filter(tag => tag.id !== tagObject.id)
      } else {
          newCopy.tags.push(tagObject);
      }
      setFullPost(newCopy);
  }

    const handleEditSubmit = (event) => {
      event.preventDefault();
      dispatch({
        type: 'EDIT_POST',
        payload: fullPost
      });
      setEditing(!isEditing);
    }
    // console.log(fullPost);
    return (
        
        <div className='container'>
            <Grid
              container
              display="flex"
              direction="column"
              alignItems="stretch"
              justify="space-evenly"
              spacing={2}
            >
              {isEditing ? (
                <>
                  <form onSubmit={handleEditSubmit}>
                    <Grid 
                    item 
                    display="flex"
                    >
                    <Card 
                    sx={{ maxWidth: 500, height: 650 }} key={posts.id}>
                      <CardContent>
                        <RadioGroup
                          row
                          aria-labelledby='offer-request-form'
                          name='Offer or Request'
                          value={fullPost.post_type}
                          onChange={(e) => { handleChange(e, 'post_type') }}
                        >
                          <FormControlLabel value='Request' control={<Radio />} label='Request' />
                          <FormControlLabel value='Offer' control={<Radio />} label='Offer' />
                        </RadioGroup>

                        <TextField
                          className="text-field"
                          fullWidth
                          label="What are you offering/requesting?"
                          value={fullPost.content}
                          onChange={(e) => { handleChange(e, 'content') }}
                        />
                        <TextField
                          className="text-field"
                          fullWidth
                          label="Any resources you want to share?"
                          value={fullPost.additional_resource}
                          onChange={(e) => { handleChange(e, 'additional_resource') }}
                        />
                        <ul>
                          <p>Tags</p>
                          {tagsStore.map(storedTag => {
                            return (
                              <li key={storedTag.id}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={fullPost.tags?.some(tag => tag?.id === storedTag?.id)  }
                                      onChange={(e) => handleTag(storedTag)}
                                      inputProps={{ 'aria-label': 'controlled' }} />}
                                  value={storedTag.id}
                                  label={storedTag.tag_name} />
                              </li>
                             );
                          })}
                        </ul>
                        <Button type="button" onClick={handleEdit}> 
                        Cancel 
                        </Button>
                        <Button type="submit" value="save" 
                        > Save 
                        </Button>
                      </CardContent>
                    </Card>
                    </Grid>
                  </form>
                </>
              ) : (
                <>
                <Grid item
                justify-content='space-between'> 
                <Card>
                  <CardContent>
                    <p className="card-item-title">Request or Offer?</p>
                    <p>{posts.post_type}</p>
                    <p className="card-item-title">What are you requesting or offering?</p>
                    <p>{posts.content}</p>
                    <p className="card-item-title">Any additional resources you'd like to share?</p>
                    <p>{posts.additional_resource}</p>
                    <p className="card-item-title">Tags</p>
                    <TagItem posts={posts} />

                    <div className='btn-group'>
                    <Button className='delete-btn' onClick={handleDelete}
                    >Delete</Button>
                    <Button className='edit-btn' onClick={handleEdit}
                    >Edit</Button>
                    </div>
                  </CardContent>
                  </Card>
                  </Grid>
                </>

              )
              }
            </Grid>
          </div>

        );

      };
export default PostItem;