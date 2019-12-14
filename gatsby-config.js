/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config();

module.exports = {
  /* Your site config here */
    plugins: [
            {
                "resolve": "gatsby-source-flotiq",		  
                "options": {
                    "baseUrl": process.env.GATSBY_FLOTIQ_BASE_URL,
                    "authToken": process.env.FLOTIQ_API_KEY
                }
            }
        ],
};
