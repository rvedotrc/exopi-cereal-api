# Solution

Stack:

- TypeScript, using the NextJS framework
- Effect, principally for input data validation
- TypeORM, to access the database
- SQLite for persistence

## The database

- cereals (the main data)
- users / api_keys (for authn/authz)

An API is provided for manipulating `cereals`. No API is provided for manipulating `users` / `api_keys`.

The primary key `id`s used are ULIDs.
