# Cereal API

## Installation

If you're using `asdf`, then run `asdf install`. Otherwise, please see F<.tool-versions> and install the versions shown.

Create the database:

```shell
sqlite3 cereals.db < schema.sql
sqlite3 cereals.db < initData.sql
```

Get the code running:

```shell
pnpm install
# At this point, you may then also need to run "pnpm approve-builds"
pnpm build
pnpm run dev
```

Upload the initial data:

```shell
curl -i -X POST -H "Authorization: Bearer TOKEN" --data-binary @cereal.csv http://localhost:7835/api/cereals/upload
```

where TOKEN (beginning `xcak`) is found in F<initData.sql>.

## Further reading

- [The API](./API.md)
- [Solution Design](./Solution.md)
- [Thoughts on the original requirements](./Thoughts.md)
