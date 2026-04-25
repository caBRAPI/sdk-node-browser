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

// Helper SDK: parse payload criptografado do webhook de assinatura (backend)
// Exemplo para usar dentro do seu controller Express:
//
// const parsed = await client.webhooks.decrypty("SUA_API_KEY_PRIVATE", req.body.payload);
// // ou:
// // const parsed = await client.webhooks.decrypt("SUA_API_KEY_PRIVATE", req.body.payload);
// if (parsed.event === "WEBHOOK_TEST") return res.sendStatus(205);
// if (parsed.status !== "APPROVED") return res.sendStatus(200);
// console.log(parsed);
