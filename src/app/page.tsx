'use client';

import { useState } from 'react';

import { Pessoa, PessoaFiltroValues } from "@/types/domain/Pessoa";
import PersonCard from '@/components/domain/PessoaCard';
import { useRouter } from 'next/navigation';

import PessoaFiltro from '@/components/domain/PessoaFiltro';
import { Flex, Pagination } from '@mantine/core';
import { usePessoaList } from '@/hooks/usePessoaList';
import ErrorMessage from '@/components/domain/ErrorMessage';

export default function Home() {
  
  
  const [filters, setFilters] = useState<PessoaFiltroValues>({} as PessoaFiltroValues);
  const [page, setPage] = useState(0);
  const { personData, loading, error } = usePessoaList(filters, page);


  const router = useRouter();

  const handleSelect = (person: Pessoa) => {
      router.push(`/pessoa/${person.id}`);
    };

  
  
  if (error) return <ErrorMessage message={error} />;



  const onFiltering = (filters: PessoaFiltroValues) => {
    setFilters(filters);
    setPage(0);
  };





  return (
    <div className="min-h-screen bg-gray-50">
    
      
      <PessoaFiltro onFilterChange={onFiltering}/>

      
      <main className="max-w-6xl mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Carregando...</p>
          </div>
        ) : (
          <Flex direction={"column"} className='justify-center items-center gap-4'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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