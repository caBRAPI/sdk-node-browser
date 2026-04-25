import client from "../client.js";

// GET /stores/:storeId/coupons (private)
client.coupons
  .get("3b751276-101d-48ba-8fb1-bb8e4bbf4277", {
    page: 1,
    limit: 20,
  })
  .then((coupons) => {
    console.log(coupons);
  })
  .catch((err) => {
    console.log(err);
  });

// GET /stores/:storeId/coupons/:code (public)
client.coupons
  .getByCode("3b751276-101d-48ba-8fb1-bb8e4bbf4277", "BEMVINDO10")
  .then((coupon) => {
    console.log(coupon);
  })
  .catch((err) => {
    console.log(err);
  });

// GET /stores/:storeId/coupons/uuid/:couponId (private)
client.coupons
  .getById(
    "3b751276-101d-48ba-8fb1-bb8e4bbf4277",
    "71b1abcf-54dd-4003-958b-4bd67c936036",
  )
  .then((coupon) => {
    console.log(coupon);
  })
  .catch((err) => {
    console.log(err);
  });

// POST /stores/:storeId/coupons (private)
client.coupons
  .post("3b751276-101d-48ba-8fb1-bb8e4bbf4277", {
    code: "BEMVINDO10",
    discount: 10,
    useLimit: -1,
    productIds: ["71b1abcf-54dd-4003-958b-4bd67c936036"],
  })
  .then((coupon) => {
    console.log(coupon);
  })
  .catch((err) => {
    console.log(err);
  });

// PUT /stores/:storeId/coupons/:couponId (private)
client.coupons
  .put(
    "3b751276-101d-48ba-8fb1-bb8e4bbf4277",
    "71b1abcf-54dd-4003-958b-4bd67c936036",
    {
      discount: 15,
      useLimit: 200,
    },
  )
  .then((coupon) => {
    console.log(coupon);
  })
  .catch((err) => {
    console.log(err);
  });

// PUT /stores/:storeId/coupons/reorder (private)
client.coupons
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

// DELETE /stores/:storeId/coupons/:couponId (private)
client.coupons
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
