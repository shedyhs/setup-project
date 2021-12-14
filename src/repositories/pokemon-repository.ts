import { Pokemon } from '../entities/pokemon';

export class PokemonRepository {
  private pokemons: Pokemon[];

  constructor() {
    this.pokemons = [];
  }

  insert(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }
}
