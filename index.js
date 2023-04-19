const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Upload endpoint
app.post('/upload', upload.single('video'), (req, res) => {
  console.log(req.file);
  res.json({ message: 'Video uploaded successfully' });
});

// Stream endpoint
app.get('/stream/:filename', (req, res) => {
  const { filename } = req.params;
  const path = `uploads/${filename}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const path = `uploads/${filename}`;
  res.download(path);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
