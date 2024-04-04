import express from "express"
import { PrismaClient } from "@prisma/client"
import generateAccessToken from "../utils/generateAccessToken.js"
import Auth from "../middleware/auth.js"
import bcrypt from "bcrypt"

const router = express.Router()

const prisma = new PrismaClient()

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const student = await prisma.diak.findFirst({
        where: {
            omAzonosito: username
        },
        include: {
            felhasznalo: true
        }
    })

    const teacher = await prisma.tanar.findFirst({
        where: {
            felhasznalonev: username
        },
        include: {
            felhasznalo: true
        }
    })

    const user = student || teacher

    if (!user) {
        return res.status(400).send("Nem létezik ilyen felhasználó!")
    }

    const result = bcrypt.compare(password, user?.felhasznalo.jelszo)

    if (result) {
        return res.json({
            token: generateAccessToken(user.felhasznalo.id)
        }).status(200)
    }

    res.status(401).send("Nem létezik ilyen felhasználó!")
})

router.post("/getCurrentUser", Auth, async (req, res) => {
    const { id } = req.auth
    const user = await prisma.felhasznalo.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            diak: {
                include: {
                    osztaly: true
                }
            },
            tanar: {
                include: {
                    osztaly: true
                }
            },
            iskola: true,
            admin: true
        }
    })
    res.status(200).json(user)
})

export default router