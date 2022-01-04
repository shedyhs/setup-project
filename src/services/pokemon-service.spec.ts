import { Pokemon } from '../entities/pokemon';
import { PokemonService } from './pokemon-service';

describe('PokemonService', () => {
  it('should create pokemon', async () => {
    const pokemonService = new PokemonService();
    const pokemon = await pokemonService.create('Pikachu', 10, 1);
    expect(pokemon).toBeInstanceOf(Pokemon);
    expect(pokemon).toHaveProperty('nome', 'Pikachu');
  });

  it('should not create pokemon if not found pokemon type', async () => {
    const pokemonService = new PokemonService();
    const error = await pokemonService.create('Pikachu', 10, 999);
    expect(error).toBeInstanceOf(Error);
  });

  it('should get pokemon by name', async () => {
    const pokemonService = new PokemonService();
    const pokemon = await pokemonService.getByName('Pikachu');
    expect(pokemon).toBeInstanceOf(Pokemon);
    expect(pokemon).toHaveProperty('nivel');
  });

  it('should return undefined if not found a pokemon by name', async () => {
    const pokemonService = new PokemonService();
    const pokemon = await pokemonService.getByName('aaa');
    expect(pokemon).toBeUndefined();
  });
});
