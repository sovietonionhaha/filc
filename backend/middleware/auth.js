import jwt from "jsonwebtoken"

const AuthMiddleWare = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split("Bearer ")[1]
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    res.status(400).send("Expired jwt")
                }
                const { id } = decoded
                req.auth = { id }
                next()
            })
        } else {
            res.status(400).send("Invalid token")
        }
    } catch (error) {
        res.status(401).send(`Invalid or unathorized request! ${error}`)
    }
}

export default AuthMiddleWare