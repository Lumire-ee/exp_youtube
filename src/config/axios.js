import axios from "axios";

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
      part: "snippet",
      maxResults: 20,
      key: "AIzaSyDABToFV3rpOZFbJ5TZ6aMD5ABbwEJ6WPE", // Replace with your API key
    },
  });

