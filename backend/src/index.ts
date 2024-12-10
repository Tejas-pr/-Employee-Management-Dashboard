import express from "express";
import cors from "cors";
import router from "./routes/routes";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log("app started in port 3000");
});

app.use('/v1/', router);