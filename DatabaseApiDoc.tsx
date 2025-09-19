import React from 'react';
import { CodeBlock } from './DocComponents';

const DatabaseApiDoc: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Uso da API do Banco de Dados</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">A Pitchutcha gera uma API RESTful instantaneamente a partir do seu esquema de banco de dados. Você pode interagir com seu banco de dados através de requisições HTTP a partir de qualquer cliente.</p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Lendo Dados (GET)</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Para buscar dados de uma tabela, faça uma requisição GET para o endpoint da tabela. A segurança em nível de linha é aplicada automaticamente.</p>
            <CodeBlock language="javascript" code={`fetch('https://[ID-DO-PROJETO].pitchutcha.co/rest/v1/paises?select=*', {\n  headers: {\n    apikey: SUA_CHAVE_PUBLICA,\n    Authorization: 'Bearer ' + SEU_JWT\n  }\n})`} />
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Inserindo Dados (POST)</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Para inserir uma nova linha, faça uma requisição POST com um corpo JSON.</p>
            <CodeBlock language="javascript" code={`fetch('https://[ID-DO-PROJETO].pitchutcha.co/rest/v1/paises', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json',\n    apikey: SUA_CHAVE_PUBLICA,\n    Authorization: 'Bearer ' + SEU_JWT\n  },\n  body: JSON.stringify({ name: 'Japão', capital: 'Tóquio' })\n})`} />

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Atualizando Dados (PATCH)</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Para atualizar uma ou mais linhas, use o método PATCH. Você pode usar filtros de consulta para especificar quais linhas devem ser atualizadas.</p>
            <CodeBlock language="javascript" code={`// Atualiza a capital do país com nome 'Japão'\nfetch('https://[ID-DO-PROJETO].pitchutcha.co/rest/v1/paises?name=eq.Japão', {\n  method: 'PATCH',\n  headers: {\n    'Content-Type': 'application/json',\n    apikey: SUA_CHAVE_PUBLICA,\n    Authorization: 'Bearer ' + SEU_JWT\n  },\n  body: JSON.stringify({ capital: 'Tokyo' })\n})`} />

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">Deletando Dados (DELETE)</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Para deletar linhas, use o método DELETE com filtros de consulta para especificar o alvo.</p>
            <CodeBlock language="javascript" code={`// Deleta o país com nome 'Japão'\nfetch('https://[ID-DO-PROJETO].pitchutcha.co/rest/v1/paises?name=eq.Japão', {\n  method: 'DELETE',\n  headers: {\n    apikey: SUA_CHAVE_PUBLICA,\n    Authorization: 'Bearer ' + SEU_JWT\n  }\n})`} />
        </>
    );
};

export default DatabaseApiDoc;