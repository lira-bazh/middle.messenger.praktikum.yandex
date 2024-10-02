// eslint-disable-next-line @typescript-eslint/no-require-imports
const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.static("./dist"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./dist/index.html"));

	res.status(200);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
