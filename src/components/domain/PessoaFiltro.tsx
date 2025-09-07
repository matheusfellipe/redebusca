import { useState, useEffect } from "react";

import { Search, Filter, ChevronDown, X, User, Calendar } from "lucide-react";
import { PessoaFiltroValues } from "@/types/domain/Pessoa";
import Button from "../ui/Button";

interface PessoaFiltroProps {
  onFilterChange: (filters: PessoaFiltroValues) => void;
}

const PessoaFiltro: React.FC<PessoaFiltroProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<PessoaFiltroValues>({
    nome: "",
    status: null,
    sexo: null,
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 0,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  
  useEffect(() => {
    
      onFilterChange(filters);
   
    
  }, [filters, onFilterChange]);

  const handleChange = (field: keyof PessoaFiltroValues, value: any) => {
    setFilters((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Search Bar + Filter Button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            value={filters.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
            placeholder="Buscar pessoa por nome (ex: João)"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <Button
            type="button"
            variant="secondary"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 text-sm"
            >
            <Filter size={16} />
            <span>Filtros</span>
            <ChevronDown
                size={16}
                className={`transition-transform ${showAdvanced ? "rotate-180" : ""}`}
            />
        </Button>
      </div>

     
      {showAdvanced && (
        <div className="mt-2 flex flex-wrap justify-center gap-4 bg-[#FFFFFF] p-2 rounded-lg">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status??''}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-100"
            >
              <option value="">Todos</option>
              <option value="DESAPARECIDO">Desaparecido</option>
              <option value="LOCALIZADO">Localizado</option>
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sexo
            </label>
            <select
              value={filters.sexo??''}
              onChange={(e) => handleChange("sexo", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-100"
            >
              <option value="">Todos</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
            </select>
          </div>

        <div className="md:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
        Faixa Etária
    </label>
    <div className="flex gap-4">
        <input
        type="number"
        min={0}
        value={filters.faixaIdadeInicial}
        onChange={(e) => handleChange("faixaIdadeInicial", Number(e.target.value))}
        placeholder="Inicial (ex: 18)"
        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
        type="number"
        min={0}
        value={filters.faixaIdadeFinal}
        onChange={(e) => handleChange("faixaIdadeFinal", Number(e.target.value))}
        placeholder="Final (ex: 40)"
        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
    </div>
    </div>
        </div>
      )}
    </div>
  );
};

export default PessoaFiltro;
