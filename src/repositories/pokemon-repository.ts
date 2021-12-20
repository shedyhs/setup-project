import { PrismaClient } from '@prisma/client';
import { Pokemon } from '../entities/pokemon';

export class PokemonRepository {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async insert(pokemon: Pokemon): Promise<void> {
    await this.prisma.pokemon.create({
      data: {
        id: pokemon.id,
        name: pokemon.nome,
        level: pokemon.nivel,
        type: pokemon.tipo,
      },
    });
  }

  async findByName(name: string): Promise<Pokemon | undefined> {
    const result = await this.prisma.pokemon.findFirst({
      where: {
        name,
      },
    });
    if (!result) {
      return undefined;
    }
    return new Pokemon(result.name, result.level, result.type, result.id);
  }

  async findById(id: number) {
    const result = await this.prisma.pokemon.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      return undefined;
    }
    return new Pokemon(result.name, result.level, result.type, result.id);
  }

  async updateLevel(id: number, level: number) {
    await this.prisma.pokemon.update({
      data: {
        level,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.pokemon.delete({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.prisma.pokemon.findMany();
  }
}
