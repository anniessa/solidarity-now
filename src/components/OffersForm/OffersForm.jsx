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
    const tags = useSelector(store => store.tag);

    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    let [fullPost, setFullPost] = useState({
        post_type: '',
        content: '',
        additional_resource: '',
        tag_ids: [],
        user_id: user.id,
    })

    const handleChange = (event, key) => {
        setFullPost({ ...fullPost, [key]: event.target.value })
    };

    const handleTag = (event) => {
        // first worry about adding an id to the array.
        const newCopy = { ...fullPost }
        // console.log(newCopy)
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