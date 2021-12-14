import { Request, Response } from 'express';
import { Pokemon } from '../entities/pokemon';
import { PokemonRepository } from '../repositories/pokemon-repository';

export class PokemonController {
  private pokemonRepository: PokemonRepository;

  constructor() {
    this.pokemonRepository = new PokemonRepository();
  }

  createPokemon(req: Request, res: Response) {
    const { nome, nivel, tipo } = req.body;
    const pokemon = new Pokemon(nome, nivel, tipo);
    this.pokemonRepository.insert(pokemon);
    res.status(201).json({
      id: pokemon.id,
      nome: pokemon.nome,
      nivel: pokemon.nivel,
      tipo: pokemon.tipo,
    });
  }

  getPokemonByName(req: Request, res: Response) {
    const { nome } = req.params;
    const pokemon = this.pokemonRepository.findByName(nome);
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

  updatePokemon(req: Request, res: Response) {
    const { nome } = req.params;
    const { nivel } = req.body;
    const pokemon = this.pokemonRepository.findByName(nome);
    if (!pokemon) {
      return res.status(404).json({
        mensagem: 'Pokemon não encontrado',
      });
    }
    this.pokemonRepository.updateLevel(nome, nivel);
    return res.status(204).send();
  }

  deletePokemon(req: Request, res: Response) {
    const { nome } = req.params;
    const pokemon = this.pokemonRepository.findByName(nome);
    if (!pokemon) {
      return res.status(404).json({
        mensagem: 'Pokemon não encontrado',
      });
    }
    this.pokemonRepository.remove(nome);
    return res.status(204).send();
  }

  getAll(req: Request, res: Response) {
    const pokemons = this.pokemonRepository.findAll();
    return res.status(200).json(pokemons);
  }
}
