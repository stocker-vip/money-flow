import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const findMany = async () => {
    const info = await prisma.stockTick.findMany()
    console.log(info)
}

const deleteMany = async () => {
    const info = await prisma.stockTick.deleteMany()
    console.log(info)
}

async function main() {
    await findMany()
    // await deleteMany()
    // await findMany()
}


main()
.then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })