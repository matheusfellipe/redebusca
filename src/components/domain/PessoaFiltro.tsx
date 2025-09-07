"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Filter, ChevronDown, Eraser } from "lucide-react";
import { PessoaFiltroValues } from "@/types/domain/Pessoa";
import { Button, Group, NumberInput, Select, TextInput } from "@mantine/core";


const filtroSchema = z.object({
  nome: z.string().optional(),
  status: z.enum(["DESAPARECIDO", "LOCALIZADO"]).nullable(),
  sexo: z.enum(["MASCULINO", "FEMININO"]).nullable(),
  faixaIdadeInicial: z.number().min(0),
  faixaIdadeFinal: z.number().min(0),
});

export type PessoaFiltroSchema = z.infer<typeof filtroSchema>;

interface PessoaFiltroProps {
  onFilterChange: (filters: PessoaFiltroValues) => void;
}

const PessoaFiltro: React.FC<PessoaFiltroProps> = ({ onFilterChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<PessoaFiltroSchema>({
    resolver: zodResolver(filtroSchema),
    defaultValues: {
      nome: "",
      status: null,
      sexo: null,
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 0,
    },
  });

  const filters = watch();

  
useEffect(() => {
  const subscription = watch((value) => {
    onFilterChange(value as PessoaFiltroValues);
  });
  return () => subscription.unsubscribe();
}, [watch, onFilterChange]);

  const handleClear = () => {
    reset({
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
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <TextInput
              className="w-3/4"
              placeholder="Buscar pessoa por nome (ex: João)"
              radius="md"
              {...field}
            />
          )}
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
          radius="md"
          color="red"
          rightSection={<Eraser size={14} />}
        >
          Limpar
        </Button>
      </div>

     
     { showAdvanced && 
      <Group
        mt="md"
        grow
        align="flex-start"
        className="bg-white shadow-md rounded-2xl p-4 items-center"
      >
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              label="Status"
              data={[
                { value: "DESAPARECIDO", label: "Desaparecido" },
                { value: "LOCALIZADO", label: "Localizado" },
              ]}
              placeholder="Todos"
              value={field.value ?? ""}
              onChange={(val) => field.onChange(val || null)}
              rightSection={<ChevronDown size={16} />}
            />
          )}
        />

        <Controller
          name="sexo"
          control={control}
          render={({ field }) => (
            <Select
              label="Sexo"
              data={[
                { value: "MASCULINO", label: "Masculino" },
                { value: "FEMININO", label: "Feminino" },
              ]}
              placeholder="Todos"
              value={field.value ?? ""}
              onChange={(val) => field.onChange(val || null)}
              rightSection={<ChevronDown size={16} />}
            />
          )}
        />

        <Controller
          name="faixaIdadeInicial"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Faixa Etária Inicial"
              placeholder="Inicial"
              min={0}
              {...field}
              error={
                filters.faixaIdadeFinal < filters.faixaIdadeInicial
                  ? "A faixa inicial não pode ser maior que a final"
                  : null
              }
              hideControls
            />
          )}
        />

        <Controller
          name="faixaIdadeFinal"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Faixa Etária Final"
              placeholder="Final"
              min={0}
              {...field}
              error={
                filters.faixaIdadeFinal < filters.faixaIdadeInicial
                  ? "A faixa final não pode ser menor que a inicial"
                  : null
              }
              hideControls
            />
          )}
        />
      </Group>}
    </div>
  );
};

export default PessoaFiltro;
