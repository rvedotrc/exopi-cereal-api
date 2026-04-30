# The API

## Authenticating

Write operations (POST, PUT, DELETE) require authentication, using an API key. The key should be provided in the request header, in the form: `Authorization: Bearer API_KEY`.

The API keys are recognisable by the fact that they always start with `xcak`.

GET operations do not require authentication.

## Entities

A cereal record looks like this:

```json
{
  "id": "01KQ9VV66X5YX5G3MPDXV5BM3N",
  "name": "100% Natural Bran",
  "mfr": "Q",
  "type": "C",
  "calories": 120,
  "protein": 3,
  "fat": 5,
  "sodium": 15,
  "fiber": 2,
  "carbo": 8,
  "sugars": 8,
  "potass": 135,
  "vitamins": 0,
  "shelf": 3,
  "weight": 1,
  "cups": 1,
  "rating": 33
}
```

Error responses, where the HTTP response status code will be 4xx, look like this:

```json
{
  "error": "...."
}
```

Error response bodies are not intended to be machine-readable.

## Operations

### Fetching cereals

GET `http://localhost:7835/api/cereals`, optionally with sorting, and optionally with filtering.

The response is of the form:

```json
{
    "cereals": [
        CEREAL,
        CEREAL,
        CEREAL,
        ...
    ]
}
```

where each CEREAL record is as per the example above.

#### Sorting

This is based on the [JSON API](https://jsonapi.org/format/#fetching-sorting) spec.

- Use the query string parameter `?sort=SPEC`
- SPEC specifies the fields on which the data should be sorted
- it's a comma-separated list of KEY
- where each KEY is a field name
  - optionally prefixed by `-` (to indicate a descending order, instead of ascending)
- the server always appends `id` (ascending) as a final sort key

Examples:

- Fetch all, sort by ID: http://localhost:7835/api/cereals
- Fetch all, sort by shelf (descending), then name, then id: http://localhost:7835/api/cereals?sort=-shelf,name

#### Filtering

- Use the query string parameter `?filter=SPEC`
- SPEC is a JSON-encoded filter spec

Filter specs are defined in F<./src/lib/filter/types.ts>

Examples:

- Fetch those records where `shelf` = 3: [`{"b":["shelf","eq","3"]}`](http://localhost:7835/api/cereals?filter=%7B%22b%22%3A%5B%22shelf%22%2C%22eq%22%2C%223%22%5D%7D)
- Fetch those records where `shelf` = 3 and where the `mfr` is not "K": [`{"and":[{"b":["shelf","eq","3"]},{"not":{"b":["mfr","eq","K"]}}]}`](http://localhost:7835/api/cereals?filter=%7B%22and%22%3A%5B%7B%22b%22%3A%5B%22shelf%22%2C%22eq%22%2C%223%22%5D%7D%2C%7B%22not%22%3A%7B%22b%22%3A%5B%22mfr%22%2C%22eq%22%2C%22K%22%5D%7D%7D%5D%7D)

### Creating / updating a cereal

`POST http://localhost:7835/api/cereals/`, with a JSON request body. The request body is either a CEREAL record, or it's a CEREAL record but without the `id` field.

To create a record, omit the `id`. To update a record, provide its `id`.

Responses:

- HTTP status 401 with a JSON error response (authorization required)
- HTTP status 201 (Created), with a Location header, with the body `{"id":ID}` (showing the ID of the new record) - if the cereal was created
- HTTP status 303, with a Location header, with the body `{"id":ID}` - if the cereal was updated
- HTTP status 400 (Bad Request) - if the provided JSON was malformed
- HTTP status 404 (Not found) - if there was no cereal with the provided ID

### Fetch cereal by ID

GET http://localhost:7835/api/cereals/:ID

Responses:

- if the record exists, the response is of the form `{"cereal": CEREAL}` with status 200
- otherwise, there will be an error response with status 404.

### Updating a cereal

PUT http://localhost:7835/api/cereals/:ID, with a JSON request body. The request body is either a CEREAL record, or it's a CEREAL record but without the `id` field.

The `id` field MAY be omitted from the request body. If it is provided, then it MUST match the ID provided in the URL.

Responses:

- HTTP status 401 with a JSON error response (authorization required)
- 404 (malformed ID)
- 404 (no such record)
- 303 with Location, and `{"id":ID}` (on successful update)

### Delete a cereal

DELETE http://localhost:7835/api/cereals/:ID

Responses:

- HTTP status 401 with a JSON error response (authorization required)
- HTTP status 204 (No Content) - if the record existed and was deleted, or did not exist
- HTTP status 400 (Bad Request) - if the provided ID was malformed
