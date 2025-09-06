import { PaginationResponse } from "@/types/infra/Paginacao";
import api from "./api";
import { Pessoa } from "@/types/domain/Pessoa";


interface PessoaFiltroRequest {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  pagina?: number;
  porPagina?: number;
}

export const personService = {
  async list({
    nome,
    faixaIdadeInicial = 0,
    faixaIdadeFinal = 0,
    pagina = 0,
    porPagina = 10,
  }: PessoaFiltroRequest) {
    const { data } = await api.get<PaginationResponse<Pessoa>>(
      "/v1/pessoas/aberto/filtro",
      {
        params: {
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
    const { data } = await api.get<Pessoa>(`/v1/pessoas/${id}`);
    return data;
  },
};
