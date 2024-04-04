import express from "express"
import { PrismaClient } from "@prisma/client"
import Auth from "../middleware/auth.js"
import Teacher from "../middleware/teacher.js"

const prisma = new PrismaClient()

const router = express.Router()

router.post("/getTeacherClasses", Auth, Teacher, async (req, res) => {
    const { tanarId } = req.body

    const classes = await prisma.osztaly.findMany({
        where: {
            orak: {
                some: {
                    oktatas: {
                        tanar: {
                            id: Number(tanarId)
                        }
                    }
                }
            }
        },
        include: {
            diakok: {
                include: {
                    jegyek: {
                        include: {
                            oktatas: true
                        }
                    },
                    felhasznalo: true
                }
            },
            orak: {
                include: {
                    oktatas: {
                        include: {
                            tanar: {
                                include: {
                                    felhasznalo: true
                                }
                            },
                            tantargy: true
                        }
                    }
                }
            }
        }
    })
    
    res.status(200).json(classes)
})

router.post("/getGrades", Auth, async (req, res) => {
    const { diakId } = req.body

    const grades = await prisma.jegy.findMany({
        where: {
            diakId: Number(diakId)
        },
        include: {
            oktatas: {
                include: {
                    tantargy: true
                }
            }
        }
    })
    
    const subjects = await prisma.orarend.findMany({
        where: {
            osztaly: {
                diakok: {
                    some: {
                        id: Number(diakId)
                    }               
                }
            }
        },
        include: {
            oktatas: {
                include: {
                    tantargy: true
                }
            }
        }
    })
    
    res.status(200).json({ grades, subjects })
})

router.post("/registerGrades", Auth, Teacher, async (req, res) => {
    const { suly, datum, osztalyzat, oktatasId, tema } = req.body

    const grades = await prisma.$transaction(
        osztalyzat.map(item => 
            prisma.jegy.create({
                data: {
                    datum: datum,
                    osztalyzat: String(item.osztalyzat),
                    diak: {
                        connect: {
                            id: Number(item.diak.id)
                        }
                    },
                    oktatas: {
                        connect: {
                            id: Number(oktatasId)
                        }
                    },
                    suly: Number(suly) || 100,
                    tema: tema
                }
            }))
    )
    
    res.status(200).send("Sikeres értékelés")
})

export default router