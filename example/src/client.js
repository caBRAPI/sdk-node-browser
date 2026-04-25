// import { caBRAPI } from '@cabrapi/sdk';
// import { caBRAPI } from 'https://cdn.jsdelivr.net/npm/@cabrapi/sdk/dist/index.js';
import { caBRAPI } from "../../dist/index.js";

const client = new caBRAPI({
  type: "private",
  config: {
    baseURL: "http://localhost:3000",
    key: process.env.CABRAPI_KEY,
  },
});

export default client;
