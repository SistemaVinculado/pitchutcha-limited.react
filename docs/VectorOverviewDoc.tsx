
import React from 'react';
import { CodeBlock } from './DocComponents';

const VectorOverviewDoc: React.FC = () => {
    const code = `// \`query_embedding\` é o vetor do texto da sua pergunta
const { data, error } = await pitchutcha.rpc('match_documents', {
  query_embedding: embedding,
  match_threshold: 0.78,
  match_count: 10,
})`;

    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Visão Geral do Vector</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">Construa aplicações de IA com a Pitchutcha. Usando a extensão \`pg_vector\`, você pode armazenar embeddings e realizar buscas por similaridade de vetores diretamente no seu banco de dados Postgres.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">O que são Embeddings?</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Embeddings são representações numéricas (vetores) de dados como texto, imagens ou áudio. Dados que são conceitualmente semelhantes terão vetores que estão próximos um do outro.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Busca por Similaridade</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Uma vez que você tenha embeddings armazenados em seu banco de dados, pode encontrar os itens mais semelhantes a uma consulta. Por exemplo, "encontrar todos os documentos semelhantes a 'o que é postgres?'".</p>
            <CodeBlock language="javascript" code={code} />
        </>
    );
};

export default VectorOverviewDoc;
