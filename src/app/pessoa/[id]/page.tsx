// src/app/pessoa/[id]/page.tsx
import React from "react";

interface Props {
  params: { id: string };
}

const PessoaPage: React.FC<Props> = ({ params }) => {
  return <div>Pessoa ID: {params.id}</div>;
};

export default PessoaPage; 
