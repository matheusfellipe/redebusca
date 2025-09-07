'use client';

import { Pessoa } from "@/types/domain/Pessoa";
import { Card, Text, Badge, Group, Image, Stack, Box } from '@mantine/core';

interface PersonCardProps {
  person: Pessoa;
  onSelect?: (person: Pessoa) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, onSelect }) => {
  const { nome, idade, sexo, urlFoto, ultimaOcorrencia } = person;
  const { dataLocalizacao, ocoId, localDesaparecimentoConcat } = ultimaOcorrencia || {};

  const isFound = !!dataLocalizacao;


  return (
    <Card
      shadow="sm"
     
      withBorder
      p={0}
      className="cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      onClick={() => onSelect?.(person)}
      style={{ maxWidth: 240 }}
    >
     
      <Box
         style={{
          position: 'relative',
          height: 192,
          overflow: 'hidden',         
          borderTopLeftRadius: 16,     
          borderTopRightRadius: 16,
          background: 'linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6)',
        }}
      >
        {urlFoto ? (
          <Image
            src={urlFoto}
            alt={nome}
            className="p-2 w-full h-full object-cover"
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 48,
              color: 'white',
            }}
          >
            
          </Box>
        )}

        
        <Badge
          color={isFound ? 'green' : 'red'}
          variant="filled"
          size="xs"
          style={{ position: 'absolute', top: 8, right: 8 }}
        >
          {isFound ? 'Encontrado' : 'Desaparecido'}
        </Badge>
      </Box>

     
      <Stack  p="sm">
        <Text  size="sm" lineClamp={1} className="group-hover:text-indigo-600 transition-colors">
          {nome}
        </Text>

        <Stack   color="dimmed">
          <Group >
            <Text size="xs">Idade:</Text>
            <Text size="xs">{idade} anos</Text>
          </Group>
          <Group >
            <Text size="xs">Sexo:</Text>
            <Text size="xs">{sexo}</Text>
          </Group>
          <Group >
            <Text size="xs">Local:</Text>
            <Text size="xs" lineClamp={1}>
              {localDesaparecimentoConcat || 'Não informado'}
            </Text>
          </Group>
        </Stack>

        <Group >
        
          <Text size="xs" color="dimmed" style={{ fontFamily: 'monospace' }}>
            #{ocoId || '-'}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};

export default PersonCard;
