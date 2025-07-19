'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

// Importações necessárias para a HomePage com DataTable
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';

// Importações para Syntax Highlighting
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Escolha um estilo. vscDarkPlus é um bom tema escuro, você pode explorar outros.
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// O código-fonte da sua HomePage (com a tabela), armazenado como uma string para ser exibido na aba 'Code'.
// Mantenha este string atualizado se você modificar a HomePage.
const HomePageSourceCode = `
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
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
`;

// A definição real do componente HomePage para ser renderizado na aba 'Preview'.
// É importante que este componente seja funcional e tenha todas as suas dependências (como DataTable).
// Re-declarando os tipos e colunas para que este componente seja self-contained aqui.
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

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

function HomePage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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

// Nova interface para definir a estrutura de cada aba
interface TabItem {
  title: string; // Título exibido na aba
  value: string; // Valor único para o TabsTrigger e TabsContent
  content: React.ReactNode; // Conteúdo JSX a ser renderizado dentro da aba
  isCode?: boolean; // Opcional: indica se o conteúdo é código para exibir o botão de copiar
}

// Novo componente TabbedViewer para encapsular a lógica das abas
interface TabbedViewerProps {
  tabs: TabItem[];
}

function TabbedViewer({ tabs }: TabbedViewerProps) {
  const [copied, setCopied] = useState(false);

  // Função para copiar o código para a área de transferência
  const handleCopy = () => {
    // Agora, o ID é aplicado ao elemento <code> dentro do SyntaxHighlighter
    const codeElement = document.getElementById('page-code-content');
    if (codeElement) {
      const textToCopy = codeElement.innerText; // Pega o texto puro do elemento
      try {
        // Usa a API Clipboard para copiar o texto
        // document.execCommand('copy') é uma alternativa mais antiga
        // mas navigator.clipboard.writeText é o padrão moderno e preferível
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => {
            console.error('Falha ao copiar o texto (Clipboard API): ', err);
            // Fallback para document.execCommand se a API Clipboard falhar ou não for suportada
            // Embora no ambiente Canvas, document.execCommand('copy') é mais confiável.
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = textToCopy;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            try {
              document.execCommand('copy');
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch (execErr) {
              console.error('Falha ao copiar o texto (execCommand): ', execErr);
            }
            document.body.removeChild(tempTextArea);
          });
      } catch (err) {
        console.error('Erro geral ao tentar copiar: ', err);
      }
    }
  };

  return (
    <Tabs defaultValue={tabs[0]?.value || 'default'} className="w-full">
      {/* Lista de Abas (Triggers) renderizada dinamicamente */}
      <TabsList
        className="grid w-full"
        style={{
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        }}
      >
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Conteúdo das Abas renderizado dinamicamente */}
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-4 rounded-md border p-4 relative"
        >
          {/* Botão de Copiar é exibido apenas se isCode for true */}
          {tab.isCode && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10" // Adicionado z-10 para garantir que o botão esteja acima do código
              onClick={handleCopy}
              title="Copiar código"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" /> // Ícone de check quando copiado
              ) : (
                <Copy className="h-4 w-4" /> // Ícone de copiar
              )}
              <span className="sr-only">
                {copied ? 'Copiado!' : 'Copiar código'}
              </span>
            </Button>
          )}
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

// Componente principal que irá renderizar as abas usando o TabbedViewer
export default function App() {
  // Define os dados das abas que serão passados para o TabbedViewer
  const tabsData: TabItem[] = [
    {
      title: 'Preview',
      value: 'preview',
      content: <HomePage />, // Passa o componente HomePage como conteúdo
    },
    {
      title: 'Código',
      value: 'code',
      isCode: true, // Indica que esta aba contém código
      content: (
        <SyntaxHighlighter
          language="tsx" // Define a linguagem para TypeScript JSX
          style={vscDarkPlus} // Aplica o tema de cores
          showLineNumbers={true} // Opcional: exibe números de linha
          // Adiciona o ID ao elemento <code> gerado pelo SyntaxHighlighter para a função de cópia
          codeTagProps={{ id: 'page-code-content' }}
          className="rounded-md" // Adiciona arredondamento ao bloco de código
        >
          {HomePageSourceCode}
        </SyntaxHighlighter>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-8">
      {/* Renderiza o TabbedViewer passando os dados das abas */}
      <TabbedViewer tabs={tabsData} />
    </div>
  );
}
