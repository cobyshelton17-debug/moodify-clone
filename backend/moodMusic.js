import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

async function getAccessToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
     headers: {
      "Authorization": "Basic " + 
      Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
      ).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
    },
  }
);
  return response.data.access_token;
}

function moodToGenre(mood) {
    const genres = {
        "happy": "pop",
        "sad": "acoustic",
        "angry": "rock",
        "relaxed": "chill",
        "energetic": "workout",
        "romantic": "love",
        "focussed": "study"
    };
    return genres[mood.toLowerCase()] || "pop"; // Default to pop if mood is not found
}

export default async function getSongsByMood(mood) {
    const token = await getAccessToken();
    const genre = moodToGenre(mood);
    

    const response = await axios.get(
        `https://api.spotify.com/v1/search?q=genre:${genre}&type=track&limit=5`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    )

    return response.data.tracks.items.map((track) => ({
        name: track.name,
        artist: track.artists[0].name,
        url: track.external_urls.spotify
    }));
}
