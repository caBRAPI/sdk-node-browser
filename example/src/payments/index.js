import client from "../client.js";

const storeId = "3b751276-101d-48ba-8fb1-bb8e4bbf4277";
const paymentId = "71b1abcf-54dd-4003-958b-4bd67c936036";

// GET /stores/:storeId/payments (private)
client.payments
  .get(storeId, {
    page: 1,
    limit: 20,
  })
  .then((payments) => {
    console.log(payments);
  })
  .catch((err) => {
    console.log(err);
  });

// GET /stores/:storeId/payments/filter (private)
client.payments
  .filter(storeId, {
    gateway: "MERCADOPAGO",
    status: "APPROVED",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  })
  .then((payments) => {
    console.log(payments);
  })
  .catch((err) => {
    console.log(err);
  });

// POST /stores/:storeId/payments (public)
client.payments
  .post(storeId, {
    name: "Joao Silva",
    email: "joao@email.com",
    cpf: "12345678909",
    gateway: "MERCADOPAGO_SERVICE_PIX",
    coupon: "BEMVINDO10",
    metadata: {
      source: "sdk-example",
      utm: "payments-test",
    },
    items: [
      {
        productId: "c6f0d28a-8ce2-4a8f-9771-4df1f2a7f3a1",
        quantity: 1,
      },
    ],
  })
  .then((payment) => {
    console.log(payment);
  })
  .catch((err) => {
    console.log(err);
  });

// PUT /stores/:storeId/payments/:paymentId (private)
client.payments
  .put(storeId, paymentId, {
    shipment: "SHIPPED",
    metadata: {
      trackingCode: "BR123456789",
    },
  })
  .then((payment) => {
    console.log(payment);
  })
  .catch((err) => {
    console.log(err);
  });

// DELETE /stores/:storeId/payments/:paymentId (private)
client.payments
  .delete(storeId, paymentId)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
