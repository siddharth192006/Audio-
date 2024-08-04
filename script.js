// Import required libraries
const axios = require('axios');

// Set GitHub API endpoint and authentication token
const apiEndpoint = 'https://api.github.com';
const token = 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN';
const repoOwner = 'YOUR_GITHUB_USERNAME';
const repoName = 'YOUR_GITHUB_REPO_NAME';
const songFolder = 'path/to/song/folder';

// Function to get next song from GitHub song folder
async function getNextSong() {
  // Get the list of files in the song folder
  const response = await axios.get(`${apiEndpoint}/repos/${repoOwner}/${repoName}/contents/${songFolder}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Get the list of files
  const files = response.data;

  // Filter out non-audio files
  const audioFiles = files.filter((file) => file.name.endsWith('.mp3'));

  // Get the current song index (assuming it's stored somewhere)
  const currentSongIndex = 0; // Replace with your current song index logic

  // Get the next song index
  const nextSongIndex = (currentSongIndex + 1) % audioFiles.length;

  // Get the next song file
  const nextSongFile = audioFiles[nextSongIndex];

  // Return the next song file
  return nextSongFile;
}

// Example usage
getNextSong().then((nextSong) => {
  console.log(`Next song: ${nextSong.name}`);
}).catch((error) => {
  console.error(`Error getting next song: ${error.message}`);
});
