import express from "express"
import { PrismaClient } from "@prisma/client"
import Auth from "../middleware/auth.js"
import Admin from "../middleware/admin.js"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const router = express.Router()

router.post("/registerStudent", Auth, Admin, async (req, res) => {
    const { teljesnev, szuletesiDatum, telefonszam, omAzonosito, osztaly, iskola } = req.body

    const hashed = await bcrypt.hash(szuletesiDatum, 10)

    const user = await prisma.felhasznalo.create({
        data: {
            teljesNev: teljesnev,
            szuletesiDatum: szuletesiDatum,
            jelszo: hashed,
            telefonszam: telefonszam,
            iskola: {
                connect: {
                    nev: iskola
                }
            },
            diak: {
                create: {
                    omAzonosito: omAzonosito,
                    osztaly: {
                        connect: {
                            azonosito: osztaly
                        }
                    }
                }
            }
        }
    })

    res.status(200).send("Sikeres diák regisztráció")
})

router.post("/registerTeacher", Auth, Admin, async (req, res) => {
    const { teljesnev, szuletesiDatum, jelszo, telefonszam, felhasznalonev, oktatas, iskola } = req.body

    const hashed = await bcrypt.hash(jelszo, 10)

    const user = await prisma.felhasznalo.create({
        data: {
            teljesNev: teljesnev,
            szuletesiDatum: szuletesiDatum,
            jelszo: hashed,
            telefonszam: telefonszam,
            iskola: {
                connect: {
                    nev: iskola
                }
            },
            tanar: {
                create: {
                    felhasznalonev: felhasznalonev
                }
            }
        },
        include: {
            tanar: true
        }
    })

    const oktatasok = await prisma.oktatas.createMany({
        data: oktatas.map(item => {
            return {
                tanarId: user.tanar.id,
                tantargyId: item._id
            }
        }),
    })

    res.status(200).send("Sikeres tanár regisztráció")
})

router.post("/registerUser", Auth, Admin, async (req, res) => {
    const { teljesnev, szuletesiDatum, jelszo, telefonszam, iskola } = req.body

    const hashed = await bcrypt.hash(jelszo, 10)

    const user = await prisma.felhasznalo.create({
        data: {
            teljesNev: teljesnev,
            szuletesiDatum: szuletesiDatum,
            jelszo: hashed,
            telefonszam: telefonszam,
            iskola: {
                connect: {
                    nev: iskola
                }
            }
        }
    })

    res.status(200).send("Sikeres felhasználó regisztráció")
})

router.post("/registerClass", Auth, Admin, async (req, res) => {
    const { azonosito, osztalyfonok, iskola } = req.body
    if (osztalyfonok !== "Nincs") {
        const _class = await prisma.osztaly.create({
            data: {
                azonosito: azonosito,
                tanar: {
                    connect: {
                        id: Number(osztalyfonok)
                    }
                },
                iskola: {
                    connect: {
                        nev: iskola
                    }
                }
            }
        })
    } else {
        const _class = await prisma.osztaly.create({
            data: {
                azonosito: azonosito,
                iskola: {
                    connect: {
                        nev: iskola
                    }
                }
            }
        })
    }

    res.status(200).send("Sikeres osztály regisztráció")
})

router.post("/registerSubject", Auth, Admin, async (req, res) => {
    const { nev, iskola } = req.body

    const subject = await prisma.tantargy.create({
        data: {
            nev: nev,
            iskola: {
                connect: {
                    nev: iskola
                }
            }
        }
    })

    res.status(200).send("Sikeres tantárgy regisztráció")
})

router.post("/updateSubject", Auth, Admin, async (req, res) => {
    const { id, nev } = req.body

    const subject = await prisma.tantargy.update({
        where: {
            id: Number(id)
        },
        data: {
            nev: nev
        }
    })

    res.status(200).send("Sikeres módosítás")
})

router.post("/updateTeacher", Auth, Admin, async (req, res) => {
    const { id, felhasznalonev } = req.body

    const subject = await prisma.tanar.update({
        where: {
            id: Number(id)
        },
        data: {
            felhasznalonev: felhasznalonev
        }
    })

    res.status(200).send("Sikeres módosítás")
})

router.post("/registerHour", Auth, Admin, async (req, res) => {
    const { kezdes, vege, ora, iskola } = req.body

    const hour = await prisma.ora.create({
        data: {
            kezdete: kezdes,
            vege: vege,
            ora: ora,
            iskola: {
                connect: {
                    nev: iskola
                }
            }
        }
    })

    res.status(200).send("Sikeres hozzáadás")
})

router.post("/registerLesson", Auth, Admin, async (req, res) => {
    const { nap, oktatas, osztaly, ora, iskola } = req.body

    const lesson = await prisma.orarend.create({
        data: {
            nap: Number(nap),
            ora: {
                connect: {
                    id: Number(ora)
                }
            },
            oktatas: {
                connect: {
                    id: Number(oktatas)
                }
            },
            osztaly: {
                connect: {
                    azonosito: osztaly
                }
            },
            iskola: {
                connect: {
                    nev: iskola
                }
            }
        }
    })

    res.status(200).send("Sikeres hozzáadás")
})

router.post("/deleteLesson", Auth, Admin, async (req, res) => {
    const { lessonId } = req.body

    const lesson = await prisma.orarend.update({
        where: {
            id: Number(lessonId)
        },
        data: {
            torolt: true
        }
    })
    
    res.status(200).send("Sikeres törlés")
})

export default router