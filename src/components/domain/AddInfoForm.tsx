'use client';

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Textarea, Select, Button, Group, InputBase, FileInput, Text, Image } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { X, ImageIcon } from "lucide-react";
import { useState } from "react";
import { notifications } from '@mantine/notifications';

interface Props {
  personId: number;
  onSuccess?: () => void;
}

const addInfoSchema = z.object({
  info: z.string().min(5, "Informe pelo menos 5 caracteres"),
  vestimenta: z.string().min(3, "Informe pelo menos 3 caracteres"),
  localAtual: z.string().optional(),
  dataOcorrencia: z.string().min(10, "Informe a data no formato DD/MM/YYYY"),
  status: z.enum(["DESAPARECIDO", "ENCONTRADO"]).optional(),
  telefone: z.string().optional(),
});

export type AddInfoFormData = z.infer<typeof addInfoSchema>;

interface ImagePreview {
  file: File;
  preview: string;
  id: string;
}

const AddInfoForm: React.FC<Props> = ({ personId, onSuccess }) => {
  const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
  const maxImages = 5; 

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AddInfoFormData>({
    resolver: zodResolver(addInfoSchema),
    defaultValues: {
      info: "",
      vestimenta: "",
      localAtual: "",
      dataOcorrencia: "",
      status: "DESAPARECIDO",
      telefone: "",
    },
  });

  const validateFile = (file: File): boolean => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecione apenas arquivos de imagem (JPEG, PNG, WebP)');
      return false;
    }

  
    if (file.size > 5 * 1024 * 1024) {
      alert('Cada arquivo deve ter no máximo 5MB');
      return false;
    }

    return true;
  };

  const handleMultipleFileChange = (files: File[] | null) => {
    if (!files || files.length === 0) return;

    
    if (selectedImages.length + files.length > maxImages) {
      alert(`Você pode adicionar no máximo ${maxImages} imagens. Já tem ${selectedImages.length} selecionadas.`);
      return;
    }

    const validFiles: File[] = [];
    
    
    for (const file of files) {
      if (validateFile(file)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) return;

    
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: ImagePreview = {
          file,
          preview: reader.result as string,
          id: `${Date.now()}-${Math.random()}`, // Unique ID
        };
        
        setSelectedImages(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSingleFileAdd = (file: File | null) => {
    if (!file) return;
    handleMultipleFileChange([file]);
  };

  const removeImage = (imageId: string) => {
    setSelectedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const removeAllImages = () => {
    setSelectedImages([]);
  };

  const onSubmit = async (data: AddInfoFormData) => {
    try {
      const formData = new FormData();
      
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      
      selectedImages.forEach((imageData, index) => {
        formData.append(`image_${index}`, imageData.file);
      });

      
      formData.append('imageCount', selectedImages.length.toString());

        //   await fetch(`/ocorrencias/informacoes-desaparecido`, {
        //     method: "POST",
        //     body: formData,
        //   });
      notifications.show({
          title: 'Informações enviadas com sucesso',
          message: 'Obrigado por ajudar a encontrar esse desaparecido!',
          color: 'green',
        })

      reset();
      setSelectedImages([]);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Falha ao enviar informações:", err);
    }
  };

  const totalSize = selectedImages.reduce((sum, img) => sum + img.file.size, 0);
  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4 bg-gray-50 p-6 rounded-lg">
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Text size="sm" className="font-medium">
            Anexar Imagens ({selectedImages.length}/{maxImages})
          </Text>
          {selectedImages.length > 0 && (
            <Button
              variant="subtle"
              size="xs"
              color="red"
              onClick={removeAllImages}
            >
              Remover todas
            </Button>
          )}
        </div>

       
        <div className="space-y-3">
          <FileInput
            accept="image/*"
            multiple
            onChange={handleMultipleFileChange}
            placeholder={`Selecione até ${maxImages - selectedImages.length} imagens`}
            className="w-full"
            description="Formatos aceitos: JPEG, PNG, WebP. Máximo 5MB por imagem."
            disabled={selectedImages.length >= maxImages}
          />
          
         
        
        </div>

      
        {selectedImages.length > 0 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {selectedImages.map((imageData) => (
                <div key={imageData.id} className="relative group">
                  <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <Image
                      src={imageData.preview}
                      alt="Preview"
                      width="100%"
                      height={120}
                      fit="cover"
                      className="transition-transform group-hover:scale-105"
                    />
                    <Button
                      size="xs"
                      color="red"
                      variant="filled"
                      className="absolute top-1 right-1 rounded-full p-1 w-6 h-6 opacity-80 hover:opacity-100"
                      onClick={() => removeImage(imageData.id)}
                    >
                      <X size={10} />
                    </Button>
                  </div>
                  <Text size="xs" color="dimmed" className="mt-1 truncate">
                    {imageData.file.name}
                  </Text>
                  <Text size="xs" color="dimmed">
                    {(imageData.file.size / 1024 / 1024).toFixed(2)}MB
                  </Text>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ImageIcon size={16} className="text-blue-600" />
                <Text size="sm" className="text-blue-800">
                  {selectedImages.length} imagem{selectedImages.length !== 1 ? 'ns' : ''} selecionada{selectedImages.length !== 1 ? 's' : ''}
                </Text>
              </div>
              <Text size="sm" className="text-blue-700">
                Total: {totalSizeMB}MB
              </Text>
            </div>
          </div>
        )}

        
        {selectedImages.length >= maxImages && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <Text size="sm" className="text-amber-800">
              ⚠️ Limite de {maxImages} imagens atingido. Remova algumas para adicionar novas.
            </Text>
          </div>
        )}
      </div>

      <Controller
        name="info"
        control={control}
        render={({ field }) => (
          <Textarea
            label="Informações"
            placeholder="Digite informações sobre a pessoa"
            {...field}
            error={errors.info?.message}
            rows={3}
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
          <InputBase
            label="Data Ocorrência"
            component={IMaskInput}
            mask="00/00/0000"
            placeholder="DD/MM/YYYY"
            {...field}
            error={errors.dataOcorrencia?.message}
          />
        )}
      />

      <Controller
        name="telefone"
        control={control}
        render={({ field }) => (
          <InputBase
            label="Telefone"
            component={IMaskInput}
            mask="(00) 00000-0000"
            placeholder="(00) 00000-0000"
            {...field}
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

      <Group mt="lg">
        <Button 
          type="submit" 
          loading={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={selectedImages.length === 0 && !Object.values(errors).length}
        >
          Salvar Informações
          {selectedImages.length > 0 && ` (${selectedImages.length} imagem${selectedImages.length !== 1 ? 'ns' : ''})`}
        </Button>
      </Group>
    </form>
  );
};

export default AddInfoForm;