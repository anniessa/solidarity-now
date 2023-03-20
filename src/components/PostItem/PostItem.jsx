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

function PostItem({post}) {
    const dispatch = useDispatch();

    const tags = useSelector((store) => store.tag);
    const user = useSelector((store) => store.user);
    const tagsPosts = useSelector((store) =>  store.tagsPosts);

    // console.log('tagsPosts', tagsPosts)
  useEffect(() => {
    dispatch({type: 'GET_POST_BY_ID', payload: user.id}),
    dispatch({type: 'GET_TAG_RELATIONS'})
  }, []);

  const handleDelete = () => {
    dispatch({ type: "DELETE_POST", payload: post.id})
    // console.log('post id', post.id)
  }
 
    const [isEditing, setEditing] = useState(false);

    let [fullPost, setFullPost] = useState({
      postId: post.id,
      post_type: post.post_type,
      content: post.content,
      additional_resource: post.additional_resource,
      tag_ids: [tagsPosts.tags_id]
    })

    const handleEdit = () => {
      setEditing(!isEditing);
    }
  
    const handleChange = (event, key) => {
      setFullPost({ ...fullPost, [key]: event.target.value })
    };
  
    const handleTag = (event) => {
      const newCopy = { ...fullPost }
      const tagId = Number(event.target.value);
      // console.log(tagId, newCopy.tag_ids);
      // console.log(newCopy.tag_ids.includes(tagId))
      if (newCopy.tag_ids.includes(tagId)) {
          newCopy.tag_ids = newCopy.tag_ids.filter((id) => id !== tagId)
      } else {
          newCopy.tag_ids.push(tagId);
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

    return (
        <div className='container'>
            <Grid
              container
              display="flex"
              direction="column"
              alignItems="stretch"
              justify="space-evenly"
              spacing={2}
            //   style={{ maxHeight: 500 }}
            >
              {isEditing ? (
                <>
                  <form onSubmit={handleEditSubmit}>
                    <Grid 
                    item 
                    display="flex"
                    >
                    <Card 
                    sx={{ maxWidth: 500, height: 650 }} key={post.id}>
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
                          {tags.map(tag => {
                            return (
                              <li key={tag.id}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={fullPost.tag_ids.includes(tag.id)}
                                      onChange={handleTag}
                                      inputProps={{ 'aria-label': 'controlled' }} />}
                                  value={tag.id}
                                  label={tag.tag_name} />
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
                    <p>{post.post_type}</p>
                    <p className="card-item-title">What are you requesting or offering?</p>
                    <p>{post.content}</p>
                    <p className="card-item-title">Any additional resources you'd like to share?</p>
                    <p>{post.additional_resource}</p>
                    <p className="card-item-title">Tags</p>
                    <TagItem post={post} />

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