import React from "react";


function TagItem({posts}){

    return (
        <div className="post-item">
            <ul className="current-tag-list">
                {posts.tags.map((tag, i) => {
                    return (
                        <li key={i} className="current-tag-item">
                            {tag?.tag_name}
                        </li>
                    )
                })}
            </ul>
            

        </div>

    )
}

export default TagItem;