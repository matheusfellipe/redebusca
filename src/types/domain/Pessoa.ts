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



