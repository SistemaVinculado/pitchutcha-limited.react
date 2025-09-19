import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
    CodeIcon, AuthIcon, RealtimeIcon, RocketLaunchIcon, SparklesIcon,
    ArrowRightIcon, PostgresqlLogo, TableCellsIcon, CodeBracketSquareIcon,
    FirebaseLogo, PitchutchaLogo, HerokuLogo, ShieldCheckIcon, PgCronIcon,
    PgGraphqlIcon, ServerStackIcon, MagnifyingGlassPlusIcon
} from './constants';
import { AnimatedSection, ExtensionsSection, CTASection } from './shared';

gsap.registerPlugin(TextPlugin);

const databaseCodeAnimationCommands = [
    'CREATE TABLE users (...);',
    '✔ Tabela "users" criada.',
    "INSERT INTO users VALUES ('...');",
    '✔ 1 linha inserida.',
    '-- APIs instantâneas geradas',
    "GET /rest/v1/users?select=*",
    '✔ Acesso seguro via API.',
];

const DatabaseCodeAnimation: React.FC = () => {
    const outputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const outputEl = outputRef.current;
        if (!outputEl) return;
        
        const ctx = gsap.context(() => {
             const tl = gsap.timeline({
                repeat: -1,
                repeatDelay: 3,
                onRepeat: () => {
                    outputEl.innerHTML = '';
                    const line = document.createElement('div');
                    line.className = 'flex items-center';
                    line.innerHTML = `<span class="text-zinc-500 mr-2">></span><span id="current-db-command"></span><span class="h-4 w-2 bg-green-400 animate-blink ml-1"></span>`;
                    outputEl.appendChild(line);
                }
            });

            tl.call(tl.vars.onRepeat);

            databaseCodeAnimationCommands.forEach(command => {
                 if (command.startsWith('✔')) {
                     tl.call(() => {
                        const line = document.createElement('div');
                        line.className = 'flex items-center';
                        line.innerHTML = `<span class="mr-2 text-green-400"></span><span class="text-green-400">${command}</span>`;
                        outputEl.insertBefore(line, outputEl.lastChild);
                     }).to({}, {duration: 0.3});
                 } else if (command.startsWith('--')) {
                     tl.call(() => {
                        const line = document.createElement('div');
                        line.className = 'flex items-center';
                        line.innerHTML = `<span class="mr-2 text-gray-500">></span><span class="text-gray-500">${command}</span>`;
                        outputEl.insertBefore(line, outputEl.lastChild);
                     }).to({}, {duration: 0.3});
                 } else {
                     tl.to("#current-db-command", {
                        duration: command.length * 0.08,
                        text: command,
                        ease: 'none'
                    }, '+=0.5').call(() => {
                        const line = document.createElement('div');
                        line.className = 'flex items-center';
                        line.innerHTML = `<span class="text-zinc-500 mr-2">></span><span>${command}</span>`;
                        outputEl.insertBefore(line, outputEl.lastChild);
                        gsap.set("#current-db-command", { text: '' });
                    });
                 }
            });

        }, outputRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-[#1c1c1c] rounded-lg border border-zinc-700/50 overflow-hidden shadow-2xl shadow-green-500/10 font-mono text-sm min-h-[300px]">
            <div className="p-2.5 bg-zinc-800/50 border-b border-zinc-700/50 flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
             <div className="p-4" ref={outputRef}>
            </div>
        </div>
    );
};

const DatabaseShowcase: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'table' | 'sql'>('table');

    const tableData = [
        { id: '8f4..', name: 'Ada Lovelace', email: 'ada@example.com', created_at: '2023-10-26T10:00:00Z' },
        { id: '3a1..', name: 'Grace Hopper', email: 'grace@example.com', created_at: '2023-10-26T10:01:00Z' },
        { id: '9c2..', name: 'Margaret Hamilton', email: 'margaret@example.com', created_at: '2023-10-26T10:02:00Z' },
    ];
    
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Interface poderosa e intuitiva</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Gerencie seus dados com nosso editor de tabelas amigável ou mergulhe fundo com o editor de SQL completo. Tudo que você precisa, em um só lugar.
                    </p>
                </AnimatedSection>
                <AnimatedSection className="mt-12 max-w-5xl mx-auto">
                    <div className="bg-[#1c1c1c] rounded-lg border border-zinc-700/50 shadow-2xl shadow-green-500/10">
                        <div className="p-2 border-b border-zinc-700/50 flex items-center">
                            <div className="flex space-x-2">
                                <button onClick={() => setActiveTab('table')} className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'table' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}>
                                    <TableCellsIcon className="h-4 w-4" />
                                    <span>Tabela 'users'</span>
                                </button>
                                <button onClick={() => setActiveTab('sql')} className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'sql' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}>
                                    <CodeBracketSquareIcon className="h-4 w-4" />
                                    <span>Editor de SQL</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-4 min-h-[300px]">
                            {activeTab === 'table' ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-zinc-700 text-zinc-400">
                                                <th className="p-2 font-medium">id (uuid)</th>
                                                <th className="p-2 font-medium">name (text)</th>
                                                <th className="p-2 font-medium">email (text)</th>
                                                <th className="p-2 font-medium">created_at (timestamptz)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-800">
                                            {tableData.map(row => (
                                                <tr key={row.id} className="hover:bg-zinc-800/50">
                                                    <td className="p-2 font-mono text-green-400">{row.id}</td>
                                                    <td className="p-2">{row.name}</td>
                                                    <td className="p-2">{row.email}</td>
                                                    <td className="p-2">{row.created_at}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="font-mono text-zinc-300 whitespace-pre-wrap">
                                    <span className="text-purple-400">SELECT</span> id, name, email<br/>
                                    <span className="text-purple-400">FROM</span> <span className="text-cyan-400">public.users</span><br/>
                                    <span className="text-purple-400">ORDER BY</span> created_at <span className="text-yellow-400">DESC</span><br/>
                                    <span className="text-purple-400">LIMIT</span> 100;
                                </div>
                            )}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}

const RlsSection: React.FC = () => {
    const rlsCode = `-- 1. Habilite RLS na tabela 'perfis'
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;

-- 2. Permita que usuários leiam seus próprios perfis
CREATE POLICY "Usuários podem ver seu próprio perfil."
ON perfis FOR SELECT
USING ( auth.uid() = id );

-- 3. Permita que usuários atualizem seus próprios perfis
CREATE POLICY "Usuários podem atualizar seu próprio perfil."
ON perfis FOR UPDATE
USING ( auth.uid() = id );`;

    return (
        <section className="py-20 bg-[#1c1c1c] border-y border-zinc-800">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto">
                    <ShieldCheckIcon className="h-12 w-12 text-green-400 mx-auto" />
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">Segurança em Nível de Linha</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        O RLS do PostgreSQL permite que você controle exatamente quais linhas os usuários podem acessar ou modificar. É o alicerce da segurança de dados na Pitchutcha, integrando-se perfeitamente com a Autenticação.
                    </p>
                </AnimatedSection>

                <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
                    <AnimatedSection>
                        <h3 className="text-2xl font-bold">Defina Políticas com SQL Simples</h3>
                        <p className="mt-2 text-zinc-400">
                            Escreva políticas de segurança como declarações SQL declarativas. Elas são poderosas, flexíveis e fáceis de auditar. A Pitchutcha aplica essas políticas automaticamente para cada requisição à API.
                        </p>
                        <div className="mt-6 bg-[#111] rounded-lg border border-zinc-700/50 overflow-hidden shadow-lg">
                            <div className="p-3 bg-zinc-800/50 border-b border-zinc-700/50 flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="p-4 font-mono text-sm">
                                <pre className="whitespace-pre-wrap">
                                    <code>{rlsCode}</code>
                                </pre>
                            </div>
                        </div>
                    </AnimatedSection>
                     <AnimatedSection delay={200}>
                        <h3 className="text-2xl font-bold">Veja a Mágica Acontecer</h3>
                        <p className="mt-2 text-zinc-400">
                           A política restringe a consulta <code className="bg-zinc-700 text-xs px-1 py-0.5 rounded">SELECT * FROM perfis;</code> para retornar apenas as linhas que o usuário autenticado tem permissão para ver.
                        </p>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h4 className="font-semibold text-white">Consulta como Administrador (RLS desabilitada)</h4>
                                <div className="mt-2 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm font-mono">
                                    <p className="text-zinc-300">&gt; SELECT * FROM perfis;</p>
                                    <div className="mt-2 text-green-400">
                                        <p>id: user-1 | nome: Alice</p>
                                        <p>id: user-2 | nome: Bob</p>
                                        <p>id: user-3 | nome: Charlie</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">Consulta como 'Alice' (auth.uid() = 'user-1')</h4>
                                <div className="mt-2 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm font-mono">
                                    <p className="text-zinc-300">&gt; SELECT * FROM perfis;</p>
                                    <div className="mt-2 text-green-400">
                                        <p>id: user-1 | nome: Alice</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

const BackupSection: React.FC = () => (
    <section className="py-20">
        <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Segurança e Tranquilidade</h2>
                <p className="mt-4 text-lg text-zinc-400">
                    Seus dados estão seguros. Gerenciamos backups e a integridade do seu banco de dados para que você possa focar no desenvolvimento.
                </p>
            </AnimatedSection>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <AnimatedSection>
                    <div className="p-8 bg-[#1c1c1c] border border-zinc-800 rounded-lg h-full">
                        <div className="flex items-center space-x-3">
                            <ShieldCheckIcon className="h-7 w-7 text-green-400" />
                            <h3 className="text-xl font-semibold">Backups Diários Automatizados</h3>
                        </div>
                        <p className="mt-3 text-zinc-400">
                            Nunca se preocupe em perder dados. A Pitchutcha realiza backups diários de todo o seu banco de dados PostgreSQL, que são mantidos por um período mínimo de 7 dias nos planos Pro.
                        </p>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay={100}>
                    <div className="p-8 bg-[#1c1c1c] border border-zinc-800 rounded-lg h-full">
                        <div className="flex items-center space-x-3">
                            <PgCronIcon className="h-7 w-7 text-green-400" />
                            <h3 className="text-xl font-semibold">Recuperação Point-in-Time (PITR)</h3>
                        </div>
                        <p className="mt-3 text-zinc-400">
                           Com o PITR, você pode restaurar seu banco de dados para qualquer momento nos últimos dias (disponível no plano Pro), oferecendo proteção granular contra exclusões acidentais ou corrupção de dados.
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    </section>
);

const RealtimeIntegrationSection: React.FC = () => {
    const code = `// Ouça todas as novas linhas na tabela 'mensagens'
const canal = pitchutcha
  .channel('db-mensagens')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'mensagens' },
    (payload) => {
      console.log('Nova mensagem:', payload.new)
    }
  )
  .subscribe()`;

    return (
        <section className="py-20 bg-[#1c1c1c] border-y border-zinc-800">
            <div className="container mx-auto px-4">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <AnimatedSection className="lg:pr-8">
                        <div className="flex items-center space-x-3 text-green-400">
                           <RealtimeIcon className="h-8 w-8"/>
                           <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Ouça as Mudanças em Tempo Real</h2>
                        </div>
                        <p className="mt-4 text-lg text-zinc-400">
                            Transforme seu banco de dados em uma API de tempo real. Inscreva-se em qualquer inserção, atualização ou exclusão de dados e envie as alterações para os clientes conectados via WebSockets.
                        </p>
                        <div className="mt-8">
                            <a href="#" className="flex items-center text-green-400 hover:text-white transition-colors font-semibold">
                                Explorar Realtime <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </a>
                        </div>
                    </AnimatedSection>
                     <AnimatedSection>
                        <div className="bg-[#111] rounded-lg border border-zinc-700/50 overflow-hidden shadow-lg">
                            <div className="p-3 bg-zinc-800/50 border-b border-zinc-700/50 flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="p-4 font-mono text-sm">
                                <pre className="whitespace-pre-wrap">
                                    <code>{code}</code>
                                </pre>
                            </div>
                        </div>
                     </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

const GraphQLSection: React.FC = () => {
    const gqlCode = `query getUsers {
  usersCollection(first: 5) {
    edges {
      node {
        id
        name
        email
      }
    }
  }
}`;

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <AnimatedSection className="lg:pr-8">
                        <div className="flex items-center space-x-3 text-pink-400">
                           <PgGraphqlIcon className="h-8 w-8"/>
                           <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">API GraphQL Instantânea</h2>
                        </div>
                        <p className="mt-4 text-lg text-zinc-400">
                            Além da API REST, a Pitchutcha expõe uma API GraphQL segura e de alto desempenho a partir do seu esquema de banco de dados, usando a extensão <code className="bg-zinc-700 text-xs px-1 py-0.5 rounded">pg_graphql</code>.
                        </p>
                        <div className="mt-8">
                            <a href="#" className="flex items-center text-green-400 hover:text-white transition-colors font-semibold">
                                Explorar pg_graphql <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </a>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection>
                        <div className="bg-[#111] rounded-lg border border-zinc-700/50 overflow-hidden shadow-lg">
                            <div className="p-3 bg-zinc-800/50 border-b border-zinc-700/50 flex items-center justify-between">
                                <span className="font-mono text-sm text-zinc-400">Consulta GraphQL</span>
                                <PgGraphqlIcon className="h-5 w-5 text-pink-400" />
                            </div>
                            <div className="p-4 font-mono text-sm">
                                <pre className="whitespace-pre-wrap">
                                    <code>{gqlCode}</code>
                                </pre>
                            </div>
                        </div>
                     </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

const PerformanceSection: React.FC = () => {
    const performanceFeatures = [
        {
            icon: <ServerStackIcon />,
            name: "Pool de Conexões",
            description: "O PgBouncer integrado gerencia milhares de conexões, garantindo que seu banco de dados permaneça responsivo sob alta carga."
        },
        {
            icon: <MagnifyingGlassPlusIcon />,
            name: "Gerenciamento de Índices",
            description: "Crie e gerencie índices facilmente através do nosso painel para otimizar o desempenho das suas consultas mais frequentes."
        },
        {
            icon: <RocketLaunchIcon />,
            name: "Infraestrutura Escalável",
            description: "Nossa infraestrutura é projetada para escalar. Atualize seus recursos de computação com um clique para atender à sua demanda."
        },
        {
            icon: <SparklesIcon />,
            name: "Otimizador de Consultas",
            description: "Aproveite o otimizador de consultas avançado do Postgres para executar até as operações mais complexas de forma eficiente."
        }
    ];

    return (
        <section className="py-20 bg-[#1c1c1c] border-y border-zinc-800">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Desempenho Pronto para Produção</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Construído para performance e escala. Fornecemos as ferramentas para garantir que sua aplicação seja rápida, responsiva e confiável, não importa o tamanho.
                    </p>
                </AnimatedSection>

                <div className="mt-16 max-w-5xl mx-auto space-y-12">
                    {performanceFeatures.map((feature, i) => (
                        <AnimatedSection key={feature.name} delay={i * 100}>
                            <div className={`grid md:grid-cols-2 gap-8 items-center`}>
                                <div className={`p-8 ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                                     <div className="inline-block p-3 bg-green-500/10 rounded-lg mb-4">
                                        {React.cloneElement(feature.icon, { className: 'h-8 w-8 text-green-400' })}
                                    </div>
                                    <h3 className="text-2xl font-bold">{feature.name}</h3>
                                    <p className="mt-4 text-zinc-400">{feature.description}</p>
                                </div>
                                <div className={`h-48 bg-zinc-800/50 rounded-lg border border-zinc-700/50 ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                    {/* Placeholder for a visual element */}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};


const MigrationSection: React.FC = () => (
    <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <AnimatedSection className="lg:pr-8 text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Migre com facilidade</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Já usa outra plataforma? Nossos guias de migração facilitam a transferência de seus dados para a Pitchutcha, para que você possa aproveitar o poder do Postgres sem dor de cabeça.
                    </p>
                    <div className="mt-8">
                        <a href="#" className="flex items-center justify-center lg:justify-start text-green-400 hover:text-white transition-colors font-semibold">
                            Ver guias de migração <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </AnimatedSection>
                 <AnimatedSection>
                    <div className="space-y-6">
                        <div className="flex items-center justify-center p-6 bg-[#1c1c1c] border border-zinc-800 rounded-lg">
                            <FirebaseLogo className="h-10 w-10" />
                            <ArrowRightIcon className="h-6 w-6 mx-8 text-zinc-500" />
                            <PitchutchaLogo className="h-10 w-10" />
                        </div>
                        <div className="flex items-center justify-center p-6 bg-[#1c1c1c] border border-zinc-800 rounded-lg">
                            <HerokuLogo className="h-10 w-10 text-[#6567a5]" />
                            <ArrowRightIcon className="h-6 w-6 mx-8 text-zinc-500" />
                            <PitchutchaLogo className="h-10 w-10" />
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    </section>
);


const DatabasePage: React.FC = () => {
    const dbFeatures = [
        { icon: <PostgresqlLogo />, name: 'Puro PostgreSQL', description: 'Acesse todo o poder do Postgres, o banco de dados relacional mais avançado do mundo.'},
        { icon: <CodeIcon />, name: 'APIs Instantâneas', description: 'Gere APIs REST e GraphQL seguras a partir do seu esquema de banco de dados, sem escrever código.'},
        { icon: <AuthIcon />, name: 'Segurança Integrada', description: 'Proteja seus dados com Segurança em Nível de Linha (RLS) e políticas de acesso granulares.'},
        { icon: <RealtimeIcon />, name: 'Capacidades Realtime', description: 'Inscreva-se em alterações do banco de dados em tempo real via websockets, construindo aplicações reativas.'},
        { icon: <RocketLaunchIcon />, name: 'Escalabilidade e Backups', description: 'Gerencie backups, replicação e performance para escalar seu projeto sem preocupações.'},
        { icon: <SparklesIcon />, name: 'Interface Intuitiva', description: 'Um painel de controle elegante para gerenciar tabelas, dados, executar SQL e muito mais.'},
    ];

    return (
        <>
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(50,205,50,0.3),rgba(255,255,255,0))]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection className="text-center lg:text-left">
                             <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                                O Banco de Dados para Desenvolvedores
                            </h1>
                            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-zinc-400">
                               Um banco de dados PostgreSQL de nível de produção que escala para qualquer tamanho. Com APIs instantâneas, segurança robusta e capacidades em tempo real.
                            </p>
                            <div className="mt-8 flex justify-center lg:justify-start items-center space-x-4">
                                <a href="#" className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-transform hover:scale-105 shadow-lg shadow-green-500/20">
                                    Comece seu projeto
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection>
                            <DatabaseCodeAnimation />
                        </AnimatedSection>
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-[#1c1c1c] border-y border-zinc-800">
                <div className="container mx-auto px-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dbFeatures.map((feature, i) => (
                            <AnimatedSection key={feature.name} delay={i * 100}>
                                <div className="group relative h-full">
                                   <div className="gradient-border absolute inset-0 rounded-xl"></div>
                                    <div className="relative p-8 bg-[#1a1a1a] rounded-lg h-full flex flex-col">
                                        <div className="flex items-center space-x-3">
                                            {React.cloneElement(feature.icon, { className: 'h-7 w-7 text-green-400 group-hover:scale-110 transition-transform duration-300' })}
                                            <h3 className="text-xl font-semibold">{feature.name}</h3>
                                        </div>
                                        <p className="mt-3 text-zinc-400 flex-grow">{feature.description}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            <DatabaseShowcase />
            <RlsSection />
            <RealtimeIntegrationSection />
            <GraphQLSection />
            <PerformanceSection />
            <BackupSection />
            <ExtensionsSection />
            <MigrationSection />
            
             <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection className="lg:pr-8">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Construído sobre uma base sólida</h2>
                            <p className="mt-4 text-lg text-zinc-400">
                                Escolhemos o PostgreSQL por sua confiabilidade, ecossistema robusto e conjunto de funcionalidades incomparável. Você obtém uma base de dados pronta para o futuro, sem se preocupar com a infraestrutura.
                            </p>
                            <div className="mt-8 flex items-center space-x-4">
                                <a href="#" className="flex items-center text-green-400 hover:text-white transition-colors">
                                    Por que PostgreSQL? <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection>
                            <div className="flex justify-center items-center">
                                <PostgresqlLogo className="h-48 w-48 text-zinc-700" />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
            
            <CTASection 
                title="Comece seu banco de dados em segundos"
                description="Todo projeto na Pitchutcha vem com um banco de dados Postgres dedicado, pronto para escalar. Sem custos até você estar pronto para a produção."
                buttonText="Comece a construir de graça"
            />
        </>
    );
};

export default DatabasePage;