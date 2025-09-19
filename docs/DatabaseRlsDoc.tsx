
import React from 'react';
import { CodeBlock } from './DocComponents';

const DatabaseRlsDoc: React.FC = () => {
    const rlsCode = `-- 1. Habilite RLS na tabela 'perfis'
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;

-- 2. Crie uma política para permitir que usuários leiam seu próprio perfil
CREATE POLICY "Usuários podem ver seu próprio perfil."
ON perfis FOR SELECT
USING ( auth.uid() = id );

-- 3. Permita que usuários atualizem seus próprios perfis
CREATE POLICY "Usuários podem atualizar seu próprio perfil."
ON perfis FOR UPDATE
USING ( auth.uid() = id );`;

    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Segurança em Nível de Linha</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">A Segurança em Nível de Linha (RLS) é uma funcionalidade do PostgreSQL que permite controlar o acesso de leitura e escrita a linhas específicas em uma tabela. É uma ferramenta de segurança poderosa que se integra perfeitamente com a Pitchutcha Auth.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Exemplo: Perfis de Usuário</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Vamos supor uma tabela `perfis` onde cada usuário só pode ver e editar seu próprio perfil.</p>
            <CodeBlock language="sql" code={rlsCode} />
        </>
    );
};

export default DatabaseRlsDoc;
