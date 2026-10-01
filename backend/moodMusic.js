import axios from "axios"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.join(__dirname, ".env") })

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  throw new Error(
    "Missing Spotify credentials. Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to backend/.env"
  )
}

async function getAccessToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
     headers: {
      "Authorization": "Basic " + 
      Buffer.from(
        SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
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
        "relaxed": "ambient",
        "energetic": "dance",
        "romantic": "r-and-b",
        "focussed": "jazz"
    };
    return genres[mood?.toLowerCase()] || "pop"; // Default to pop if mood is not found
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
