import React from "react";
import { Link } from 'gatsby';

export default ({ pageContext: { allPosts } }) => (
    <div style={{ width: '90%', margin: '4rem auto' }}>
        <h1>Posts</h1>
        <ul>
            {allPosts.map(post => (
                <li
                    key={post.id}
                >
                    <Link to={`/post/${post.slug}/`}>
                        <p>{post.title}</p>
		    {post.thumbnail[0].id &&
                        <img src={`${process.env.GATSBY_BASE_URL}/image/250x250/${post.thumbnail[0].id}.${post.thumbnail[0].extension}`} alt="test"/>
			}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);
