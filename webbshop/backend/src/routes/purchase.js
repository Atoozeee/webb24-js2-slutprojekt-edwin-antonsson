import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, '../products.json');

router.post('/', (req, res) => {
    const purchasedItems = req.body;
  
    fs.readFile(productsFile, (err, data) => {
      if (err) {
        res.status(500).send('Error reading products file');
      } else {
        const products = JSON.parse(data);
  
        const insufficientStock = purchasedItems.some((item) => {
          const product = products.find((p) => p.id === item.id);
          return product && item.quantity > product.stock;
        });
  
        if (insufficientStock) {
          res.status(400).send('Not enough stock for one or more items.');
          return;
        }
  
        purchasedItems.forEach((item) => {
          const product = products.find((p) => p.id === item.id);
          if (product) {
            product.stock -= item.quantity;
          }
        });
  
        fs.writeFile(productsFile, JSON.stringify(products, null, 2), (writeErr) => {
          if (writeErr) {
            res.status(500).send('Error updating products file');
          } else {
            res.send('Purchase successful');
          }
        });
      }
    });
  });

  export default router;