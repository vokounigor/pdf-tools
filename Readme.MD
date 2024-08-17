# PDF Tools

### A web app for reading pdf internals

To run this project, you'll need to run it from within docker.
The reason for this is that the project relies on [pdftk cli](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/). Development should also be done using docker.

To start the dev server, run:

```bash
yarn docker
```

To start the prod version, run:

```bash
docker compose -f ./docker-compose.prod.yml up
```

Tools used for this project:

- [express](https://expressjs.com/)
- [ejs](https://ejs.co/#promo)
- [htmx](https://htmx.org/)
- [dayjs](https://day.js.org/)
