'use client';

import { AlertCircle } from 'lucide-react';
import { Card, Text } from '@mantine/core';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Card
      withBorder
      radius="md"
      shadow="sm"
      className="bg-red-50 border-red-200 flex items-center gap-3 p-4"
    >
      <AlertCircle className="text-red-600" size={24} />
      <Text color="red.7" size="sm" >
        {message}
      </Text>
    </Card>
  );
};

export default ErrorMessage;
