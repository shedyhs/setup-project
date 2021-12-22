import { PrismaClient } from '@prisma/client';
import { Pokemon } from '../entities/pokemon';
import { PokemonType } from '../entities/pokemon-type';

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
        typeId: pokemon.tipo.id,
      },
    });
  }

  async findByName(name: string): Promise<Pokemon | undefined> {
    const result = await this.prisma.pokemon.findFirst({
      where: {
        name,
      },
      include: {
        type: true,
      },
    });
    if (!result) {
      return undefined;
    }
    return new Pokemon(
      result.name,
      result.level,
      new PokemonType(result.type.id, result.type.name),
      result.id,
    );
  }

  async findById(id: number) {
    const result = await this.prisma.pokemon.findUnique({
      where: {
        id,
      },
      include: {
        type: true,
      },
    });
    if (!result) {
      return undefined;
    }
    return new Pokemon(
      result.name,
      result.level,
      new PokemonType(result.type.id, result.type.name),
      result.id,
    );
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
    return this.prisma.pokemon.findMany({
      include: {
        type: true,
      },
    });
  }
}
