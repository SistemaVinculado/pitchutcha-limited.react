import React from 'react';
import { CodeBlock } from './DocComponents';

const ProjectSetupDoc: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Configuração do Projeto</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">Começar com a Pitchutcha é simples. Você pode iniciar um novo projeto a partir do nosso painel de controle ou usando a CLI.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Usando a CLI da Pitchutcha</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">A Command Line Interface (CLI) da Pitchutcha é a ferramenta para gerenciar seu projeto localmente. Instale-a para começar:</p>
            <CodeBlock language="bash" code="npm i -g pitchutcha" />
            <p className="text-zinc-300 leading-relaxed mb-4">Depois de instalada, você pode inicializar seu projeto:</p>
            <CodeBlock language="bash" code="pitchutcha init" />
            <p className="text-zinc-300 leading-relaxed mb-4">Isso criará uma nova pasta `pitchutcha/` em seu projeto com todos os arquivos de configuração necessários.</p>
        </>
    );
};

export default ProjectSetupDoc;
