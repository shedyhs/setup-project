import { Request, Response } from 'express';
import { Pokemon } from '../entities/pokemon';
import { PokemonRepository } from '../repositories/pokemon-repository';

export class PokemonController {
  private pokemonRepository: PokemonRepository;

  constructor() {
    this.pokemonRepository = new PokemonRepository();
  }

  async createPokemon(req: Request, res: Response) {
    const { nome, nivel, tipo } = req.body;
    const pokemon = new Pokemon(nome, nivel, tipo);
    await this.pokemonRepository.insert(pokemon);
    res.status(201).json({
      id: pokemon.id,
      nome: pokemon.nome,
      nivel: pokemon.nivel,
      tipo: pokemon.tipo,
    });
  }

  async getPokemonByName(req: Request, res: Response) {
    const { nome } = req.params;
    const pokemon = await this.pokemonRepository.findByName(nome);
    if (!pokemon) {
      return res.status(404).json({
        mensagem: 'Pokemon não encontrado',
      });
    }
    return res.status(200).json({
      id: pokemon.id,
      nome: pokemon.nome,
      nivel: pokemon.nivel,
      tipo: pokemon.tipo,
    });
  }

  async updatePokemon(req: Request, res: Response) {
    const { id } = req.params;
    const { nivel } = req.body;
    const pokemon = await this.pokemonRepository.findById(Number(id));
    if (!pokemon) {
      return res.status(404).json({
        mensagem: 'Pokemon não encontrado',
      });
    }
    await this.pokemonRepository.updateLevel(Number(id), nivel);
    return res.status(204).send();
  }

  async deletePokemon(req: Request, res: Response) {
    const { id } = req.params;
    const pokemon = await this.pokemonRepository.findById(Number(id));
    if (!pokemon) {
      return res.status(404).json({
        mensagem: 'Pokemon não encontrado',
      });
    }
    await this.pokemonRepository.remove(Number(id));
    return res.status(204).send();
  }

  async getAll(req: Request, res: Response) {
    const pokemons = await this.pokemonRepository.findAll();
    return res.status(200).json(pokemons);
  }
}
