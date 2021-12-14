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
    res.json({
      id: pokemon.id,
      nome: pokemon.nome,
      nivel: pokemon.nivel,
      tipo: pokemon.tipo,
    });
  }
}
