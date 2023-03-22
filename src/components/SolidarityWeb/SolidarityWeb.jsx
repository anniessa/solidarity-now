import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TagItem from "../TagItem/TagItem";

import {
    Card,
    CardContent,
    Grid
} from "@mui/material";
import Web from '../graphics/spider_web.png';
import './SolidarityWeb.css'

function SolidarityWeb() {
    const dispatch = useDispatch();

    const allPosts = useSelector(store => store.post);
    // console.log('store posts on solidarity web', allPosts);

    useEffect(() => {
        dispatch({ type: "GET_POST" })
    }, []);

    return (
        <div>
            <section className='post-section'>
                <div className="center">
                    <h2>Solidarity Web</h2>
                    <img src={Web} style={{width: 200, height: 200}} />
                </div>
                {allPosts.map((post, i) => {
                    return (
                        <div className='container' key={i}>
                            <Grid
                                container
                                display="flex"
                                direction="column"
                                alignItems="center"
                                justify="center"
                                spacing={3}
                                style={{ maxHeight: 500 }}
                            >

                                <Grid
                                    item
                                    display="flex"
                                >
                                    <Card sx={{ width: 270 }}>
                                        <CardContent>
                                            <p className="card-item-title">Request or Offer?</p>
                                            <p>{post.post_type}</p>
                                            <p className="card-item-title">What are you requesting or offering?</p>
                                            <p>{post.content}</p>
                                            <p className="card-item-title">Any additional resources you'd like to share?</p>
                                            <p>{post.additional_resource}</p>
                                            <p className="card-item-title">Tags</p>
                                            <TagItem posts={post} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    )
                }
                )}
            </section>

        </div>
    )
}



export default SolidarityWeb;