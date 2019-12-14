# gatsby-source-flotiq

## Feature

* Pulls data from Flotif blogpost Content Type

## How to use

```
module.exports = {
  /* Your site config here */
    plugins: [
        {
            "resolve": "gatsby-source-flotiq",
            "options": {
                /*
                * The base URL of Flotiq API without trailing slashes and with protocol
                */
                "baseUrl": "https://api.flotiq.com",
                /*
                * Api token for CMS for your user
                */
                "authToken": "123123123"
            }
        }
    ],
};
```
