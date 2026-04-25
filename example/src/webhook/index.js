import client from "../client.js";

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
