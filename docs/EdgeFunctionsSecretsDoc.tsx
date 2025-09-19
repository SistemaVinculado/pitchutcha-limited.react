import React from 'react';
import { CodeBlock } from './DocComponents';

const EdgeFunctionsSecretsDoc: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Segredos e Variáveis de Ambiente</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">É uma prática recomendada nunca armazenar segredos (como chaves de API) diretamente no seu código. A Pitchutcha permite que você defina segredos que são injetados de forma segura como variáveis de ambiente em suas Edge Functions.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Definindo Segredos</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Use a CLI da Pitchutcha para definir um segredo:</p>
            <CodeBlock language="bash" code="pitchutcha secrets set MINHA_CHAVE_API=valor_super_secreto" />
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Acessando Segredos</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Você pode então acessar este segredo em sua função usando `Deno.env.get()`:</p>
            <CodeBlock language="typescript" code={`const apiKey = Deno.env.get('MINHA_CHAVE_API')`} />
        </>
    );
};

export default EdgeFunctionsSecretsDoc;
