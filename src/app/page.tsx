'use client';

import { useState, useEffect } from 'react';

import { personService } from "@/services/pessoaService";
import { Pessoa, PessoaFiltroValues, Sexo } from "@/types/domain/Pessoa";
import PersonCard from '@/components/domain/PessoaCard';
import { useRouter } from 'next/navigation';

import { PaginationResponse } from '@/types/infra/Paginacao';
import PessoaFiltro from '@/components/domain/PessoaFiltro';
import { Flex, Pagination } from '@mantine/core';

export default function Home() {
  
  const [personData, setPersonData] = useState<PaginationResponse<Pessoa>>({} as PaginationResponse<Pessoa>);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PessoaFiltroValues>({} as PessoaFiltroValues);
  const [page, setPage] = useState(0);


  const router = useRouter();

  const handleSelect = (person: Pessoa) => {
      router.push(`/pessoa/${person.id}`);
    };

  useEffect(() => {
  const fetchData = async () => {
      
    
      const response = await personService.list({
        ...filters,
        pagina: page,
        status: filters.status ?? undefined,
        sexo: filters.sexo ?? undefined,
      });
      console.log("🚀 ~ fetchData ~ response:", response)
      setPersonData(response || []);
      setLoading(false);
     
    };
    fetchData();
  }, []);





  return (
    <div className="min-h-screen bg-gray-50">
    
      
      <PessoaFiltro onFilterChange={setFilters}/>

      
      <main className="max-w-6xl mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Carregando...</p>
          </div>
        ) : (
          <Flex direction={"column"} className='justify-center gap-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {personData?.content.map((pessoa) => (
                <PersonCard key={pessoa.id} person={pessoa} onSelect={handleSelect} />
              ))}
              
            </div>
            <Pagination total={personData.totalElements}  value={personData.pageable.pageNumber} onChange={setPage} />
          </Flex>
        )}

        {personData?.content?.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Nenhum caso encontrado.</p>
          </div>
        )}
      </main>

      
    </div>
  );
}