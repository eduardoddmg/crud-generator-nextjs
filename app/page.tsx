// src/app/page.tsx

"use client";

import { z } from "zod";
import { DynamicForm, FormFieldConfig } from "@/components/ui/dynamic-form";

export default function HomePage() {
  // 1. Defina o esquema de validação com Zod
  const formSchema = z.object({
    fullName: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    email: z.string().email("Por favor, insira um e-mail válido."),
    age: z.number().min(18, "Você deve ser maior de idade.").max(100),
    department: z.string().min(1, "Selecione um departamento."),
    bio: z.string().max(200, "A biografia não pode exceder 200 caracteres.").optional(),
    notifications: z.boolean().default(false),
    terms: z.boolean().refine((val) => val === true, {
      message: "Você deve aceitar os termos e condições.",
    }),
    satisfaction: z.number().min(0).max(100).default(50),
  });

  // 2. Defina a configuração dos campos do formulário
  const formFields: FormFieldConfig[] = [
    {
      name: "fullName",
      label: "Nome Completo",
      type: "input",
      placeholder: "Seu nome aqui...",
    },
    {
      name: "email",
      label: "E-mail",
      type: "input",
      placeholder: "exemplo@dominio.com",
    },
    {
      name: "age",
      label: "Idade",
      type: "number",
      placeholder: "Sua idade",
    },
    {
      name: "department",
      label: "Departamento",
      type: "select",
      placeholder: "Selecione uma opção",
      options: [
        { value: "hr", label: "Recursos Humanos" },
        { value: "engineering", label: "Engenharia" },
        { value: "marketing", label: "Marketing" },
        { value: "sales", label: "Vendas" },
      ],
    },
    {
      name: "bio",
      label: "Biografia",
      type: "textarea",
      placeholder: "Fale um pouco sobre você...",
    },
    {
        name: "satisfaction",
        label: "Nível de Satisfação",
        type: "range",
        description: "Deslize para indicar sua satisfação."
    },
    {
      name: "notifications",
      label: "Receber notificações por e-mail",
      type: "switch",
      description: "Marque para receber novidades."
    },
    {
      name: "terms",
      label: "Eu aceito os termos e condições", // Label usado pelo Checkbox internamente
      type: "checkbox",
      description: "Para continuar, você precisa concordar.",
    },
  ];

  // 3. Defina os valores padrão (podem vir de uma API, por exemplo)
  const defaultValues = {
    fullName: "",
    email: "",
    age: 18,
    department: "",
    bio: "",
    notifications: false,
    terms: false,
    satisfaction: 50,
  };

  // 4. Crie a função para lidar com o envio do formulário
  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    console.log("DADOS DO FORMULÁRIO:", values);
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