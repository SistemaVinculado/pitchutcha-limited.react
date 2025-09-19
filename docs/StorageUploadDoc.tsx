
import React from 'react';
import { CodeBlock } from './DocComponents';

const StorageUploadDoc: React.FC = () => {
    const code = `async function uploadFile(event) {
  const file = event.target.files[0]

  const { data, error } = await pitchutcha.storage
    .from('avatares')
    .upload(\`public/\${file.name}\`, file)

  if (error) {
    // Lidar com o erro
  } else {
    // Lidar com o sucesso
  }
}`;

    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Upload de Arquivos</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">Você pode fazer upload de arquivos usando a biblioteca cliente \`pitchutcha-js\` a partir de um navegador ou de um ambiente de servidor.</p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Upload no Navegador</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">O exemplo a seguir mostra como fazer upload de um arquivo a partir de um input HTML.</p>
            <CodeBlock language="javascript" code={code} />
        </>
    );
};

export default StorageUploadDoc;
