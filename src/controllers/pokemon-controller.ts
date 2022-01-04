import { Request, Response } from 'express';
import { PokemonService } from '../services/pokemon-service';

export class PokemonController {
  private pokemonService: PokemonService;

  constructor() {
    this.pokemonService = new PokemonService();
  }

  async createPokemon(req: Request, res: Response) {
    const { nome, nivel, tipo } = req.body;
    const pokemon = await this.pokemonService.create(nome, nivel, tipo);
    if (pokemon instanceof Error) {
      return res.status(404).json({
        mensagem: pokemon.message,
      });
    }
    return res.status(201).json({
      id: pokemon.id,
      nome: pokemon.nome,
      nivel: pokemon.nivel,
      tipo: pokemon.tipo,
    });
  }

  async getPokemonByName(req: Request, res: Response) {
    const { nome } = req.params;
    const pokemon = await this.pokemonService.getByName(nome);
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
    const pokemon = await this.pokemonService.update(Number(id), nivel);
    if (pokemon instanceof Error) {
      return res.status(404).json({
        mensagem: pokemon.message,
      });
    }
    return res.status(204).send();
  }

  async deletePokemon(req: Request, res: Response) {
    const { id } = req.params;
    const pokemon = await this.pokemonService.delete(Number(id));
    if (pokemon instanceof Error) {
      return res.status(404).json({
        mensagem: pokemon.message,
      });
    }
    return res.status(204).send();
  }

  async getAll(req: Request, res: Response) {
    const pokemon = await this.pokemonService.getAll();
    return res.status(200).json(pokemon);
  }
}
