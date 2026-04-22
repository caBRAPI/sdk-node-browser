// import { caBRAPI } from '@cabrapi/sdk';
// import { caBRAPI } from 'https://cdn.jsdelivr.net/npm/@cabrapi/sdk/dist/index.js';
import { caBRAPI } from "../dist/index.js";

const client = new caBRAPI({
  type: "private",
  config: {
    key: "sua-chave-aqui",
  },
});

// GET PAGES (public/private)
client.pages
  .get("testando-web.cabrapi.com.br")
  .then((page) => {
    console.log(page);
  })
  .catch((err) => {
    console.log(err);
  });

// UPSERT PAGES (private)
client.pages
  .upsert({
    domain: "testando-web.cabrapi.com.br",
    html: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><script type="module">import { caBRAPI } from "../ sdk - node - browser / dist / index.js";const client=new caBRAPI({type:"public",config:{baseURL:"http://localhost:3000"}});client.pages.get("cafe.com").then(page=>console.log(page)).catch(err=>console.log(err));</script></head><body></body></html>',
    template: "DEFAULT",
  })
  .then((pages) => {
    console.log(pages);
  })
  .catch((err) => {
    console.log(err);
  });

// DELETE PAGES (private)
client.pages
  .delete("testando-web.cabrapi.com.br")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
