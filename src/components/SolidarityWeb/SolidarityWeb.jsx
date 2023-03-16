import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SolidarityWebItem from '../SolidarityWebItem/SolidarityWebItem';

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
                <h2>Solidarity Web</h2>
                {allPosts.map((post, i) => {
                    return (
                        <div className='container' key={i}>
                        <p>{post.post_type}</p>
                        <p>{post.content}</p>
                        <p>{post.additional_resource}</p>

                        <ul><SolidarityWebItem post={post} /></ul>
                        </div>
                    )
                    

                })}
            </section>

        </div>
    )
}

export default SolidarityWeb;