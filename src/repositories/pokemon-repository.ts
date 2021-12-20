import pgp from 'pg-promise';
import { Pokemon } from '../entities/pokemon';

export class PokemonRepository {
  private pokemons: Pokemon[];
  private pgpClient;

  constructor() {
    this.pokemons = [];
    this.pgpClient = pgp()(
      'postgres://postgres:postgres@localhost:5432/postgres',
    );
  }

  async insert(pokemon: Pokemon): Promise<void> {
    await this.pgpClient.query(
      `insert into pokemon (id, name, level, type) values ($1, $2, $3, $4)`,
      [pokemon.id, pokemon.nome, pokemon.nivel, pokemon.tipo],
    );
    this.pokemons.push(pokemon);
  }

  async findByName(name: string): Promise<Pokemon | undefined> {
    const [result] = await this.pgpClient.query(
      'select * from pokemon where name = $1',
      [name],
    );
    if (!result) {
      return undefined;
    }
    return new Pokemon(result.name, result.level, result.type, result.id);
  }

  async updateLevel(name: string, level: number) {
    const pokemon = (await this.findByName(name)) as Pokemon;
    this.pokemons = this.pokemons.filter((p) => p.nome !== name);
    pokemon.nivel = level;
    this.pokemons.push(pokemon);
  }

  remove(name: string) {
    this.pokemons = this.pokemons.filter((p) => p.nome !== name);
  }

  async findAll() {
    return this.pgpClient.query('select * from pokemon');
  }
}
