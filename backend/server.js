import express from "express"
import cors from "cors"

import auth from "./controllers/auth.js"
import lesson from "./controllers/lesson.js"
import school from "./controllers/school.js"
import register from "./controllers/register.js"
import absence from "./controllers/absence.js"
import grade from "./controllers/grade.js"

const app = express()
const port = 5000

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())

app.use("/auth", auth)
app.use("/lesson", lesson)
app.use("/school", school)
app.use("/register", register)
app.use("/absence", absence)
app.use("/grade", grade)

app.listen(port, () => {
    console.log("Backend listening on port: " + port)
})

