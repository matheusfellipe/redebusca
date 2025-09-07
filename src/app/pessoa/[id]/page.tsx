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


  


  if (loading) return  <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Carregando...</p>
          </div>;

  if (error) return <ErrorMessage message={error} />;

  const statusLabel = personData.ultimaOcorrencia?.encontradoVivo ? "Encontrado" : "Desaparecido";
  const statusColor = personData.ultimaOcorrencia?.encontradoVivo ? "green" : "red";

  return (
    <Stack align="center"  className="p-4 w-full max-w-2xl mx-auto">
      <Button variant="outline" size="sm" onClick={() => router.push("/")}>
        ← Voltar para Home
      </Button>

      <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
        <Group align="flex-start">
          {personData.urlFoto && (
            <Image
              src={personData.urlFoto}
              alt={personData.nome}
              width={128}
              height={128}
              radius="md"
              fit="cover"
            />
          )}

          <Stack  className="flex-1">
            <Text  size="xl">{personData.nome}</Text>
            <Text color="dimmed">{personData.idade} anos • {personData.sexo}</Text>

            <Badge color={statusColor} variant="light">
              {statusLabel}
            </Badge>

            <Text size="sm" color="gray.6">
              Última localização: {personData.ultimaOcorrencia?.localDesaparecimentoConcat || "Não informado"}
            </Text>

            {personData.ultimaOcorrencia?.dtDesaparecimento && (
              <Text size="sm" color="gray.6">
                Data desaparecimento: {new Date(personData.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString()}
              </Text>
            )}

            {personData.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO && (
              <>
                <Text size="sm" color="gray.6">
                  Informação: {personData.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                </Text>
                <Text size="sm" color="gray.6">
                  Vestimenta: {personData.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                </Text>
              </>
            )}
          </Stack>
        </Group>

        <Button
          variant="light"
          size="sm"
          fullWidth
          mt="md"
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? "Fechar formulário" : "Adicionar informações"}
        </Button>

        {showForm && (
          <Suspense fallback={<Loader size="sm" />}>
            <AddInfoForm personId={personData.id} />
          </Suspense>
        )}
      </Card>
    </Stack>
  );
};

export default PessoaPage;
