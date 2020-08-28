import app from './src/server';
const port = 8080;

app.listen(port, () => {
    console.log(`[server] Running on http://localhost:${port}`);
});