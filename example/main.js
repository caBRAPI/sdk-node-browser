// import { caBRAPI } from '@cabrapi/sdk';
// import { caBRAPI } from 'https://cdn.jsdelivr.net/npm/@cabrapi/sdk/dist/index.js';
import { caBRAPI } from "../dist/index.js";

const client = new caBRAPI({
  type: "private",
  config: {
    key: "sua-chave-aqui",
  },
});

// GET /stores (private)
client.stores
  .get({
    page: 2,
    limit: 1,
  })
  .then((store) => {
    console.log(store);
  })
  .catch((err) => {
    console.log(err);
  });

// GET /stores/:storeId (private)
client.stores
  .getById("b23a64ee-762b-4bf4-89fa-953ab4e2ac71")
  .then((store) => {
    console.log(store);
  })
  .catch((err) => {
    console.log(err);
  });

// POST /stores (private)
client.stores
  .post({
    name: "Minha Loja",
    description: "Descricao da minha loja para teste",
    image: "https://example.com/store.png",
    template: "PERSONALIZADO",
    metadata: { origem: "teste" },
    domain: {
      type: "DEFAULT",
      value: "minha-loja-teste",
    },
  })
  .then((store) => {
    console.log(store);
  })
  .catch((err) => {
    console.log(err);
  });

// PUT /stores/:storeId (private)
client.stores
  .put("b23a64ee-762b-4bf4-89fa-953ab4e2ac71", {
    template: "PERSONALIZADO",
    name: "caBRAPI",
    description: "Descricao atualizada da loja para teste",
    metadata: { origem: "teste", atualizada: false },
    domain: {
      type: "DEFAULT",
      value: "minha-loja-atualizada",
    },
  })
  .then((store) => {
    console.log(store);
  })
  .catch((err) => {
    console.log(err);
  });

// PUT /stores/reorder (private)
client.stores
  .reorder([
    "b23a64ee-762b-4bf4-89fa-953ab4e2ac71",
    "f3e4bcb8-4c46-43a4-9bff-bb24c7649d61",
  ])
  .then((reorder) => {
    console.log(reorder);
  })
  .catch((err) => {
    console.log(err);
  });

// DELETE /stores/:storeId (private)
client.stores
  .delete("b23a64ee-762b-4bf4-89fa-953ab4e2ac71")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// GET /stores/:storeId/webhooks (private)
client.webhooks
  .get("b23a64ee-762b-4bf4-89fa-953ab4e2ac71")
  .then((webhooks) => {
    console.log(webhooks);
  })
  .catch((err) => {
    console.log(err);
  });

// POST /stores/:storeId/webhooks (private)
client.webhooks
  .post("b23a64ee-762b-4bf4-89fa-953ab4e2ac71", {
    url: "https://meusistema.com/callback",
  })
  .then((webhook) => {
    console.log(webhook);
  })
  .catch((err) => {
    console.log(err);
  });

// DELETE /stores/:storeId/webhooks (private)
client.webhooks
  .delete("b23a64ee-762b-4bf4-89fa-953ab4e2ac71", {
    url: "https://meusistema.com/callback",
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// GET /pages/:domain (public)
client.pages
  .get("testando-web.cabrapi.com.br")
  .then((page) => {
    console.log(page);
  })
  .catch((err) => {
    console.log(err);
  });

// UPSERT /pages/:domain (private)
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

// DELETE /pages/:domain (private)
client.pages
  .delete("testando-web.cabrapi.com.br")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
