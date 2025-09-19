
import React from 'react';
import { CodeBlock } from './DocComponents';

const EdgeFunctionsOverviewDoc: React.FC = () => {
    const code = `import { serve } from 'https://deno.land/std/http/server.ts'

serve(async (req) => {
  return new Response(
    \`Olá de uma Edge Function!\`,
    { headers: { "Content-Type": "text/plain" } },
  )
})`;

    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Visão Geral das Edge Functions</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">Edge Functions são códigos serverless que rodam perto dos seus usuários, distribuídos globalmente. Elas são ideais para tarefas de baixa latência, como webhooks, processamento de pagamentos ou chamadas a APIs de terceiros.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Runtime Deno</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">As Edge Functions da Pitchutcha são executadas no runtime do Deno, que é construído com segurança em mente e tem suporte de primeira classe para TypeScript.</p>
            <CodeBlock language="typescript" code={code} />
        </>
    );
};

export default EdgeFunctionsOverviewDoc;
