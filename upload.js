const { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

//Configuration
const s3 = new S3Client({
  credentials: {
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY_ID',
  },
  region: 'ap-south-1',
  s3ForcePathStyle: true,
});

const upload = multer({ dest: 'uploads/' });
const bucketName = 'BUCKET_NAME';

// Function to upload file to S3
const uploadFile = async (req, res) => {
  const { file } = req;
  const fileName = `path/to/your/${file.originalname}`;
  const fileContent = fs.readFileSync(file.path);
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  };
  try {
    await s3.send(new PutObjectCommand(params));
    console.log('File uploaded successfully.');
    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file to S3' });
  }
};

// Function to list files in S3 bucket
const listFiles = async (req, res) => {
  try {
    const data = await s3.send(new ListObjectsCommand({ Bucket: bucketName }));
    const fileNames = data.Contents.map((file) => file.Key);
    res.json({ files: fileNames });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Error listing files' });
  }
};

// Function to download file from S3
const downloadFile = async (req, res) => {
  const { fileName } = req.params;
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };
  try {
    const data = await s3.send(new GetObjectCommand(params));
    const downloadPath = path.join(__dirname, 'downloads', fileName);
    const fileStream = fs.createWriteStream(downloadPath);
    data.Body.pipe(fileStream);
    fileStream.on('finish', () => {
      res.download(downloadPath, fileName, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).json({ error: 'Error downloading file' });
        }
        fs.unlinkSync(downloadPath); 
      });
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Error downloading file from S3' });
  }
};

module.exports = { upload, uploadFile, listFiles, downloadFile };
