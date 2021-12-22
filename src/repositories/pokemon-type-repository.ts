import { PrismaClient } from '@prisma/client';
import { PokemonType } from '../entities/pokemon-type';

export class PokemonTypeRepository {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: number): Promise<PokemonType | undefined> {
    const result = await this.prisma.type.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      return undefined;
    }
    return new PokemonType(result.id, result.name);
  }
}
