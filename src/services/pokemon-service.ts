import { Pokemon } from '../entities/pokemon';
import { PokemonRepository } from '../repositories/pokemon-repository';
import { PokemonTypeRepository } from '../repositories/pokemon-type-repository';

export class PokemonService {
  private pokemonRepository: PokemonRepository;
  private pokemonTypeRepository: PokemonTypeRepository;

  constructor() {
    this.pokemonRepository = new PokemonRepository();
    this.pokemonTypeRepository = new PokemonTypeRepository();
  }

  async create(
    nome: string,
    nivel: number,
    tipo: number,
  ): Promise<Pokemon | Error> {
    const pokemonType = await this.pokemonTypeRepository.findById(tipo);
    if (!pokemonType) {
      return new Error('PokemonType not found');
    }
    const pokemon = new Pokemon(nome, nivel, pokemonType);
    await this.pokemonRepository.insert(pokemon);
    return pokemon;
  }

  async getByName(nome: string): Promise<Pokemon | undefined> {
    return this.pokemonRepository.findByName(nome);
  }

  async update(id: number, level: number): Promise<Error | void> {
    const pokemon = await this.pokemonRepository.findById(Number(id));
    if (!pokemon) {
      return new Error('Pokemon not found');
    }
    await this.pokemonRepository.updateLevel(id, level);
    return undefined;
  }

  async delete(id: number): Promise<Error | void> {
    const pokemon = await this.pokemonRepository.findById(Number(id));
    if (!pokemon) {
      return new Error('Pokemon not found');
    }
    await this.pokemonRepository.remove(id);
    return undefined;
  }

  async getAll() {
    return this.pokemonRepository.findAll();
  }
}
