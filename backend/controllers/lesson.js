import express from "express"
import Auth from "../middleware/auth.js"
import Admin from "../middleware/admin.js"
import Teacher from "../middleware/teacher.js"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

router.post("/getLessons", Auth, async (req, res) => {
    const { osztalyId, iskolaId, tanarId } = req.body

    const timetables = await prisma.orarend.findMany({
        where: {
            iskolaId: Number(iskolaId),
            torolt: false
        },
        include: {
            iskola: true,
            oktatas: {
                include: {
                    tantargy: true,
                    tanar: {
                        include: {
                            felhasznalo: true,
                            osztaly: true
                        },
                    }
                }
            },
            ora: true,
            osztaly: {
                include: {
                    diakok: {
                        include: {
                            felhasznalo: true
                        }
                    }
                }
            }
        }
    })

    const studentTimetable = osztalyId && await prisma.orarend.findMany({
        where: {
            osztalyId: Number(osztalyId),
            iskolaId: Number(iskolaId),
            torolt: false
        },
        orderBy: {
            nap: "asc"
        },
        include: {
            iskola: true,
            oktatas: {
                include: {
                    tantargy: true,
                    tanar: {
                        include: {
                            felhasznalo: true,
                            osztaly: true
                        },
                    }
                }
            },
            ora: true,
            osztaly: {
                include: {
                    diakok: {
                        include: {
                            felhasznalo: true
                        }
                    }
                }
            }
        }
    })
    const hours = await prisma.ora.findMany({
        where: {
            iskolaId: iskolaId
        },
        orderBy: {
            ora: "asc"
        },
        include: {
            iskola: true
        }
    })
    const teacherTimetable = tanarId && await prisma.orarend.findMany({
        where: {
            iskolaId: Number(iskolaId),
            oktatas: {
                tanarId: Number(tanarId)
            },
            torolt: false
        },
        include: {
            iskola: true,
            oktatas: {
                include: {
                    tantargy: true,
                    tanar: {
                        include: {
                            felhasznalo: true,
                            osztaly: true
                        }
                    }
                }
            },
            osztaly: {
                include: {
                    diakok: {
                        include: {
                            felhasznalo: true
                        }
                    }
                }
            },
            ora: true
        },
        orderBy: {
            nap: "asc"
        }

    })
    const lessons = await prisma.tanora.findMany({
        where: {
            orarend: {
                iskolaId: Number(iskolaId),
                oktatas: {
                    tanarId: tanarId
                }
            }
        },
        include: {
            orarend: true,
            hianyzasok: {
                include: {
                    diak: true
                }
            }
        }
    })

    res.status(200).json({
        studentTimetable,
        teacherTimetable,
        hours,
        lessons,
        timetables
    })
})

router.post("/updateLesson", Auth, Teacher, async (req, res) => {
    const { lesson, hianyzasok, tema, record } = req.body

    const _delete = await prisma.tanora.update({
        where: {
            id: Number(record.id)
        },
        data: {
            hianyzasok: {
                deleteMany: {}
            }
        }
    })

    const _lesson = await prisma.tanora.update({
        where: {
            id: Number(record.id)
        },
        data: {
            tema: tema,
            hianyzasok: {
                createMany: {
                    data: hianyzasok.filter(hianyzas => hianyzas.isMissing == true).map(hianyzas => {
                        return { diakId: hianyzas.diak.id, tipus: 0 }
                    })
                }
            }
        }
    })

    res.status(200).send("Sikeres módosítás")
})

router.post("/registerLesson", Auth, Teacher, async (req, res) => {
    const { lesson, hianyzasok, tema } = req.body

    const _lesson = await prisma.tanora.create({
        data: {
            orarendId: lesson.id,
            tema: tema,
            hianyzasok: {
                createMany: {
                    data: hianyzasok.filter(hianyzas => hianyzas.isMissing == true).map(hianyzas => {
                        return { diakId: hianyzas.diak.id, tipus: 0 }
                    })
                }
            }
        }
    })

    res.status(200).send("Sikeres lekönyvelés")
})

export default router