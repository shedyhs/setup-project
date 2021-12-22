import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function seed() {
  await client.type.createMany({
    data: [
      {
        id: 1,
        name: 'Fogo',
      },
      {
        id: 2,
        name: 'Agua',
      },
      {
        id: 3,
        name: 'Normal',
      },
    ],
  });
}

seed();
