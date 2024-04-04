import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const AdminMiddleware = async (req, res, next) => {
    const { id } = req.auth

    const user = await prisma.felhasznalo.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            admin: true
        }
    })

    if (user?.admin) {
        next()
    }else {
        res.status(400).send("Not enough privilige")
    }
    
}

export default AdminMiddleware