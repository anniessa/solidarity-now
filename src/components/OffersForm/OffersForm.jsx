import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Checkbox,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Radio,
    RadioGroup,
    FormHelperText,
    FormControl,
    FormControlLabel,
    Button,
    TextField
} from "@mui/material";
import { useHistory } from "react-router-dom";
import HandHeart from '../graphics/hand_heart.png'
import './OffersForm.css';

function OffersForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    const tagStore = useSelector(store => store.tag);

    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    let [fullPost, setFullPost] = useState({
        post_type: '',
        content: '',
        additional_resource: '',
        tags: [],
        user_id: user.id,
    })

    useEffect(() => {
        dispatch({ type: 'GET_TAGS' })
      }, []);

    const handleChange = (event, key) => {
        setFullPost({ ...fullPost, [key]: event.target.value })
    };

    const handleTag = (tagObject) => {
        // I want multiple checkboxes to be pushed into the fullPost.tags array
        const newTag = { ...fullPost }
        // console.log(newCopy)
        if (newTag.tags.some(tag => tagObject.id === tag.id)) {
            newTag.tags = newTag.tags.filter((tag) => tag.id !== tagObject.id)
        } else {
            newTag.tags.push(tagObject);
        }
        setFullPost(newTag);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (fullPost.post_type === null) {
            setHelperText('Please select whether you are offering or requesting.');
            setError(true);
        } else {
            dispatch({
                type: 'ADD_POST',
                payload: fullPost,
                callback: setFullPost
            })
            history.push("/solidarityWeb")

        }
    }

    return (

        <>

            <form onSubmit={handleSubmit}>
                <div className="center">
                    <h2 className="title">Offers/Requests</h2>
                    <img src={HandHeart} style={{ width: 200, height: 200 }} />
                </div>
                <Grid
                    container
                    spacing={0}
                    display='flex'
                    direction="column"
                    alignItems="center"
                    justify="center"
                    sx={{ maxWidth: '350px' }}
                >
                    <Grid item m={2}>
                        <Card>
                            <CardContent >
                                <FormControl error={error}>
                                    <div>
                                        <div className='radio-group'>
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
                                        </div>
                                        <FormHelperText>{helperText}</FormHelperText>

                                        <div className="text-field">
                                            <TextField
                                                fullWidth
                                                label="What are you offering/requesting?"
                                                value={fullPost.content}
                                                onChange={(e) => { handleChange(e, 'content') }}
                                                sx={{
                                                    mb: 2
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Any resources you want to share?"
                                                value={fullPost.additional_resource}
                                                onChange={(e) => { handleChange(e, 'additional_resource') }}
                                            />
                                        </div>

                                        <ul className='tags'>

                                            <p>Tags</p>

                                            {tagStore.map((individualTag) => {
                                                return (
                                                    <li key={individualTag.id}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={fullPost.tags?.some((tag) => tag?.id === individualTag?.id)}
                                                                    onChange={(e) => handleTag(individualTag)}
                                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                                            value={individualTag.id}
                                                            label={individualTag.tag_name} 
                                                            sx={{
                                                                align: "left"
                                                            }}
                                                            />
                                                    </li>
                                                );

                                            })}
                                        </ul>


                                        <Button
                                            type='submit'
                                            value='Submit'>
                                            Submit
                                        </Button>

                                    </div>


                                </FormControl>
                            </CardContent>


                        </Card>
                    </Grid>
                </Grid>
            </form>


        </>
    )
}

export default OffersForm;