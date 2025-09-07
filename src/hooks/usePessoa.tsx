import { useState, useEffect } from 'react';
import { Pessoa, PessoaFiltroValues } from '@/types/domain/Pessoa';
import { PaginationResponse } from '@/types/infra/Paginacao';
import { personService } from '@/services/pessoaService';

export function usePessoaList(filters: PessoaFiltroValues, page: number) {
  const [personData, setPersonData] = useState<PaginationResponse<Pessoa>>({} as PaginationResponse<Pessoa>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await personService.list({
          ...filters,
          pagina: page,
          status: filters.status ?? undefined,
          sexo: filters.sexo ?? undefined,
        });
        setPersonData(response || { content: [], totalElements: 0, pageable: { pageNumber: 0 } });
      } catch (err) {
        console.error('Failed to fetch persons:', err);
        setError('Erro ao carregar casos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, page]);

  return { personData, loading, error };
}

export function usePessoa(id: number) {
  const [personData, setPersonData] = useState<Pessoa>({} as Pessoa);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await personService.getById(id);
        setPersonData(response || ({} as Pessoa));
      } catch (err) {
        setError("Erro ao carregar caso.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { personData, loading, error };
}