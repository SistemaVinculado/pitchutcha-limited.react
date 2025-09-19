
import React from 'react';
import { CodeBlock, Callout } from './DocComponents';

const QuickstartGuideDoc: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 pb-2 border-b border-zinc-800">Guia de Início Rápido</h1>
            <p className="text-zinc-300 leading-relaxed mb-4">Siga este guia para configurar seu primeiro projeto Pitchutcha e fazer uma consulta ao banco de dados em menos de 5 minutos.</p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">1. Crie seu Projeto</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Primeiro, navegue até o <a href="#" className="text-green-400 hover:underline">painel da Pitchutcha</a> e crie um novo projeto. Você pode escolher um plano gratuito, que é mais que suficiente para começar.</p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">2. Obtenha suas Chaves de API</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Após a criação do projeto, vá para as configurações de API para encontrar suas credenciais. Você precisará de duas coisas:</p>
            <ul className="list-disc pl-6 space-y-2 my-4 text-zinc-300">
                <li><b>URL do Projeto:</b> O endpoint exclusivo para a API do seu projeto.</li>
                <li><b>Chave Pública (anon key):</b> Uma chave segura para o cliente que pode ser exposta em um navegador.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">3. Instale a Biblioteca Cliente</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">A maneira mais fácil de interagir com a Pitchutcha é usando nossa biblioteca cliente JavaScript.</p>
            <CodeBlock language="bash" code="npm install @pitchutcha/pitchutcha-js" />
            
            <Callout type="info">
                <p>Para animações e rolagem suave, você também pode instalar <strong>GSAP</strong>, <strong>Framer Motion</strong> e <strong>Lenis</strong>: <br/><code className="text-xs">npm install gsap framer-motion lenis</code></p>
            </Callout>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-24">4. Conecte-se e Consulte Dados</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Agora, em seu aplicativo, crie um cliente Pitchutcha e faça sua primeira consulta. Crie uma tabela chamada `paises` no editor de SQL do painel para que este exemplo funcione.</p>
            <CodeBlock language="typescript" code={
`import { createClient } from '@pitchutcha/pitchutcha-js'

// Substitua com suas credenciais
const pitchutchaUrl = 'https://[SEU-ID-DE-PROJETO].pitchutcha.co'
const pitchutchaKey = 'SUA_CHAVE_ANON'

// Crie o cliente
const pitchutcha = createClient(pitchutchaUrl, pitchutchaKey)

// Consulte os dados
async function getPaises() {
  const { data, error } = await pitchutcha
    .from('paises')
    .select()
  console.log(data)
}

getPaises()`
            } />
            <p className="text-zinc-300 leading-relaxed mt-4">
                E é isso! Você configurou com sucesso um projeto Pitchutcha e fez sua primeira consulta. Explore o resto da documentação para aprender sobre autenticação, armazenamento e muito mais.
            </p>
        </>
    );
};

export default QuickstartGuideDoc;
