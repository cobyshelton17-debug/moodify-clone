import { useState } from "react";

export default function App() {
  const [mood, setMood] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleGetSongs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/music?mood=${mood}`);
      const data = await response.json();
      if (!Array.isArray(data)) {
        setError(data.detail || data.error || "Something went wrong");
        setSongs([]);
        return;
      }
      setSongs(data);
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
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
      <button onClick={handleGetSongs} disabled={loading}>
        {loading ? "Loading..." : "Get Songs"}
      </button>

      {error && <p className="status error">{error}</p>}

      <div className="songs">
        {songs.map((song, index) => (
          <div className="song" key={index}>
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
