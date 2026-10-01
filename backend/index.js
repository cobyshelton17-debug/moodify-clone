import http from "http";
import getSongsByMood from "./moodMusic.js";

const PORT = 3001;

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.url.startsWith("/api/music")) {
        const mood = new URL(req.url, "http://127.0.0.1").searchParams.get("mood");

        try {
            const songs = await getSongsByMood(mood);

            res.writeHead(200, {"Content-Type": "application/json"});
            return res.end(JSON.stringify(songs));
        } catch (err) {
            console.error(`[GET ${req.url}] ${err.message}`);

            res.writeHead(500, {"Content-Type": "application/json"});
            return res.end(JSON.stringify({ error: "Failed to fetch songs", detail: err.message }));
        }
    }

    res.writeHead(404);
    res.end("Not Found");
});

server.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});


