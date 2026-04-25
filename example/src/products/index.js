import client from "../client.js";

// GET /stores/:storeId/products (public)
client.products
  .get("3b751276-101d-48ba-8fb1-bb8e4bbf4277", {
    page: 1,
    limit: 20,
  })
  .then((products) => {
    console.log(products);
  })
  .catch((err) => {
    console.log(err);
  });

// GET /stores/:storeId/products/:productId (public)
client.products
  .getById(
    "3b751276-101d-48ba-8fb1-bb8e4bbf4277",
    "71b1abcf-54dd-4003-958b-4bd67c936036",
  )
  .then((product) => {
    console.log(product);
  })
  .catch((err) => {
    console.log(err);
  });

// POST /stores/:storeId/products (private)
client.products
  .post("3b751276-101d-48ba-8fb1-bb8e4bbf4277", {
    name: "Curso Premium",
    description: "Acesso completo ao conteúdo.",
    image: "https://example.com/product.png",
    categoryIds: ["71b1abcf-54dd-4003-958b-4bd67c936036"],
    delivery: "DIGITAL",
    price: 49.9,
    stock: 100,
    disabled: false,
    metadata: { origin: "sdk-example" },
  })
  .then((product) => {
    console.log(product);
  })
  .catch((err) => {
    console.log(err);
  });

// PUT /stores/:storeId/products/:productId (private)
client.products
  .put(
    "3b751276-101d-48ba-8fb1-bb8e4bbf4277",
    "71b1abcf-54dd-4003-958b-4bd67c936036",
    {
      name: "Curso Premium Atualizado",
      price: 59.9,
      stock: 80,
      disabled: true,
      position: 2,
    },
  )
  .then((product) => {
    console.log(product);
  })
  .catch((err) => {
    console.log(err);
  });

// PUT /stores/:storeId/products/reorder (private)
client.products
  .reorder("3b751276-101d-48ba-8fb1-bb8e4bbf4277", [
    "c6f0d28a-8ce2-4a8f-9771-4df1f2a7f3a1",
    "a6f0d28a-8ce2-4a8f-9771-4df1f2a7f3a2",
    "b6f0d28a-8ce2-4a8f-9771-4df1f2a7f3a3",
  ])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// DELETE /stores/:storeId/products/:productId (private)
client.products
  .delete(
    "3b751276-101d-48ba-8fb1-bb8e4bbf4277",
    "c6f0d28a-8ce2-4a8f-9771-4df1f2a7f3a1",
  )
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
