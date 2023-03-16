import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SolidarityWebItem from '../SolidarityWebItem/SolidarityWebItem';
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
                <img src={Web} />
                </div>
                {allPosts.map((post, i) => {
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

                                <Card sx={{ maxWidth: 500 }}>
                                    <CardContent>
                                        <p>{post.post_type}</p>
                                        <p>{post.content}</p>
                                        <p>{post.additional_resource}</p>
                                    </CardContent>

                                    <ul><SolidarityWebItem post={post} /></ul>
                                </Card>
                            </Grid>
                        </div>
                    )


                })}
            </section>

        </div>
    )
}

export default SolidarityWeb;