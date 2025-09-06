'use client';

import { useState, useEffect } from 'react';
// import Image from 'next/image';
import { personService } from "@/services/pessoaService";
import { Pessoa, Sexo } from "@/types/domain/Pessoa";

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
            <h1 className="text-2xl font-bold text-gray-900">🔍 FindSafe</h1>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Reportar
            </button>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Carregando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((pessoa) => (
              <div
                key={pessoa.id}
                onClick={() => setSelectedPerson(pessoa)}
                className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow"
              >
                {/* <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center text-4xl text-white">
                  {pessoa.urlFoto ? (
                    <Image
                      src={pessoa.urlFoto}
                      alt={pessoa.nome}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  ) : (
                    getEmoji(pessoa)
                  )}
                </div> */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{pessoa.nome}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {pessoa.idade} anos • {pessoa.sexo}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat || 'Local não informado'}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      #{pessoa.ultimaOcorrencia?.ocoId}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isFound(pessoa)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {isFound(pessoa) ? 'Encontrado' : 'Desaparecido'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredData.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Nenhum caso encontrado.</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedPerson && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPerson(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedPerson.nome}</h2>
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* {selectedPerson.urlFoto && (
                <div className="mb-4 flex justify-center">
                  <Image
                    src={selectedPerson.urlFoto}
                    alt={selectedPerson.nome}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                </div>
              )} */}

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Idade:</span>
                  <span className="ml-2">{selectedPerson.idade} anos</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Sexo:</span>
                  <span className="ml-2">{selectedPerson.sexo}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Caso:</span>
                  <span className="ml-2">#{selectedPerson.ultimaOcorrencia?.ocoId}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Desaparecimento:</span>
                  <span className="ml-2" suppressHydrationWarning={true}>{formatDate(selectedPerson.ultimaOcorrencia?.dtDesaparecimento)}</span>
                </div>
                {selectedPerson.ultimaOcorrencia?.dataLocalizacao && (
                  <div>
                    <span className="font-medium text-gray-700">Localização:</span>
                    <span className="ml-2 text-green-600" suppressHydrationWarning={true}>{formatDate(selectedPerson.ultimaOcorrencia.dataLocalizacao)}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Local:</span>
                  <span className="ml-2">{selectedPerson.ultimaOcorrencia?.localDesaparecimentoConcat || 'Não informado'}</span>
                </div>

                {selectedPerson.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao && (
                  <div>
                    <span className="font-medium text-gray-700">Informações:</span>
                    <p className="mt-1 p-2 bg-gray-50 rounded text-xs">
                      {selectedPerson.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                    </p>
                  </div>
                )}

                {selectedPerson.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido && (
                  <div>
                    <span className="font-medium text-gray-700">Vestimentas:</span>
                    <p className="mt-1 p-2 bg-gray-50 rounded text-xs">
                      {selectedPerson.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => alert('Contate: 190 (PM), 197 (PC), 181 (Disque Denúncia)')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Tenho Info
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${selectedPerson.nome} - Caso #${selectedPerson.ultimaOcorrencia?.ocoId}`);
                    alert('Copiado!');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Compartilhar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}