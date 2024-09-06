This project is an Express.js application that allows users to upload, list, and download files using AWS S3. The application is designed with separation of concerns in mind, and it uses multer for handling file uploads and AWS SDK v3 for interacting with S3.

1)File Upload: Files can be uploaded to a specific path within an AWS S3 bucket using a POST request to the /upload route. The server handles file uploads using multer and stores them temporarily before uploading them to S3.

2)List Files: The /files route allows you to fetch and list all the files stored in a specified S3 bucket. This provides a quick overview of the available files.

3)File Download: Files stored in the S3 bucket can be downloaded using the /download/:fileName route. The file is temporarily stored on the server for download and cleaned up after the download is complete.
