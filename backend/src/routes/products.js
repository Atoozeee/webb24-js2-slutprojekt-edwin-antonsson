// Jag hade tidigare min search/sort functionality i min Products.jsx frontend fil, men nu har jag skickat back den till denna filen
// för mer korrekt separering av kodfunktioner.

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, '../products.json');

router.get('/', (req, res) => {
    const search = req.query.search?.toLowerCase() || '';
    const sortOrder = req.query.sortOrder || 'asc';
  
      fs.readFile(productsFile, (err, data) => {
        if (err) {
          res.status(500).send('Error reading products file');
        } else {
          let products = JSON.parse(data);
  
          if (search) {
            products = products.filter((products) =>
              products.name.toLowerCase().includes(search)
            );
          }
          if (sortOrder === 'asc') {
            products.sort((a, b) => a.price - b.price);
          } else if (sortOrder === 'desc') {
            products.sort((a, b) => b.price - a.price);
          }
          res.json(products);
        }
      });
  });

  export default router;