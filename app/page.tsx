import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'; // Import Card components
import { buttonVariants } from '@/components/ui/button'; // Import buttonVariants for styling links
import { cn } from '@/lib/utils'; // Import cn for conditional class names

const items = [
  {
    label: 'Formulário',
    href: '/form',
    description:
      'Preencha e envie dados através do nosso formulário interativo.',
  },
  {
    label: 'Tabela',
    href: '/table',
    description: 'Visualize e gerencie dados em formato de tabela.',
  },
];

const Page = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-primary">
        Bem-vindo! Selecione uma opção
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {items.map((item) => (
          <Card
            key={item.href}
            className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="mb-2 text-2xl font-semibold">
                {item.label}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {item.description}
              </CardDescription>
            </CardHeader>
            <div className="p-6 pt-0">
              {' '}
              {/* Padding for the link/button */}
              <Link
                href={item.href}
                className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
              >
                Acessar {item.label}
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
