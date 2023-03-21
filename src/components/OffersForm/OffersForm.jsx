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
import HandHeart from '../graphics/hand_heart.png'
import './OffersForm.css';

function OffersForm() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_BY_TAG' });
    }, []);

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

    const handleChange = (event, key) => {
        setFullPost({ ...fullPost, [key]: event.target.value })
    };

    const handleTag = (tagObject) => {
        // I want multiple checkboxes to be pushed into the fullPost.tags array
        const newTag = { ...fullPost}
        // console.log(newCopy)
        if (newTag.tags.some(tag => tag.id === tagObject.id)) {
            newTag.tags = newTag.tags.filter((id) => id !== tagObject.id)
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

        }
    }


    return (
        
        <>
        
            <form className='container' onSubmit={handleSubmit}>
                <div className="center">
                    <h2 className="title">Offers/Requests</h2>
                    <img src={HandHeart} />
                </div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                // style={{ minHeight: 400 }}
                >
                    <Grid item m={4}>
                        <Card sx={{ maxWidth: 500 }}>

                            <CardContent>

                                <FormControl error={error}>
                                    <div className='form'>
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

                                        <ul className='tags'>

                                            <p>Tags</p>
                                            
                                            {tagStore.map((individualTag) => {
                                                return (
                                                    <li key={individualTag.id}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={fullPost.tags.some(e => e.id === individualTag.id)}
                                                                    onChange={(e) => handleTag(individualTag)}
                                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                                            value={individualTag.id}
                                                            label={individualTag.tag_name} />
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