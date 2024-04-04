import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const TeacherMiddleware = async (req, res, next) => {
    const { id } = req.auth

    const user = await prisma.felhasznalo.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            admin: true,
            tanar: true
        }
    })

    if (user?.admin || user?.tanar) {
        next()
    }else {
        res.status(400).send("Not enough privilige")
    }
    
}

export default TeacherMiddleware