'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

// Importações necessárias para a nova HomePage com DynamicForm
import { z } from 'zod';
import { DynamicForm, FormFieldConfig } from '@/components/ui/dynamic-form';

// Importações para Syntax Highlighting
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Escolha um estilo. vscDarkPlus é um bom tema escuro, você pode explorar outros.
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// O código-fonte da sua HomePage (com o formulário dinâmico), armazenado como uma string para ser exibido na aba 'Code'.
// Mantenha este string atualizado se você modificar a HomePage.
const HomePageSourceCode = `
'use client';

import { z } from 'zod';
import { DynamicForm, FormFieldConfig } from '@/components/ui/dynamic-form';

export default function HomePage() {
  // 1. Defina o esquema de validação com Zod
  const formSchema = z.object({
    fullName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
    email: z.string().email('Por favor, insira um e-mail válido.'),
    age: z.number().min(18, 'Você deve ser maior de idade.').max(100),
    department: z.string().min(1, 'Selecione um departamento.'),
    bio: z
      .string()
      .max(200, 'A biografia não pode exceder 200 caracteres.')
      .optional(),
    notifications: z.boolean().default(false),
    terms: z.boolean().refine((val) => val === true, {
      message: 'Você deve aceitar os termos e condições.',
    }),
    satisfaction: z.number().min(0).max(100).default(50),
  });

  // 2. Defina a configuração dos campos do formulário
  const formFields: FormFieldConfig[] = [
    {
      name: 'fullName',
      label: 'Nome Completo',
      type: 'input',
      placeholder: 'Seu nome aqui...',
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'input',
      placeholder: 'exemplo@dominio.com',
    },
    {
      name: 'age',
      label: 'Idade',
      type: 'number',
      placeholder: 'Sua idade',
    },
    {
      name: 'department',
      label: 'Departamento',
      type: 'select',
      placeholder: 'Selecione uma opção',
      options: [
        { value: 'hr', label: 'Recursos Humanos' },
        { value: 'engineering', label: 'Engenharia' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Vendas' },
      ],
    },
    {
      name: 'bio',
      label: 'Biografia',
      type: 'textarea',
      placeholder: 'Fale um pouco sobre você...',
    },
    {
      name: 'satisfaction',
      label: 'Nível de Satisfação',
      type: 'range',
      description: 'Deslize para indicar sua satisfação.',
    },
    {
      name: 'notifications',
      label: 'Receber notificações por e-mail',
      type: 'switch',
      description: 'Marque para receber novidades.',
    },
    {
      name: 'terms',
      label: 'Eu aceito os termos e condições', // Label usado pelo Checkbox internamente
      type: 'checkbox',
      description: 'Para continuar, você precisa concordar.',
    },
  ];

  // 3. Defina os valores padrão (podem vir de uma API, por exemplo)
  const defaultValues = {
    fullName: '',
    email: '',
    age: 18,
    department: '',
    bio: '',
    notifications: false,
    terms: false,
    satisfaction: 50,
  };

  // 4. Crie a função para lidar com o envio do formulário
  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    console.log('DADOS DO FORMULÁRIO:', values);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-2xl bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Formulário Dinâmico</h1>
        <DynamicForm
          formSchema={formSchema}
          formFields={formFields}
          onSubmit={handleFormSubmit}
          defaultValues={defaultValues}
          submitButtonText="Criar Cadastro"
        />
      </div>
    </main>
  );
}
`;

// O componente HomePage atualizado para o formulário dinâmico
function HomePage() {
  // 1. Defina o esquema de validação com Zod
  const formSchema = z.object({
    fullName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
    email: z.string().email('Por favor, insira um e-mail válido.'),
    age: z.number().min(18, 'Você deve ser maior de idade.').max(100),
    department: z.string().min(1, 'Selecione um departamento.'),
    bio: z
      .string()
      .max(200, 'A biografia não pode exceder 200 caracteres.')
      .optional(),
    notifications: z.boolean().default(false),
    terms: z.boolean().refine((val) => val === true, {
      message: 'Você deve aceitar os termos e condições.',
    }),
    satisfaction: z.number().min(0).max(100).default(50),
  });

  // 2. Defina a configuração dos campos do formulário
  const formFields: FormFieldConfig[] = [
    {
      name: 'fullName',
      label: 'Nome Completo',
      type: 'input',
      placeholder: 'Seu nome aqui...',
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'input',
      placeholder: 'exemplo@dominio.com',
    },
    {
      name: 'age',
      label: 'Idade',
      type: 'number',
      placeholder: 'Sua idade',
    },
    {
      name: 'department',
      label: 'Departamento',
      type: 'select',
      placeholder: 'Selecione uma opção',
      options: [
        { value: 'hr', label: 'Recursos Humanos' },
        { value: 'engineering', label: 'Engenharia' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Vendas' },
      ],
    },
    {
      name: 'bio',
      label: 'Biografia',
      type: 'textarea',
      placeholder: 'Fale um pouco sobre você...',
    },
    {
      name: 'satisfaction',
      label: 'Nível de Satisfação',
      type: 'range',
      description: 'Deslize para indicar sua satisfação.',
    },
    {
      name: 'notifications',
      label: 'Receber notificações por e-mail',
      type: 'switch',
      description: 'Marque para receber novidades.',
    },
    {
      name: 'terms',
      label: 'Eu aceito os termos e condições', // Label usado pelo Checkbox internamente
      type: 'checkbox',
      description: 'Para continuar, você precisa concordar.',
    },
  ];

  // 3. Defina os valores padrão (podem vir de uma API, por exemplo)
  const defaultValues = {
    fullName: '',
    email: '',
    age: 18,
    department: '',
    bio: '',
    notifications: false,
    terms: false,
    satisfaction: 50,
  };

  // 4. Crie a função para lidar com o envio do formulário
  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    console.log('DADOS DO FORMULÁRIO:', values);
    // Aqui você enviaria os dados para sua API
    // alert('Formulário enviado! Verifique o console para os dados.'); // Usando alert para demonstração
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-2xl bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Formulário Dinâmico</h1>
        <DynamicForm
          formSchema={formSchema}
          formFields={formFields}
          onSubmit={handleFormSubmit}
          defaultValues={defaultValues}
          submitButtonText="Criar Cadastro"
        />
      </div>
    </main>
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
