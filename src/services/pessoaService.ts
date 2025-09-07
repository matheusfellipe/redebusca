import { PaginationResponse } from "@/types/infra/Paginacao";
import api from "./api";
import { Pessoa, Sexo, Status } from "@/types/domain/Pessoa";


interface PessoaFiltroRequest {
  status?: Status;
  sexo?: Sexo;
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  pagina?: number;
  porPagina?: number;
}

export const personService = {
  async list({
    status,
    nome,
    faixaIdadeInicial = 0,
    faixaIdadeFinal = 0,
    pagina = 0,
    porPagina = 10,
  }: PessoaFiltroRequest) {
    const { data } = await api.get<PaginationResponse<Pessoa>>(
      "/pessoas/aberto/filtro",
      {
        params: {
          status,
          nome,
          faixaIdadeInicial,
          faixaIdadeFinal,
          pagina,
          porPagina,
        },
      }
    );

    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<Pessoa>(`/pessoas/${id}`);
    return data;
  },
};
