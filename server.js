import express from 'express';
import multer from 'multer';
import * as tf from '@tensorflow/tfjs-node';
import cocoSsd from '@tensorflow-models/coco-ssd';

const app = express();
const upload = multer({ dest: 'uploads/' });

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from production build dist and public folder
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }
  }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('*', (req, res, next) => {
    // Exclude API paths and static asset requests with file extensions
    if (req.path.startsWith('/upload') || req.path.includes('.')) {
      return next();
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  app.use(express.static('EDS#1'));
  app.use(express.static('public'));
  app.get('/', (req, res) => {
    res.sendFile('page1.html', { root: 'EDS#1' });
  });
}

app.post('/upload', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;
  try {
    const image = await tf.node.decodeImage(imagePath);
    const model = await cocoSsd.load();
    const predictions = await model.detect(image);

    const elephantDetected = predictions.some(prediction => prediction.class === 'elephant');
    if (elephantDetected) {
      return res.send('Elephant detected!');
    }
    return res.send('No elephant detected.');
  } catch (error) {
    res.status(500).send('Error during detection.');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
