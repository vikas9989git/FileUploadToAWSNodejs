const express = require('express');
const cors = require('cors');
const { upload, uploadFile, listFiles, downloadFile } = require('./upload');

const app = express();
const port = 3001;
app.use(cors());

// Define routes for upload, list, and download
app.post('/upload', upload.single('file'), uploadFile);
app.get('/files', listFiles);
app.get('/download/:fileName', downloadFile);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
