import { useState, useEffect } from "react";

import { Search, Filter, ChevronDown, X, User, Calendar, Eraser } from "lucide-react";
import { PessoaFiltroValues } from "@/types/domain/Pessoa";

import { ActionIcon, Button, Group, NumberInput, Select, TextInput } from "@mantine/core";

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

  const handleClear = () => {
    setFilters({
      nome: "",
      status: null,
      sexo: null,
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 0,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 w-3/4">
      {/* Search Bar + Filter Button */}
      <div className="flex justify-center items-center gap-2">
        
          <TextInput
            className="w-3/4"
            placeholder="Buscar pessoa por nome (ex: João)"
            radius="md"
            value={filters.nome}
            onChange={(e) => handleChange("nome", e.currentTarget.value)}
           
          />

        <Button
            type="button"
            variant="secondary"
            radius={"md"}
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
        <Button
       
          onClick={handleClear}
          radius={"md"}
          color="red"
          rightSection={<Eraser size={14} />}
        >
          Limpar
        </Button>
       
      </div>

     
      {showAdvanced && (
       <Group  mt="md" grow align="flex-start" className="bg-white shadow-md rounded-2xl p-4 items-center">
          <Select
          
            label="Status"
            data={[
              { value: "DESAPARECIDO", label: "Desaparecido" },
              { value: "LOCALIZADO", label: "Localizado" },
              {value: '', label: "Outro"},
            ]}
            placeholder="Todos"
            value={filters.status ?? ""}
            onChange={(val) => handleChange("status", val || null)}
            rightSection={<ChevronDown size={16} />}
          />

          <Select
            label="Sexo"
            data={[
              { value: "MASCULINO", label: "Masculino" },
              { value: "FEMININO", label: "Feminino" },
              {value: '', label: "Outro"},
            ]}
            placeholder="Todos"
            value={filters.sexo ?? ""}
            onChange={(val) => handleChange("sexo", val || null)}
            rightSection={<ChevronDown size={16} />}
            
          />

          <NumberInput
            label="Faixa Etária Inicial"
            
            placeholder="Inicial"
            min={0}
            value={filters.faixaIdadeInicial}
            onChange={(val) => handleChange("faixaIdadeInicial", val || 0)}
             error={
              filters.faixaIdadeFinal < filters.faixaIdadeInicial
                ? 'A faixa inicial não pode ser maior que a final'
                : null
            }
            hideControls 
          />

          <NumberInput
            label="Faixa Etária Final"
            placeholder="Final"
            min={0}
            value={filters.faixaIdadeFinal}
            onChange={(val) => handleChange("faixaIdadeFinal", val || 0)}
            error={
                filters.faixaIdadeFinal < filters.faixaIdadeInicial
                  ? 'A faixa final não pode ser menor que a inicial'
                  : null
            }
            hideControls 

          />
        </Group>
      )}
    </div>
  );
};

export default PessoaFiltro;
