
import React from 'react';
import { CodeBlock } from './DocComponents';

const AuthProvidersDoc: React.FC = () => {
    const code = `async function signInWithGoogle() {
  const { data, error } = await pitchutcha.auth.signInWithOAuth({
    provider: 'google'
  })
}`;

    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Provedores OAuth</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">Adicione login com um clique para provedores populares como Google, GitHub, Apple e muitos outros. Você pode habilitar os provedores e configurar suas credenciais no painel de controle da Pitchutcha.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Login com Google</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Uma vez que o provedor Google esteja habilitado em seu projeto, você pode usar o método \`signInWithOAuth\` para iniciar o fluxo de login.</p>
            <CodeBlock language="javascript" code={code} />
        </>
    );
};

export default AuthProvidersDoc;
