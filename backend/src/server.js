import "dotenv/config";
import connectDB from "./db/index.db.js"
import { app } from "./app.js"

const port = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERROR: Server unable to connect with server.", error);
    })

    app.listen(port, () => {
        console.log(`Server listening at : http://localhost:${port}`);
    })
})
.catch((error) => {
    console.log("ERROR: DB connection failed.", error);
})