import express from "express"
import Auth from "../middleware/auth.js"
import { PrismaClient } from "@prisma/client"

const router = express.Router()

const prisma = new PrismaClient()

router.post("/get", Auth, async (req, res) => {
    const { iskolaId } = req.body

    const students = await prisma.felhasznalo.findMany({
        where: {
            iskolaId: Number(iskolaId),
            diak: {isNot: null}
        },
        include: {
            diak: {
                include: {
                    osztaly: true
                }
            },
            iskola: true
        }
    })

    const teachers = await prisma.felhasznalo.findMany({
        where: {
            iskolaId: Number(iskolaId),
            tanar: {isNot: null}
        },
        include: {
            tanar: {
                include: {
                    osztaly: true,
                    oktatasok: {
                        include: {
                            tantargy: true
                        }
                    }
                }
            },
            iskola: true,
            admin: true
        }
    })
    const school = await prisma.iskola.findFirst({
        where: {
            id: Number(iskolaId)
        }
    })
    const users = await prisma.felhasznalo.findMany({
        where: {
            iskolaId: Number(iskolaId)
        },
        include: {
            admin: true,
            diak: true,
            iskola: true,
            tanar: true
        }
    })

    const classes = await prisma.osztaly.findMany({
        where: {
            iskolaId: Number(iskolaId)
        },
        include: {
            tanar: {
                include: {
                    felhasznalo: true
                }
            }
        }
    })

    const subjects = await prisma.tantargy.findMany({
        where: {
            iskolaId: Number(iskolaId)
        }
    })

    const heads = await prisma.tanar.findMany({
        where: {
            osztaly: null
        },
        include: {
            felhasznalo: true,
            osztaly: true
        }
    })

    const edus = await prisma.oktatas.findMany({
        where: {
            tantargy: {
                iskolaId: Number(iskolaId)
            }
        },
        include: {
            tanar: {
                include: {
                    felhasznalo: true
                }
            },
            tantargy: true
        }
    })

    res.status(200).json({
        students,
        teachers,
        school,
        users,
        classes,
        subjects,
        heads,
        edus
    })
})


export default router