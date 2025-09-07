'use client';

import Card from "@/components/ui/Card";
import { personService } from "@/services/pessoaService";
import { Pessoa } from "@/types/domain/Pessoa";
import { Suspense, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Loader } from "@mantine/core";
import dynamic from "next/dynamic";


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

  const [personData, setPersonData] = useState<Pessoa>({} as Pessoa);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await personService.getById(id);
        setPersonData(response || ({} as Pessoa));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loader color="blue" />;

  const statusLabel = personData.ultimaOcorrencia?.encontradoVivo ? "Encontrado" : "Desaparecido";
  const statusColor = personData.ultimaOcorrencia?.encontradoVivo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  return (
    <div className="p-4 flex flex-col items-center w-full max-w-xl">
      <Button
        variant="outline"
        size="sm"
        className="mb-4 self-start"
        onClick={() => router.push("/")}
      >
        ← Voltar para Home
      </Button>

      <Card
        title={personData.nome}
        subtitle={`${personData.idade} anos • ${personData.sexo}`}
        footer={
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {statusLabel}
          </span>
        }
      >
        {personData.urlFoto && (
          <img src={personData.urlFoto} alt={personData.nome} className="w-32 h-32 rounded-lg mb-4" />
        )}

        <p className="text-sm text-gray-600 mb-2">
          Última localização: {personData.ultimaOcorrencia?.localDesaparecimentoConcat || "Não informado"}
        </p>

        {personData.ultimaOcorrencia?.dtDesaparecimento && (
          <p className="text-sm text-gray-600 mb-2">
            Data desaparecimento: {new Date(personData.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString()}
          </p>
        )}

        {personData.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO && (
          <>
            <p className="text-sm text-gray-600 mb-1">
              Informação: {personData.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Vestimenta: {personData.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
            </p>
          </>
        )}

        
        <Button
          variant="light"
          size="sm"
          className="mt-4"
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? "Fechar formulário" : "Adicionar informações"}
        </Button>

        {/* Lazy loaded form */}
        {showForm && (
          <Suspense fallback={<Loader size="sm" />}>
            <AddInfoForm personId={personData.id} />
          </Suspense>
        )}
      </Card>
    </div>
  );
};

export default PessoaPage;
