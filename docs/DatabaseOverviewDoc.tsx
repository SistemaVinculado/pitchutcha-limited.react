import React from 'react';
import { CodeBlock, Callout } from './DocComponents';

const DatabaseOverviewDoc: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Visão Geral do Banco de Dados</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">Cada projeto Pitchutcha vem com seu próprio banco de dados PostgreSQL dedicado. Você obtém acesso total ao banco de dados e pode usar o Postgres como faria com qualquer outra aplicação.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Conectando-se ao seu Banco de Dados</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Você pode encontrar os detalhes de conexão do seu banco de dados no painel do seu projeto, em `Configurações > Banco de Dados`.</p>
            <Callout type="tip">
                <p>Recomendamos sempre se conectar usando o Pool de Conexões em modo de transação para produção, pois ele limita o número de conexões ativas ao seu banco de dados.</p>
            </Callout>
            <CodeBlock language="sql" code="postgres://postgres:[SUA-SENHA]@[ID-DO-PROJETO].db.pitchutcha.com:6543/postgres?pgbouncer=true" />
        </>
    );
};

export default DatabaseOverviewDoc;