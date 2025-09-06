import { Pessoa } from "@/types/domain/Pessoa";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface PersonCardProps {
  person: Pessoa | null;
  loading?: boolean;

}

const PersonCard: React.FC<PersonCardProps> = ({ person, loading }) => {
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <Card>Carregando...</Card>
      </div>
    );
  }

  if (!person) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    
    >
      <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <Card
          title={person.nome}
          subtitle={`Caso #${person.ultimaOcorrencia?.ocoId}`}
        >
          {/* Photo */}
          {/* {person.urlFoto && (
            <div className="mb-4 flex justify-center">
              <Image
                src={person.urlFoto}
                alt={person.nome}
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />
            </div>
          )} */}

          {/* Info */}
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-gray-700">Idade:</span>
              <span className="ml-2">{person.idade} anos</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Sexo:</span>
              <span className="ml-2">{person.sexo}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Desaparecimento:</span>
              {/* <span className="ml-2">
                {formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}
              </span> */}
            </div>
            {person.ultimaOcorrencia?.localDesaparecimentoConcat && (
              <div>
                <span className="font-medium text-gray-700">Local:</span>
                <span className="ml-2">
                  {person.ultimaOcorrencia.localDesaparecimentoConcat}
                </span>
              </div>
            )}
            {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao && (
              <div>
                <span className="font-medium text-gray-700">Informações:</span>
                <p className="mt-1 p-2 bg-gray-50 rounded text-xs">
                  {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-3">
            <Button
              onClick={() =>
                alert("Contate: 190 (PM), 197 (PC), 181 (Disque Denúncia)")
              }
              className="flex-1"
            >
              Tenho Info
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${person.nome} - Caso #${person.ultimaOcorrencia?.ocoId}`
                );
                alert("Copiado!");
              }}
              className="flex-1"
            >
              Compartilhar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PersonCard;