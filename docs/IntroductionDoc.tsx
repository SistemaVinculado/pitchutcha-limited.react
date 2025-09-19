import React from 'react';
import { Callout } from './DocComponents';

const IntroductionDoc: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Introdução</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">Bem-vindo à documentação da Pitchutcha. Aqui você encontrará guias abrangentes e documentação para ajudá-lo a começar a usar a Pitchutcha o mais rápido possível, bem como suporte para solucionar problemas comuns.</p>
            
            <Callout type="tip">
                <p>Esta página de demonstração foi construída com um stack de frontend moderno, incluindo <strong>Tailwind CSS</strong>, <strong>Framer Motion</strong> para micro-interações, <strong>GSAP + ScrollTrigger</strong> para animações de rolagem, e <strong>Lenis</strong> para uma rolagem suave e fluida.</p>
            </Callout>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">O que é Pitchutcha?</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Pitchutcha é uma alternativa de código aberto ao Firebase. Estamos construindo as funcionalidades do Firebase usando ferramentas de código aberto de nível empresarial.</p>
            <ul className="list-disc pl-6 space-y-2 my-4 text-zinc-300">
                <li><strong>Banco de Dados Postgres:</strong> Cada projeto vem com um banco de dados Postgres completo.</li>
                <li><strong>Autenticação:</strong> Adicione facilmente login com e-mail, OAuth e mais.</li>
                <li><strong>Storage:</strong> Armazene arquivos grandes como imagens e vídeos.</li>
                <li><strong>Edge Functions:</strong> Escreva e implante código serverless perto de seus usuários.</li>
                <li><strong>Realtime:</strong> Ouça alterações no banco de dados em tempo real.</li>
                <li><strong>Vector:</strong> Crie aplicações de IA com embeddings e busca por similaridade.</li>
            </ul>
        </>
    );
};

export default IntroductionDoc;