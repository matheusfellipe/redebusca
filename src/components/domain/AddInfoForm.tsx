'use client';

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Textarea, Select, Button, Group } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";


interface Props {
  personId: number;
  onSuccess?: () => void;
}

// 1️⃣ Definindo validação Zod
const addInfoSchema = z.object({
  info: z.string().min(5, "Informe pelo menos 5 caracteres"),
  vestimenta: z.string().min(3, "Informe pelo menos 3 caracteres"),
  localAtual: z.string().optional(),
  dataOcorrencia: z.date().nullable(),
  status: z.enum(["DESAPARECIDO", "ENCONTRADO"]).optional(),
});

export type AddInfoFormData = z.infer<typeof addInfoSchema>;

// 2️⃣ Componente
const AddInfoForm: React.FC<Props> = ({ personId, onSuccess }) => {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AddInfoFormData>({
    resolver: zodResolver(addInfoSchema),
    defaultValues: {
      info: "",
      vestimenta: "",
      localAtual: "",
      dataOcorrencia: null,
      status: "DESAPARECIDO",
    },
  });

  // 3️⃣ Envio do formulário
  const onSubmit = async (data: AddInfoFormData) => {
    try {
      // Simula envio para API
      await fetch(`/api/person/${personId}/add-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Falha ao enviar informações:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
      <Controller
        name="info"
        control={control}
        render={({ field }) => (
          <Textarea
            label="Informações"
            placeholder="Digite informações sobre a pessoa"
            {...field}
            error={errors.info?.message}
          />
        )}
      />

      <Controller
        name="vestimenta"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Vestimenta"
            placeholder="Ex: Camisa azul, calça jeans"
            {...field}
            error={errors.vestimenta?.message}
          />
        )}
      />

      <Controller
        name="localAtual"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Local Atual"
            placeholder="Se conhecido"
            {...field}
          />
        )}
      />

      <Controller
        name="dataOcorrencia"
        control={control}
        render={({ field }) => (
          <DatePickerInput
            label="Data da Ocorrência"
            placeholder="Selecione a data"
            {...field}
            error={errors.dataOcorrencia?.message}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            label="Status"
            data={[
              { value: "DESAPARECIDO", label: "Desaparecido" },
              { value: "ENCONTRADO", label: "Encontrado" },
            ]}
            {...field}
          />
        )}
      />

      <Group mt="sm">
        <Button type="submit" loading={isSubmitting}>
          Salvar Informações
        </Button>
      </Group>
    </form>
  );
};

export default AddInfoForm;
