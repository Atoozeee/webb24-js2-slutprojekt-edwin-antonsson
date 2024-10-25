//För att hålla min backend-kod enkel att läsa ändrade jag den så att server.js endast har denna simpla bas-koden och istället har 2 sidogrenar
//som hanterar min purchase-handling och mina products/search/sort funktioner.

import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.js';
import purchaseRouter from './routes/purchase.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/products', productsRouter);
app.use('/purchase', purchaseRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
