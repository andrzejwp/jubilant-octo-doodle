exports.createPages = async ({ graphql, actions }) => {
    const {createPage} = actions;
    const data = await graphql(`
    query GetBlogPosts {
      allFlotiqBlogPost(sort: {fields: flotiqInternal___createdAt, order: DESC}) {
        nodes {
          headerImage {
            extension
            id
          }
          thumbnail {
            extension
            id
          }
          content
          id
          slug
          title
        }
      }
    }
  `);
    let allPosts = data.data.allFlotiqBlogPost.nodes;
    createPage({
        path: `/`,
        component: require.resolve("./src/templates/all-posts.js"),
        context: { allPosts },
    });

    allPosts.forEach(post => {
        createPage({
            path: `/post/${post.slug}/`,
            component: require.resolve("./src/templates/post.js"),
            context: { post },
        })
    });
};
