
import React from 'react';
import { CodeBlock } from './DocComponents';

const JsClientLibDoc: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Biblioteca Cliente JS</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">A biblioteca <code className="bg-zinc-700 text-xs px-1 py-0.5 rounded">@pitchutcha/pitchutcha-js</code> é a maneira mais fácil de interagir com sua Pitchutcha a partir de um projeto JavaScript ou TypeScript. Ela fornece uma interface fluente e conveniente sobre a API REST subjacente.</p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Instalação</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Você pode instalar a biblioteca usando seu gerenciador de pacotes preferido:</p>
            <CodeBlock language="bash" code="npm install @pitchutcha/pitchutcha-js" />

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Inicialização</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Para começar, crie uma instância do cliente. Você precisará da URL e da chave `anon` do seu projeto, que podem ser encontradas no painel de controle em `Configurações > API`.</p>
            <CodeBlock language="typescript" code={
`import { createClient } from '@pitchutcha/pitchutcha-js'

const pitchutchaUrl = 'https://[SEU-ID-DE-PROJETO].pitchutcha.co'
const pitchutchaKey = 'SUA_CHAVE_ANON'
const pitchutcha = createClient(pitchutchaUrl, pitchutchaKey)`
            } />

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Consultando Dados</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Use os métodos `from()` e `select()` para buscar dados.</p>
            <CodeBlock language="typescript" code={
`async function getPaises() {
  const { data, error } = await pitchutcha
    .from('paises')
    .select()
    
  if (error) console.error('Erro:', error)
  else console.log('Dados:', data)
}

getPaises()`
            } />
            <p className="text-zinc-300 leading-relaxed mt-4">Você também pode filtrar os resultados com modificadores como `eq` (igual a) e `gt` (maior que).</p>
            <CodeBlock language="typescript" code={
`const { data, error } = await pitchutcha
  .from('paises')
  .select('name, capital') // Seleciona colunas específicas
  .eq('name', 'Brasil')    // Onde o nome é igual a 'Brasil'`
            } />

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Inserindo Dados</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Use o método `insert()` para adicionar novas linhas.</p>
            <CodeBlock language="typescript" code={
`const { data, error } = await pitchutcha
  .from('paises')
  .insert([
    { name: 'Brasil', capital: 'Brasília' },
  ])`
            } />

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Atualizando Dados</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Use `update()` em conjunto com um filtro para modificar linhas existentes.</p>
            <CodeBlock language="typescript" code={
`const { data, error } = await pitchutcha
  .from('paises')
  .update({ capital: 'Brasilia' }) // Corrigindo o nome
  .eq('name', 'Brasil')`
            } />

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Deletando Dados</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Use `delete()` com um filtro para remover linhas.</p>
            <CodeBlock language="typescript" code={
`const { data, error } = await pitchutcha
  .from('paises')
  .delete()
  .eq('name', 'Brasil')`
            } />
        </>
    );
};

export default JsClientLibDoc;
