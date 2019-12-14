# Simple static blog

## Development

Save your FLOTIQ_API_KEY and BASE_URL in `.env` file, e.g.:

```echo "FLOTIQ_API_KEY=123123123123" > .env```

```echo "GATSBY_FLOTIQ_BASE_URL=https://api.flotiq.com" >> .env```

Install `gatsby` globally:

```npm install -g gatsby-cli```

Install packages

```npm install```

Make sure you have `blogposts` type added to Flotiq (see *Data in CMS* section)

Start gatsby development server (it will only reload when code changed, when data changed you need to stop and run it again)

```gatsby develop```

The site will be accessible on `http://localhost:8000`, you also can use `http://localhost:8000/___graphql` to explore GraphQL 

## Export static site

```gatsby build```

The static files will be in the `public` directory. You can preview them using:

```gatsby serve```

## Data in CMS

You need `blogpost` Content Type in your CMS:

```json
{
    "name": "blogpost",
    "label": "Blog Post",
    "workflowId": "",
    "schemaDefinition": {
        "type": "object",
        "allOf": [
            {
                "$ref": "#/components/schemas/AbstractContentTypeSchemaDefinition"
            }
        ],
        "required": [
            "title",
            "slug",
            "content",
            "headerImage",
            "thumbnail"
        ],
        "properties": {
            "title": {
                "type": "string"
            },
            "content": {
                "type": "string"
            },
            "slug": {
                "type": "string"
            },
            "headerImage": {
                "type": "array",
                "items": {
                    "$ref": "#/components/schemas/DataSource"
                },
                "minItems": 1
            },
            "thumbnail": {
                "type": "array",
                "items": {
                    "$ref": "#/components/schemas/DataSource"
                },
                "minItems": 1
            }
        },
        "additionalProperties": false
    },
    "metaDefinition": {
        "order": [
            "title",
            "content",
            "slug",
            "headerImage",
            "thumbnail"
        ],
        "propertiesConfig": {
            "title": {
                "inputType": "text",
                "unique": false
            },
            "content": {
                "inputType": "richtext",
                "unique": false
            },
            "slug": {
                "inputType": "text",
                "unique": true
            },
            "headerImage": {
                "inputType": "datasource",
                "unique": false,
                "validation": {
                    "relationContenttype": "_media"
                }
            },
            "thumbnail": {
                "inputType": "datasource",
                "unique": false,
                "validation": {
                    "relationContenttype": "_media"
                }
            }
        }
    }
}
```

to create it use (you need to add auth info at the end):

```
curl 'https://api.flotiq.com/api/v1/internal/contenttype' -H 'accept: */*' -H 'X-AUTH-TOKEN: 43292df7374a8a2eb82b81865644d1c' -H 'Content-Type: application/json' --data-binary '{"name":"blogpost","label":"Blog Post","workflowId":"","schemaDefinition":{"type":"object","allOf":[{"$ref":"#/components/schemas/AbstractContentTypeSchemaDefinition"}],"required":["title","slug","content","headerImage","thumbnail"],"properties":{"title":{"type":"string"},"content":{"type":"string"},"slug":{"type":"string"},"headerImage":{"type":"array","items":{"$ref":"#/components/schemas/DataSource"},"minItems":1},"thumbnail":{"type":"array","items":{"$ref":"#/components/schemas/DataSource"},"minItems":1}},"additionalProperties":false},"metaDefinition":{"order":["title","content","slug","headerImage","thumbnail"],"propertiesConfig":{"title":{"inputType":"text","unique":false},"content":{"inputType":"richtext","unique":false},"slug":{"inputType":"text","unique":true},"headerImage":{"inputType":"datasource","unique":false,"validation":{"relationContenttype":"_media"}},"thumbnail":{"inputType":"datasource","unique":false,"validation":{"relationContenttype":"_media"}}}}}' -H 'X-AUTH-TOKEN: '
```

or you can simply add it by swagger-test using full definition displayed above.
