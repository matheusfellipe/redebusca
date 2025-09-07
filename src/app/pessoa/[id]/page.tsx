'use client';

import { Suspense, use, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Loader, Text, Group, Image, Badge, Stack } from "@mantine/core";
import dynamic from "next/dynamic";
import ErrorMessage from "@/components/domain/ErrorMessage";
import { usePessoa } from "@/hooks/usePessoa";

const AddInfoForm = dynamic(() => import('@/components/domain/AddInfoForm'), {
  loading: () => <Loader size="sm" />,
  ssr: false,
});

interface Props {
  params: Promise<{ id: number }>;
}

const PessoaPage: React.FC<Props> = ({ params }) => {
  const { id } = use(params);
  const router = useRouter();
  const { personData, loading, error } = usePessoa(id);
  const [showForm, setShowForm] = useState(false);

  if (loading) return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="mt-2 text-gray-600">Carregando...</p>
    </div>
  );

  if (error) return <ErrorMessage message={error} />;

  const statusLabel = personData.ultimaOcorrencia?.encontradoVivo ? "Encontrado" : "Desaparecido";
  const statusColor = personData.ultimaOcorrencia?.encontradoVivo ? "green" : "red";
  const isMissing = !personData.ultimaOcorrencia?.encontradoVivo;

  return (
    <Stack align="center" className="p-4 w-full max-w-4xl mx-auto">
      <Button variant="outline" size="sm" onClick={() => router.push("/")}>
        ← Voltar para Home
      </Button>

      <Card shadow="lg" padding={0} radius="xl" withBorder className="w-full overflow-hidden">
        {/* Status banner for missing persons */}
        {isMissing && (
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <Text size="sm" className="font-bold tracking-wide uppercase">
                Pessoa {personData.sexo === "MASCULINO" ? "Desaparecida" : "Desaparecida"}
              </Text>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Main content area */}
          <div className="grid md:grid-cols-5 gap-6 mb-6">
            {/* Image section */}
            <div className="md:col-span-2">
              <div className="relative">
                {personData.urlFoto ? (
                  <div className="relative overflow-hidden rounded-2xl shadow-md bg-gray-100">
                    <Image
                      src={personData.urlFoto}
                      alt={personData.nome}
                      width="100%"
                      height={280}
                      fit="cover"
                      className="transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                ) : (
                  <div className="w-full h-70 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                      <Text size="sm" color="dimmed">Sem foto</Text>
                    </div>
                  </div>
                )}

                {/* Status badge positioned on image */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <Badge 
                    color={statusColor} 
                    size="lg" 
                    className="shadow-lg border-2 border-white"
                  >
                    {statusLabel}
                  </Badge>
                </div>
              </div>
            </div>

           
            <div className="md:col-span-3">
              <Stack className="h-full justify-between" gap="md">
                
                <div>
                  <Text size="2xl" className="font-bold text-gray-900 mb-3">
                    {personData.nome}
                  </Text>
                  <Text size="lg" color="dimmed" className="mb-4">
                    {personData.idade} anos • {personData.sexo}
                  </Text>
                </div>

               
                <div className="space-y-4 flex-1">
                  {personData.ultimaOcorrencia?.localDesaparecimentoConcat && (
                    <div className=" border-l-4 border-red-400 p-4 rounded-r-lg">
                      <Text size="sm" className="font-semibold text-black-800 mb-1">
                        📍 Última localização
                      </Text>
                      <Text size="sm" className="text-black-700">
                        {personData.ultimaOcorrencia.localDesaparecimentoConcat}
                      </Text>
                    </div>
                  )}

                  {personData.ultimaOcorrencia?.dtDesaparecimento && (
                    <div className=" border-l-4 border-red-400 p-4 rounded-r-lg">
                      <Text size="sm" className="font-semibold text-black-800 mb-1">
                        📅 Data do desaparecimento
                      </Text>
                      <Text size="sm" className="text-black-700">
                        {new Date(personData.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString('pt-BR')}
                      </Text>
                    </div>
                  )}

                  {personData.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO && (
                    <>
                      {personData.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                          <Text size="sm" className="font-semibold text-yellow-800 mb-1">
                            ℹ️ Informação
                          </Text>
                          <Text size="sm" className="text-yellow-700">
                            {personData.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                          </Text>
                        </div>
                      )}

                      {personData.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido && (
                        <div className=" border-l-4 border-red-400 p-4 rounded-r-lg">
                          <Text size="sm" className="font-semibold text-black-800 mb-1">
                            👕 Vestimenta
                          </Text>
                          <Text size="sm" className="text-black-700">
                            {personData.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                          </Text>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Stack>
            </div>
          </div>

          {/* Emergency contact info */}
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <Text size="sm" className="font-bold text-amber-800 mb-1">
              🚨 Informações importantes
            </Text>
            <Text size="xs" className="text-amber-700">
              Se você tem informações sobre esta pessoa, entre em contato com as autoridades - Ligue 190
            </Text>
          </div>

          
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            size="md"
            fullWidth
            className="mb-4"
            onClick={() => setShowForm(prev => !prev)}
          >
            {showForm ? "Fechar formulário" : "Adicionar informações"}
          </Button>

          
          {showForm && (
            <div className="mt-6 p-6 bg-gray-50 rounded-xl border">
              <Suspense fallback={
                <div className="text-center py-4">
                  <Loader size="sm" />
                  <Text size="sm" className="mt-2 text-gray-600">Carregando formulário...</Text>
                </div>
              }>
                <AddInfoForm personId={personData.id} />
              </Suspense>
            </div>
          )}
        </div>
      </Card>
    </Stack>
  );
};

export default PessoaPage;
