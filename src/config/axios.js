import axios from "axios";

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
      part: "snippet",
      maxResults: 20,
<<<<<<< HEAD
      key: // Replace with your API key
=======
      key: "AIzaSyDABToFV3rpOZFbJ5TZ6aMD5ABbwEJ6WPE", // Replace with your API key
>>>>>>> 3c3d224 (feat/home iframe 구현)
    },
  });

