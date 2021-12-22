import { PokemonType } from './pokemon-type';

export class Pokemon {
  public id: number;
  public nome: string;
  public nivel: number;
  public tipo: PokemonType;

  constructor(nome: string, nivel: number, tipo: PokemonType, id?: number) {
    this.id = id ?? Math.floor(Math.random() * 1000);
    this.nome = nome;
    this.nivel = nivel;
    this.tipo = tipo;
  }
}
