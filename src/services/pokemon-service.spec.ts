import { Pokemon } from '../entities/pokemon';
import { PokemonService } from './pokemon-service';

describe('PokemonService', () => {
  let sut: PokemonService;

  beforeEach(() => {
    sut = new PokemonService();
  });

  it('should create pokemon', async () => {
    const pokemon = await sut.create('Pikachu', 10, 1);
    expect(pokemon).toBeInstanceOf(Pokemon);
    expect(pokemon).toHaveProperty('nome', 'Pikachu');
  });

  it('should not create pokemon if not found pokemon type', async () => {
    const error = await sut.create('Pikachu', 10, 999);
    expect(error).toBeInstanceOf(Error);
  });

  it('should get pokemon by name', async () => {
    const pokemon = await sut.getByName('Pikachu');
    expect(pokemon).toBeInstanceOf(Pokemon);
    expect(pokemon).toHaveProperty('nivel');
  });

  it('should return undefined if not found a pokemon by name', async () => {
    const pokemon = await sut.getByName('aaa');
    expect(pokemon).toBeUndefined();
  });
});
