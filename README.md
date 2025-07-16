# Gerador de Formulários Dinâmico com Next.js, Shadcn UI e Zod

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) ![Tech: Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![Tech: Shadcn UI](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![Tech: React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white) ![Tech: Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

Este projeto oferece um componente de formulário dinâmico e reutilizável para aplicações Next.js. Construído com as melhores práticas, ele utiliza **Shadcn UI** para os componentes visuais, **React Hook Form** para gerenciamento de estado e **Zod** para uma validação de esquema robusta e type-safe.

O objetivo é simples: pare de reescrever formulários. Defina seus campos em um array de configuração e deixe o componente fazer o resto.

![Exemplo de Formulário Gerado](https://i.imgur.com/e2N0J8c.png)
*(Substitua a URL acima pelo link de um screenshot real do seu projeto)*

## ✨ Features

-   **Totalmente Dinâmico**: Renderiza formulários complexos a partir de um simples array de configuração JavaScript.
-   **Reutilizável**: Use o mesmo componente `<DynamicForm />` em toda a sua aplicação para diferentes necessidades.
-   **Validação Integrada**: Validação poderosa e type-safe com Zod e React Hook Form.
-   **Componentes Modernos**: UI elegante e acessível fornecida pela biblioteca Shadcn UI.
-   **Type-Safe**: Escrito inteiramente em TypeScript para garantir segurança de tipos e autocompletion.
-   **Suporte a Diversos Campos**: Suporte nativo para `input`, `number`, `select`, `range`, `switch`, `checkbox` e `textarea`.
-   **Fácil de Estender**: Adicionar novos tipos de campo personalizados é simples e direto.

## 🚀 Tecnologias Utilizadas

-   [Next.js](https://nextjs.org/)
-   [React](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Shadcn UI](https://ui.shadcn.com/)
-   [React Hook Form](https://react-hook-form.com/)
-   [Zod](https://zod.dev/)

## 🏁 Como Começar

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
-   `npm`, `yarn` ou `pnpm` como gerenciador de pacotes.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o formulário de exemplo em ação.

## 🛠️ Como Usar o Componente `DynamicForm`

Para usar o gerador de formulários em seu próprio projeto, siga estes passos:

### Passo 1: Adicione o Componente e Dependências

1.  Copie o arquivo `src/components/ui/dynamic-form.tsx` para o seu projeto.
2.  Certifique-se de que você tem as dependências necessárias instaladas:
    ```bash
    npm install react-hook-form zod @hookform/resolvers
    ```
3.  Instale os componentes Shadcn UI que o `DynamicForm` utiliza:
    ```bash
    npx shadcn-ui@latest add form button input select slider switch checkbox textarea label
    ```

### Passo 2: Defina o Esquema de Validação com Zod

Em seu componente de página (ex: `src/app/my-form/page.tsx`), defina a estrutura e as regras de validação dos seus dados usando Zod.

```tsx
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
  age: z.number().min(18, "Você precisa ser maior de idade."),
  department: z.string().nonempty("Por favor, selecione um departamento."),
  terms: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos.",
  }),
});
```

### Passo 3: Crie o Array de Configuração dos Campos

Este array informa ao `DynamicForm` quais campos renderizar. A ordem no array define a ordem no formulário.

```tsx
import { FormFieldConfig } from "@/components/ui/dynamic-form";

const formFields: FormFieldConfig[] = [
  {
    name: "fullName",
    label: "Nome Completo",
    type: "input",
    placeholder: "Ex: João da Silva",
  },
  {
    name: "email",
    label: "E-mail",
    type: "input",
    placeholder: "seu@email.com",
  },
  {
    name: "age",
    label: "Idade",
    type: "number",
  },
  {
    name: "department",
    label: "Departamento",
    type: "select",
    placeholder: "Selecione uma opção",
    options: [
      { value: "hr", label: "Recursos Humanos" },
      { value: "engineering", label: "Engenharia" },
    ],
  },
  {
    name: "terms",
    label: "Eu aceito os termos e condições",
    type: "checkbox",
  },
];
```

### Passo 4: Renderize o Componente `DynamicForm`

Finalmente, importe e renderize o componente, passando as props necessárias.

```tsx
"use client";

import { DynamicForm, FormFieldConfig } from "@/components/ui/dynamic-form";
import { z } from "zod";

export default function MyFormPage() {
  
  // (Cole os snippets formSchema e formFields aqui)

  const defaultValues = {
    fullName: "",
    email: "",
    age: 18,
    department: "",
    terms: false,
  };

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    // Lógica de submissão (ex: chamada de API)
    console.log("Dados do formulário:", values);
    alert("Formulário enviado com sucesso!");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Meu Novo Formulário</h1>
      <DynamicForm
        formSchema={formSchema}
        formFields={formFields}
        onSubmit={handleFormSubmit}
        defaultValues={defaultValues}
        submitButtonText="Finalizar"
      />
    </div>
  );
}
```

## 🎨 Customização e Extensão

É fácil adicionar um novo tipo de campo. Por exemplo, para adicionar um `DatePicker`:

1.  **Instale o componente**: `npx shadcn-ui@latest add popover calendar`.
2.  **Atualize o tipo `FormFieldConfig`**: Em `dynamic-form.tsx`, adicione `'date'` à união de tipos `type`.
    ```ts
    export interface FormFieldConfig {
      type: "input" | "number" | /* ... */ | "date";
      // ...
    }
    ```
3.  **Adicione um novo `case`**: No `switch` dentro de `dynamic-form.tsx`, adicione a lógica para renderizar o `DatePicker`.
    ```tsx
    // ... dentro do switch
    case "date":
      return (
        // Lógica de renderização para o seu DatePicker
      );
    ```

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Feito com ❤️ por [Seu Nome](https://github.com/seu-usuario).