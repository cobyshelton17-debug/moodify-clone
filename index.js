import http from "hhtp";
import getSongsByMood from "./moodMusic.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.url.startsWith("/api/music")) {
        const mood = new URL(req.url, "http://localhost").searchParams.get("mood");
        const songs = await getSongsByMood(mood);

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(songs));
    }

    res.writeHead(404);
    res.end("Not Found");
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


