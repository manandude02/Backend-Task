# Backend-Task
1. Clone this repository in your own desktop
2. In the terminal type "npm install express multer fs"
3. Run node index.js
4. Test the API endpoints using a tool like Postman or cURL. Here are some example requests:

To upload a video, send a POST request to http://localhost:3000/upload with the video file attached to the video field.

To stream a video, send a GET request to http://localhost:3000/stream/<filename>, where <filename> is the name of the video file you want to stream.

To download a video, send a GET request to http://localhost:3000/download/<filename>, where <filename> is the name of the video file you want to download.
