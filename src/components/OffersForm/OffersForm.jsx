import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Checkbox,
    Radio,
    RadioGroup,
    FormHelperText,
    FormControl,
    FormControlLabel,
    Button,
    TextField
} from "@mui/material";
import {tags} from './tags';

function OffersForm() {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    const [content, setContent] = useState('');
    const [resource, setResource] = useState('');
    const [postType, setPostType] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    
    const [checked, setChecked] = useState(new Array(tags.length).fill(false));

    
    const handleChange = (event) => {
        setPostType(event.target.value);
    }

    const handleTag = (event) => {
        const updatedChecked = checked.map((tag, index) =>
            index === event ? !tag : tag
        );
        setChecked(updatedChecked);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (postType === null) {
            setHelperText('Please select whether you are offering or requesting.');
            setError(true);
        } else {
            dispatch({
                type: 'ADD_POST',
                payload: {
                    post_type: postType,
                    content: content,
                    additional_resource: resource,
                    tag_name: checked,
                    user_id: user.id
                }
            })
            setPostType('');
            setContent('');
            setResource('');
        }
    }


    return (
        <>
            <form className='container' onSubmit={handleSubmit}>
                <h2>Offers/Requests</h2>
                <FormControl error={error}>
                    <div className='radio-group'>
                        <RadioGroup
                            row
                            aria-labelledby='offer-request-form'
                            name='Offer or Request'
                            value={postType}
                            onChange={handleChange}
                        >
                            <FormControlLabel value='Request' control={<Radio />} label='Request' />
                            <FormControlLabel value='Offer' control={<Radio />} label='Offer' />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                        <TextField label="What are you offering/requesting?"
                            value={content}
                            onChange={e => { setContent(e.target.value) }}
                        />
                        <TextField label="Any resources you want to share??"
                            value={resource}
                            onChange={e => { setResource(e.target.value) }}
                        />
                        <ul className='tags'>
                            {tags.map(({ name }, index) => {
                            return (
                            <li key={index}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={checked[index]}
                                        onChange={() => handleTag(index)}
                                        inputProps={{ 'aria-label': 'controlled' }} />}
                                    label={name} />
                            </li>
                            );
                            
                            })}
                        </ul>
                        

                        {/* <FormControlLabel control={<Checkbox
                            checked={checked}
                            onChange={handleTag}
                            inputProps={{ 'aria-label': 'controlled' }} />}
                            label='Food Justice' />

                        <FormControlLabel control={<Checkbox
                            checked={checked}
                            onChange={handleTag}
                            inputProps={{ 'aria-label': 'controlled' }} />}
                            label='Direct Action' /> */}

                        <Button
                            type='submit'
                            value='Submit'>
                            Submit
                        </Button>
                    </div>

                </FormControl>
            </form>
        </>
    )
}

export default OffersForm;