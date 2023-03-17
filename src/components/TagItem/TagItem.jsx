import React from "react";


function TagItem({post}){
    // console.log('prop post', post)
    return (
        <div className="post-item">
            <ul className="current-tag-list">
                {post.tags_column.map((tag, i) => {
                    return (
                        <li key={i} className="current-tag-item">
                            {tag}
                        </li>
                    )
                })}
            </ul>
            

        </div>

    )
}

export default TagItem;