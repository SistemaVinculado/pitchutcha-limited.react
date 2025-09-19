
import React from 'react';
import { CodeBlock } from './DocComponents';

const RealtimeOverviewDoc: React.FC = () => {
    const code = `const canal = pitchutcha.channel('mensagens_publicas')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'mensagens' },
    (payload) => {
      console.log('Mudança recebida!', payload)
    }
  )
  .subscribe()`;

    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Visão Geral do Realtime</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">A API de Realtime da Pitchutcha permite que você ouça alterações no seu banco de dados PostgreSQL em tempo real usando websockets. Você pode ouvir inserções, atualizações, exclusões e transmitir mensagens para clientes conectados.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Inscrevendo-se em Alterações</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">O exemplo a seguir se inscreve em todas as alterações na tabela \`mensagens\`.</p>
            <CodeBlock language="javascript" code={code} />
        </>
    );
};

export default RealtimeOverviewDoc;
