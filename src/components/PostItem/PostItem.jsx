import TagItem from "../TagItem/TagItem";
import { useSelector, useDispatch } from "react-redux";

function PostItem({post}) {
    const dispatch = useDispatch();

    const posts = useSelector((store) => store.post);
    const tags = useSelector((store) => store.tag);

    const [isEditing, setEditing] = useState(false);
  
    let [fullPost, setFullPost] = useState({
      post_type: posts.post_type,
      content: posts.content,
      additional_resource: posts.additional_resource,
      tag_ids: [tags.id],
    })
  
    useEffect(() => {
      dispatch({ type: "GET_POST_BY_ID" })
    }, []);
  
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
      event.preventDefault;
      dispatch({
        type: 'EDIT_POST',
        payload: fullPost
      });
      setEditing(!isEditing);
    }

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
              {isEditing ? (
                <>
                  <form onSubmit={handleEditSubmit}>
                    <Card sx={{ maxWidth: 500 }} key={posts.id}>
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
                        <Button onClick={handleEdit}> Cancel </Button>
                        <Button type="submit" value="Save"> Save </Button>
                      </CardContent>
                    </Card>
                  </form>
                </>
              ) : (
                <>
                  <CardContent>
                    <p>{post.post_type}</p>
                    <p>{post.content}</p>
                    <p>{post.additional_resource}</p>

                    <TagItem post={post} />
                    <Button>Delete</Button>
                    <Button
                      onClick={handleEdit}
                    >Edit</Button>
                  </CardContent>
                </>

              )
              }
            </Grid>
          </div>

        );

      };
export default PostItem;