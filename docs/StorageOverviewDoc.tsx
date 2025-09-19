import React from 'react';

const StorageOverviewDoc: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Visão Geral do Storage</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">Pitchutcha Storage torna simples o armazenamento e o serviço de arquivos grandes, como fotos e vídeos. Os arquivos são organizados em "buckets", que funcionam como pastas.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Controle de Acesso</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Você pode definir políticas de segurança detalhadas em seus buckets de storage usando SQL, semelhante à Segurança em Nível de Linha do banco de dados. Isso permite, por exemplo, que um usuário possa ver apenas suas próprias fotos.</p>
        </>
    );
};

export default StorageOverviewDoc;
