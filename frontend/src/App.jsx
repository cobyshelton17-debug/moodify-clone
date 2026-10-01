import { useState } from "react";

export default function App() {
  const [mood, setMood] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleGetSongs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/music?mood=${mood}`);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  return (
    <div className="App">
      <h1>Mood Music</h1>
      <div>
        <label htmlFor="mood">Select your mood:</label>
        <select id="mood" value={mood} onChange={handleMoodChange}>
          <option value="">-- Choose a mood --</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="relaxed">Relaxed</option>
          <option value="energetic">Energetic</option>
          <option value="romantic">Romantic</option>
          <option value="focussed">Focussed</option>
        </select>
      </div>
      <button onClick={handleGetSongs}>Get Songs</button>
      <div>
        {songs.map((song, index) => (
          <div key={index}>
            <h3>{song.name}</h3>
            <p>Artist: {song.artist}</p>
            <a href={song.url} target="_blank" rel="noopener noreferrer">
              Listen on Spotify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
