import express from "express"
import { PrismaClient } from "@prisma/client"
import Auth from "../middleware/auth.js"
import Admin from "../middleware/admin.js"

const prisma = new PrismaClient()

const router = express.Router()

router.post("/getAbsence", Auth, async (req, res) => {
    const { osztalyId } = req.body

    const absences = await prisma.hianyzas.findMany({
        where: {
            diak: {
                osztalyId: Number(osztalyId)
            }
        },
        include: {
            diak: {
                include: {
                    felhasznalo: true
                }
            },
            tanora: {
                include: {
                    orarend: {
                        include: {
                            oktatas: {
                                include: {
                                    tantargy: true
                                }
                            },
                            ora: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    res.status(200).json(absences)
})

router.post("/getStudentAbsence", Auth, async (req, res) => {
    const { diakId } = req.body

    const absences = await prisma.hianyzas.findMany({
        where: {
            diak: {
                id: Number(diakId)
            }
        },
        include: {
            diak: {
                include: {
                    felhasznalo: true
                }
            },
            tanora: {
                include: {
                    orarend: {
                        include: {
                            oktatas: {
                                include: {
                                    tantargy: true
                                }
                            },
                            ora: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    res.status(200).json(absences)
})

router.post("/updateAbsence", Auth, async (req, res) => {
    const { data } = req.body

    const absences = await prisma.$transaction(
        data.map((item) => 
            prisma.hianyzas.update({
                where: {
                    id: Number(item.id)
                },
                data: {
                    tipus: Number(item.tipus)
                }
            })    
        )
    )

    res.status(200).send("Sikeres módosítás")
})

export default router