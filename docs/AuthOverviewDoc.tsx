
import React from 'react';
import { CodeBlock } from './DocComponents';

const AuthOverviewDoc: React.FC = () => {
    const code = `import { createClient } from '@pitchutcha/pitchutcha-js'

const pitchutcha = createClient(projectUrl, projectKey)

// Cadastrar um novo usuário
const { data, error } = await pitchutcha.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})`;

    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Visão Geral da Autenticação</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">Pitchutcha Auth facilita a adição de login e gerenciamento de usuários à sua aplicação. Ele se integra perfeitamente com o Banco de Dados da Pitchutcha através da Segurança em Nível de Linha (RLS) do Postgres.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Login com E-mail e Senha</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">A forma mais comum de autenticação. Os usuários podem se inscrever e fazer login usando seu endereço de e-mail e uma senha.</p>
            <CodeBlock language="javascript" code={code} />
        </>
    );
};

export default AuthOverviewDoc;
