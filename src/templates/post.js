import React from "react";
import { Link } from 'gatsby';
export default ({ pageContext: { post } }) => (
    <div style={{ width: '90%', margin: '4rem auto' }}>
        <h1>{post.title}</h1>
	{ post.headerImage[0].id &&
        <img src={`${process.env.GATSBY_FLOTIQ_BASE_URL}/image/1920x0/${post.headerImage[0].id}.${post.headerImage[0].extension}`} alt="test" style={{maxWidth: '100%', height: 'auto'}}/>
	}
        <div dangerouslySetInnerHTML={{__html: post.content}} />
        <Link to="/">Back to all posts</Link>
    </div>
);
