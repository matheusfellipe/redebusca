'use client';

import { useState, useEffect } from 'react';
// import Image from 'next/image';
import { personService } from "@/services/pessoaService";
import { Pessoa, Sexo } from "@/types/domain/Pessoa";
import PersonCard from '@/components/domain/PessoaCard';

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState<Pessoa | null>(null);
  const [personData, setPersonData] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
     
        const response = await personService.list({});
        console.log("🚀 ~ fetchData ~ response:", response)
        setPersonData(response.content || []);
        setLoading(false);
     
    };
    fetchData();
  }, []);

  const filteredData = personData.filter(pessoa => 
    pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEmoji = (pessoa: Pessoa) => {
    if (pessoa.idade < 18) return pessoa.sexo === Sexo.Masculino ? '👦' : '👧';
    if (pessoa.idade >= 60) return pessoa.sexo === Sexo.Masculino ? '👴' : '👵';
    return pessoa.sexo === Sexo.Masculino ? '👨' : '👩';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isFound = (pessoa: Pessoa) => !!pessoa.ultimaOcorrencia?.dataLocalizacao;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Rede Busca</h1>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Reportar
            </button>
          </div>
        </div>
      </header>

      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      
      <main className="max-w-6xl mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Carregando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((pessoa) => (
              <PersonCard key={pessoa.id} person={pessoa} />
            ))}
          </div>
        )}

        {filteredData.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Nenhum caso encontrado.</p>
          </div>
        )}
      </main>

      
    </div>
  );
}