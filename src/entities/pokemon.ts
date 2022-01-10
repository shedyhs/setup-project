import { randomUUID } from 'crypto';
import { PokemonType } from './pokemon-type';

export class Pokemon {
  public id: string;
  public nome: string;
  public nivel: number;
  public tipo: PokemonType;

  constructor(nome: string, nivel: number, tipo: PokemonType, id?: string) {
    this.id = id ?? randomUUID();
    this.nome = nome;
    this.nivel = nivel;
    this.tipo = tipo;
  }
}
