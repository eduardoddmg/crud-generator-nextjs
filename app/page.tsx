import Link from 'next/link';

const items = [
  { label: 'Formulário', href: '/form' },
  { label: 'Tabela', href: '/table' },
];

const Page = () => {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <h1>Página de Exemplo</h1>
      <p>Este é um exemplo de página.</p>
    </div>
  );
};

export default Page;
