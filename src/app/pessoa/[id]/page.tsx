'use client';


import Card from "@/components/ui/Card";
import { personService } from "@/services/pessoaService";
import { Pessoa } from "@/types/domain/Pessoa";
import { use, useEffect, useState } from "react";

interface Props {
  params: Promise<{ id: number }>;
}

const PessoaPage: React.FC<Props> = ({ params }) => {
     const { id } = use(params);


    const [personData, setPersonData] = useState<Pessoa>({} as Pessoa);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
    const fetchData = async () => {
    
        const response = await personService.getById(id);
        console.log("🚀 ~ fetchData ~ response:", response)
        setPersonData(response || []);
        setLoading(false);
        
    };
    fetchData();
    }, [id]);

   if (loading) return <div>Loading...</div>;
  if (!personData) return <div>Person not found</div>;

  const statusLabel = personData.ultimaOcorrencia?.encontradoVivo ? "Encontrado" : "Desaparecido";
  const statusColor = personData.ultimaOcorrencia?.encontradoVivo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  return (
    <div className="p-4 max-w-3xl mx-auto">
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

        {/* {personData.ultimaOcorrencia?.listaCartaz?.length > 0 && (
          <div className="mt-2">
            <h4 className="text-sm font-semibold mb-1">Cartazes:</h4>
            <ul>
              {personData.ultimaOcorrencia.listaCartaz.map((cartaz, idx) => (
                <li key={idx}>
                  <a href={cartaz.urlCartaz} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-sm">
                    {cartaz.tipoCartaz}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </Card>
    </div>
  );
};

export default PessoaPage; 
