import { IconUserSearch } from '@tabler/icons-react';
import React from 'react';

const Header = () => (
  <header className="bg-white shadow-sm border-b">
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <span className='flex items-center gap-2'>
            <IconUserSearch color='black'/>
            <h1 className="text-2xl font-bold text-gray-900">Rede Busca</h1>

        </span>
        <h4 className="px-4 py-2 rounded-lg font-bold text-1xl text-gray-900">
          Consulta de pessoas desaparecidas
        </h4>
      </div>
    </div>
  </header>
);

export default Header;
