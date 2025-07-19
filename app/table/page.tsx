// app/page.tsx
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table'; // Assuming data-table is now in ui folder
import { useState, useEffect } from 'react';

// Definição do tipo para seus dados
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

// Definição das colunas da tabela
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Função',
  },
];

export default function HomePage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula uma chamada de API
    const fetchData = async () => {
      setLoading(true);
      // Simula delay da API de 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const fetchedData: User[] = [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao@example.com',
          role: 'Admin',
        },
        {
          id: '2',
          name: 'Maria Souza',
          email: 'maria@example.com',
          role: 'Editor',
        },
        {
          id: '3',
          name: 'Pedro Lima',
          email: 'pedro@example.com',
          role: 'Viewer',
        },
        {
          id: '4',
          name: 'Ana Costa',
          email: 'ana@example.com',
          role: 'Editor',
        },
        {
          id: '5',
          name: 'Carlos Pereira',
          email: 'carlos@example.com',
          role: 'Admin',
        },
      ];
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}
