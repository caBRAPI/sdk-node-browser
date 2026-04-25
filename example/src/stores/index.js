import client from "../client.js";

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
