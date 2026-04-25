import client from "../client.js";

// GET /stores/:storeId/categories (public)
client.categories
  .get("3b751276-101d-48ba-8fb1-bb8e4bbf4277", {
    page: 1,
    limit: 20,
  })
  .then((categories) => {
    console.log(categories);
  })
  .catch((err) => {
    console.log(err);
  });

// GET /stores/:storeId/categories/:categoryId (private)
client.categories
  .getById(
    "3b751276-101d-48ba-8fb1-bb8e4bbf4277",
    "71b1abcf-54dd-4003-958b-4bd67c936036",
  )
  .then((category) => {
    console.log(category);
  })
  .catch((err) => {
    console.log(err);
  });

// POST /stores/:storeId/categories (private)
client.categories
  .post("3b751276-101d-48ba-8fb1-bb8e4bbf4277", {
    name: "Eletronicos",
    description: "Produtos eletronicos em geral",
    image: "https://example.com/category.png",
    metadata: {
      featured: true,
      slug: "eletronicos",
    },
  })
  .then((category) => {
    console.log(category);
  })
  .catch((err) => {
    console.log(err);
  });

// PUT /stores/:storeId/categories/:categoryId (private)
client.categories
  .put(
    "3b751276-101d-48ba-8fb1-bb8e4bbf4277",
    "71b1abcf-54dd-4003-958b-4bd67c936036",
    {
      name: "Eletronicos Premium",
      description: "Categoria atualizada",
      position: 2,
      metadata: {
        featured: false,
        slug: "eletronicos-premium",
      },
    },
  )
  .then((category) => {
    console.log(category);
  })
  .catch((err) => {
    console.log(err);
  });

// PUT /stores/:storeId/categories/reorder (private)
client.categories
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

// DELETE /stores/:storeId/categories/:categoryId (private)
client.categories
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
