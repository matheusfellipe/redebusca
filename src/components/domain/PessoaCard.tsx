'use client';


import { Pessoa } from "@/types/domain/Pessoa";
import Card from "../ui/Card";

interface PersonCardProps {
  person: Pessoa;
  onSelect?: (person: Pessoa) => void;
}

export default function PersonCard({ person, onSelect }: PersonCardProps) {
  const isFound = () => !!person.ultimaOcorrencia?.dataLocalizacao;

  return (
    <div onClick={() => onSelect?.(person)} className="cursor-pointer">
      <Card
        title={person.nome}
        subtitle={`${person.idade} anos • ${person.sexo}`}
        footer={
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              #{person.ultimaOcorrencia?.ocoId || "-"}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              isFound()
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {isFound() ? 'Encontrado' : 'Desaparecido'}
            </span>
          </div>
        }
      >
        <p className="text-xs text-gray-500 truncate">
          {person.ultimaOcorrencia?.localDesaparecimentoConcat || 'Local não informado'}
        </p>
      </Card>
    </div>
  );
}
