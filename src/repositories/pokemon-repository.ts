import { Pokemon } from '../entities/pokemon';

export class PokemonRepository {
  private pokemons: Pokemon[];

  constructor() {
    this.pokemons = [];
  }

  insert(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }

  findByName(name: string): Pokemon | undefined {
    return this.pokemons.find((p) => p.nome === name);
  }

  updateLevel(name: string, level: number) {
    const pokemon = this.findByName(name) as Pokemon;
    this.pokemons = this.pokemons.filter((p) => p.nome !== name);
    pokemon.nivel = level;
    this.pokemons.push(pokemon);
  }

  remove(name: string) {
    this.pokemons = this.pokemons.filter((p) => p.nome !== name);
  }

  findAll() {
    return this.pokemons;
  }
}
