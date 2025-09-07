import { UltimaOcorrencia } from "./Ocorrencia";

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: Sexo;
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
}

export enum Sexo {
  Masculino = "MASCULINO",
  Feminino = "FEMININO"
}

export enum Status {
  Encontrado = "ENCONTRADO",
  Desaparecido = "DESAPARECIDO"
}



export interface PessoaFiltroValues {
  status: Status|null;
  sexo: Sexo|null;
  faixaIdadeInicial: number;
  faixaIdadeFinal: number;
  nome: string;
}