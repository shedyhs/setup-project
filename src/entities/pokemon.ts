export class Pokemon {
  public id: string;
  public nome: string;
  public nivel: number;
  public tipo: string;

  constructor(nome: string, nivel: number, tipo: string) {
    this.id = Math.random().toString();
    this.nome = nome;
    this.nivel = nivel;
    this.tipo = tipo;
  }
}
