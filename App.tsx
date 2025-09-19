import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
    DatabaseIcon, AuthIcon, StorageIcon, EdgeFunctionsIcon, RealtimeIcon, VectorIcon,
    ReactLogo, VueLogo, SvelteLogo, AngularLogo, NextLogo, NuxtLogo, GitHubIcon,
    ArrowRightIcon, CheckIcon, StarIcon, ChevronDownIcon,
    PitchutchaLogo, VercelLogo, StripeLogo, DiscordLogo, NotionLogo, PlayIcon,
    GlobeAltIcon, BookOpenIcon, SparklesIcon,
    FirebaseLogo, CheckCircleIcon, XCircleIcon, ClipboardIcon, ClipboardCheckIcon,
    RocketLaunchIcon, ChatBubbleLeftRightIcon, ShoppingCartIcon, QuoteIcon,
    CodeBracketSquareIcon, TableCellsIcon, ShieldCheckIcon, CubeTransparentIcon
} from './constants';
import DatabasePage from './DatabasePage';
import DocsPortal from './DocsPortal';
import DocsPage from './DocsPage';
import StatusPage from './StatusPage';
import { AnimatedSection, ExtensionsSection, CTASection } from './shared';
import GlobalLayout from './GlobalLayout';

gsap.registerPlugin(TextPlugin);

// --- Sub-Components ---
const SyntaxHighlighter: React.FC<{ code: string }> = ({ code }) => {
    const highlightedCode = useMemo(() => {
        let tempCode = code;
        // Simulação de um syntax highlighter como Shiki/Rehype.
        // Em um projeto real, uma biblioteca seria usada para uma análise robusta.
        tempCode = tempCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        tempCode = tempCode.replace(/(\/\/.+)/g, '<span class="text-gray-500">$1</span>');
        tempCode = tempCode.replace(/('.*?'|`.*?`)/g, '<span class="text-green-400">$1</span>');
        tempCode = tempCode.replace(/\b(import|from|export|const|let|var|async|await|new|return|if|else|in|of|for|while|switch|case|break|continue|function|=>|throw|try|catch|finally)\b/g, '<span class="text-purple-400">$1</span>');
        tempCode = tempCode.replace(/\b(true|false|null|undefined)\b/g, '<span class="text-red-400">$1</span>');
        tempCode = tempCode.replace(/([a-zA-Z_]\w*)\s*\(/g, '<span class="text-yellow-400">$1</span>(');
        tempCode = tempCode.replace(/(\b[A-Z][a-zA-Z_]\w*\b)/g, '<span class="text-cyan-400">$1</span>');
        tempCode = tempCode.replace(/({|}|[|]|,|\.|:|;)/g, '<span class="text-zinc-400">$1</span>');
        return tempCode;
    }, [code]);

    return (
        <pre className="whitespace-pre-wrap">
            <code className="text-zinc-300" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
    );
};

const codeSamples = {
    database: `// Crie um cliente para se conectar ao seu Pitchutcha DB
import { createClient } from '@pitchutcha/pitchutcha-js'
const pitchutcha = createClient(pitchutchaUrl, pitchutchaKey)

// Obtenha dados da sua tabela 'paises'
const { data, error } = await pitchutcha
  .from('paises')
  .select()`,
    auth: `// Crie um novo usuário
const { data, error } = await pitchutcha.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})

// Faça login com um usuário existente
const { data, error } = await pitchutcha.auth.signInWithPassword({
  email: 'example@email.com',
  password: 'example-password',
})`,
    storage: `// Faça upload de um arquivo para um bucket
const { data, error } = await pitchutcha
  .storage
  .from('avatares')
  .upload('public/avatar1.png', file)

// Faça o download de um arquivo
const { data, error } = await pitchutcha
  .storage
  .from('avatares')
  .download('public/avatar1.png')`,
    edge_functions: `import { serve } from 'https://deno.land/std/http/server.ts'

serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: \`Olá \${name}!\`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})`,
    realtime: `// Ouça mudanças em tempo real
const canal = pitchutcha.channel('qualquer')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'mensagens' },
    (payload) => {
      console.log('Mudança recebida!', payload)
    }
  )
  .subscribe()`,
    vector: `// Gere embeddings
const { data, error } = await pitchutcha.functions.invoke('embed', {
  inputText: 'Olá Mundo'
})

// Faça uma busca por similaridade
const { data, error } = await pitchutcha.rpc('match_documents', {
  query_embedding: embedding,
  match_threshold: 0.78,
  match_count: 10,
})`,
};


type FeatureKey = keyof typeof codeSamples;

const InteractiveCode: React.FC = () => {
    const [activeFeature, setActiveFeature] = useState<FeatureKey>('database');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSamples[activeFeature]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const features: { key: FeatureKey, name: string; icon: JSX.Element; description: string }[] = [
        { key: 'database', name: 'Database', icon: <DatabaseIcon />, description: 'API RESTful auto-gerada com tudo que você precisa para Postgres.' },
        { key: 'auth', name: 'Auth', icon: <AuthIcon />, description: 'Adicione login e gerenciamento de usuários, com segurança em nível de linha.' },
        { key: 'storage', name: 'Storage', icon: <StorageIcon />, description: 'Armazene e sirva arquivos grandes, de vídeos a imagens.' },
        { key: 'edge_functions', name: 'Edge Functions', icon: <EdgeFunctionsIcon />, description: 'Escreva código personalizado que executa perto de seus usuários.' },
        { key: 'realtime', name: 'Realtime', icon: <RealtimeIcon />, description: 'Ouça mudanças no banco de dados, envie e receba mensagens em tempo real.' },
        { key: 'vector', name: 'Vector', icon: <VectorIcon />, description: 'Armazene, consulte e pesquise embeddings de vetores.' },
    ];

    const FeatureButton = ({ featureKey, name, icon }: { featureKey: FeatureKey, name: string, icon: JSX.Element }) => (
        <button
            onClick={() => setActiveFeature(featureKey)}
            className={`flex items-center space-x-2 p-2 rounded-md transition-colors w-full text-left ${activeFeature === featureKey ? 'bg-zinc-700/50 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}
        >
            {React.cloneElement(icon, { className: 'h-5 w-5' })}
            <span>{name}</span>
        </button>
    );

    return (
        <div className="bg-[#1c1c1c] rounded-lg border border-zinc-700/50 overflow-hidden shadow-2xl shadow-green-500/10">
            <div className="p-4 bg-zinc-800/50 border-b border-zinc-700/50 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex flex-col md:flex-row min-h-[350px]">
                <div className="w-full md:w-1/3 p-4 space-y-2 border-b md:border-b-0 md:border-r border-zinc-700/50">
                    {features.map(f => <FeatureButton key={f.key} featureKey={f.key} name={f.name} icon={f.icon} />)}
                    <div className="pt-4 text-sm text-zinc-400">
                        <p>{features.find(f => f.key === activeFeature)?.description}</p>
                    </div>
                </div>
                <div className="w-full md:w-2/3 p-4 font-mono text-sm relative">
                     <button
                        onClick={handleCopy}
                        className="absolute top-4 right-4 p-1.5 bg-zinc-700/50 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                        aria-label="Copiar código"
                    >
                        {copied ? <ClipboardCheckIcon className="h-5 w-5 text-green-400" /> : <ClipboardIcon className="h-5 w-5" />}
                    </button>
                    <SyntaxHighlighter code={codeSamples[activeFeature]} />
                </div>
            </div>
        </div>
    );
};

const HeroProductGrid: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
    const products = [
        { name: 'Database', icon: <DatabaseIcon />, href: '/database' },
        { name: 'Auth', icon: <AuthIcon />, href: '#' },
        { name: 'Storage', icon: <StorageIcon />, href: '#' },
        { name: 'Edge Functions', icon: <EdgeFunctionsIcon />, href: '#' },
    ];
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {products.map((p, i) => (
                <AnimatedSection key={p.name} delay={100 * i}>
                     <a 
                        href={p.href.startsWith('/') ? `#${p.href}` : p.href}
                        onClick={(e) => {
                            if (p.href.startsWith('/')) {
                                e.preventDefault();
                                navigate(p.href);
                            }
                        }}
                        className="bg-zinc-800/50 border border-zinc-700/80 rounded-lg p-4 flex items-center space-x-3 hover:bg-zinc-700/50 hover:-translate-y-1 transition-all"
                     >
                        {React.cloneElement(p.icon, { className: 'h-6 w-6 text-green-400' })}
                        <span className="font-semibold">{p.name}</span>
                    </a>
                </AnimatedSection>
            ))}
        </div>
    );
}

const HeroSection: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                heroRef.current.style.setProperty('--mouse-x', `${x}px`);
                heroRef.current.style.setProperty('--mouse-y', `${y}px`);
            }
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section ref={heroRef} className="pt-32 pb-20 text-center relative hero-aurora overflow-hidden">
             <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(50,205,50,0.3),rgba(255,255,255,0))]"></div>
            <div className="container mx-auto px-4 relative z-10">
                <AnimatedSection>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                        Construa em um fim de semana,
                        <br />
                        Escale para milhões
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-400">
                        Pitchutcha é uma alternativa de código aberta ao Firebase. Estamos construindo as funcionalidades do Firebase usando ferramentas de código aberto de nível empresarial.
                    </p>
                    <div className="mt-8 flex justify-center items-center space-x-4">
                        <a href="#" className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-transform hover:scale-105 shadow-lg shadow-green-500/20">
                            Comece seu projeto
                        </a>
                        <a href="#/docs" onClick={(e) => { e.preventDefault(); navigate('/docs'); }} className="flex items-center bg-zinc-800/80 border border-zinc-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-zinc-700/80 transition-transform hover:scale-105">
                            Documentação <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </AnimatedSection>
                <HeroProductGrid navigate={navigate} />
                <AnimatedSection className="mt-20 max-w-5xl mx-auto">
                    <InteractiveCode />
                </AnimatedSection>
            </div>
        </section>
    );
};

const LogosSection: React.FC = () => (
    <AnimatedSection className="py-12">
        <div className="container mx-auto px-4">
            <p className="text-center text-zinc-500 text-sm">Funciona com suas ferramentas existentes</p>
            <div className="mt-6 flex justify-center items-center flex-wrap gap-x-8 gap-y-6 md:gap-x-12">
                <ReactLogo className="h-8 text-zinc-600 hover:text-white transition-colors" />
                <VueLogo className="h-8 text-zinc-600 hover:text-white transition-colors" />
                <SvelteLogo className="h-8 text-zinc-600 hover:text-white transition-colors" />
                <AngularLogo className="h-8 text-zinc-600 hover:text-white transition-colors" />
                <NextLogo className="h-8 text-zinc-600 hover:text-white transition-colors" />
                <NuxtLogo className="h-8 text-zinc-600 hover:text-white transition-colors" />
            </div>
        </div>
    </AnimatedSection>
);

const featuresList = [
    { key: 'database', icon: <DatabaseIcon />, name: 'Database', description: 'Banco de dados Postgres completo com extensões poderosas.', points: ['RLS', 'Backups', 'Extensões'] },
    { key: 'auth', icon: <AuthIcon />, name: 'Authentication', description: 'Adicione login social, de senha e sem senha a qualquer aplicativo.', points: ['Provedores', 'Controle de Acesso', 'Segurança'] },
    { key: 'storage', icon: <StorageIcon />, name: 'Storage', description: 'Armazene, organize e sirva arquivos grandes com permissões.', points: ['CDN', 'Transformações', 'Permissões'] },
    { key: 'edge_functions', icon: <EdgeFunctionsIcon />, name: 'Edge Functions', description: 'Execute sua lógica de negócios globalmente perto de seus usuários.', points: ['Deno', 'Global', 'Secrets'] },
    { key: 'realtime', icon: <RealtimeIcon />, name: 'Realtime', description: 'Construa aplicativos colaborativos e em tempo real com facilidade.', points: ['Broadcast', 'Presence', 'Postgres Changes'] },
    { key: 'vector', icon: <VectorIcon />, name: 'Vector', description: 'Integre embeddings e construa aplicativos de IA com facilidade.', points: ['pg_vector', 'Embeddings', 'Busca por similaridade'] },
];

const FeaturesSection: React.FC = () => {
    const [activeFeature, setActiveFeature] = useState(featuresList[0]);

    return (
    <section className="py-20">
        <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Construa qualquer coisa</h2>
                <p className="mt-4 text-lg text-zinc-400">
                    Pitchutcha fornece todas as funcionalidades de backend que você precisa para construir seu produto. Foco na experiência do usuário, nós cuidamos da infra.
                </p>
            </AnimatedSection>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                <AnimatedSection className="md:col-span-1 space-y-2">
                    {featuresList.map((feature) => (
                        <button
                            key={feature.key}
                            onClick={() => setActiveFeature(feature)}
                            className={`w-full p-4 text-left rounded-lg transition-all duration-300 ${activeFeature.key === feature.key ? 'bg-[#1c1c1c] border border-zinc-700 shadow-lg scale-105' : 'hover:bg-zinc-900/50'}`}
                        >
                            <div className="flex items-center space-x-4">
                                {React.cloneElement(feature.icon, { className: `h-7 w-7 transition-colors ${activeFeature.key === feature.key ? 'text-green-400' : 'text-zinc-500'}` })}
                                <div>
                                    <h3 className={`text-lg font-semibold transition-colors ${activeFeature.key === feature.key ? 'text-white' : 'text-zinc-300'}`}>{feature.name}</h3>
                                </div>
                            </div>
                        </button>
                    ))}
                </AnimatedSection>
                <AnimatedSection className="md:col-span-2">
                    <div className="bg-[#1c1c1c] rounded-lg border border-zinc-800 p-8 min-h-[300px] sticky top-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFeature.key}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    {React.cloneElement(activeFeature.icon, { className: 'h-8 w-8 text-green-400' })}
                                    <h3 className="text-2xl font-bold">{activeFeature.name}</h3>
                                </div>
                                <p className="text-zinc-400">{activeFeature.description}</p>
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    {activeFeature.points.map(point => (
                                        <div key={point} className="flex items-center text-sm text-zinc-300">
                                            <CheckIcon className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    </section>
    );
};


const CompareSection: React.FC = () => {
    const comparisonData = [
        { feature: 'Código Aberto', pitchutcha: <CheckCircleIcon className="h-6 w-6 text-green-500" />, firebase: <XCircleIcon className="h-6 w-6 text-zinc-500" /> },
        { feature: 'Banco de Dados', pitchutcha: 'PostgreSQL', firebase: 'NoSQL (Firestore)' },
        { feature: 'Hospedagem Própria', pitchutcha: <CheckCircleIcon className="h-6 w-6 text-green-500" />, firebase: <XCircleIcon className="h-6 w-6 text-zinc-500" /> },
        { feature: 'Vendor Lock-in', pitchutcha: 'Não', firebase: 'Sim' },
        { feature: 'Migração de Dados', pitchutcha: 'Fácil (SQL padrão)', firebase: 'Complexa' },
        { feature: 'Consultas Complexas', pitchutcha: 'Sim (SQL)', firebase: 'Limitado' },
    ];

    return (
        <section className="py-20 bg-[#1c1c1c] border-y border-zinc-800">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Mais aberto que as alternativas</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Pitchutcha é construído sobre ferramentas de código aberto que você pode hospedar em qualquer lugar. Exporte seus dados e saia a qualquer momento, sem complicações.
                    </p>
                </AnimatedSection>

                <AnimatedSection className="mt-12 max-w-4xl mx-auto">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-3 font-semibold text-white text-left">
                            <div className="p-4 border-b border-zinc-800">Recurso</div>
                            <div className="p-4 border-b border-zinc-800 flex items-center justify-center"><PitchutchaLogo className="h-6 w-6" /></div>
                            <div className="p-4 border-b border-zinc-800 flex items-center justify-center"><FirebaseLogo className="h-6 w-6" /></div>
                        </div>
                        {comparisonData.map((item, index) => (
                             <div key={item.feature} className={`grid grid-cols-3 text-zinc-300 items-center transition-colors hover:bg-zinc-800/40 ${index % 2 === 0 ? 'bg-zinc-800/20' : ''}`}>
                                <div className="p-4 font-medium">{item.feature}</div>
                                <div className="p-4 flex justify-center">{item.pitchutcha}</div>
                                <div className="p-4 flex justify-center">{item.firebase}</div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const DeveloperWorkflowSection: React.FC = () => {
    const steps = [
        {
            icon: <CodeBracketSquareIcon />,
            name: "Desenvolva Localmente",
            description: "Use nossa CLI para replicar o ambiente da nuvem em sua máquina, com recarregamento instantâneo e paridade total."
        },
        {
            icon: <TableCellsIcon />,
            name: "Gerencie no Painel",
            description: "Gerencie seu banco de dados, usuários e arquivos através de uma interface intuitiva, sem precisar sair do navegador."
        },
        {
            icon: <GlobeAltIcon />,
            name: "Implante Globalmente",
            description: "Faça o deploy para nossa infraestrutura global com um único comando e garanta baixa latência para seus usuários."
        }
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Um fluxo de trabalho completo</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Da sua máquina local para uma implantação global. Nós fornecemos as ferramentas para você ser produtivo em cada etapa do caminho.
                    </p>
                </AnimatedSection>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <AnimatedSection key={step.name} delay={i * 100}>
                            <div className="p-8 bg-[#1c1c1c] border border-zinc-800 rounded-lg text-center h-full">
                                <div className="inline-block p-4 bg-green-500/10 rounded-full mb-4">
                                    {React.cloneElement(step.icon, { className: 'h-8 w-8 text-green-400' })}
                                </div>
                                <h3 className="text-xl font-semibold">{step.name}</h3>
                                <p className="mt-2 text-zinc-400">{step.description}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TemplatesSection: React.FC = () => {
    const templates = [
        { icon: <RocketLaunchIcon />, name: 'Starter para SaaS', description: 'Um template completo com autenticação, assinaturas e gerenciamento de equipes.' },
        { icon: <ChatBubbleLeftRightIcon />, name: 'Chatbot com IA', description: 'Construa um chatbot com busca por similaridade de vetores e streaming de respostas.' },
        { icon: <ShoppingCartIcon />, name: 'Backend para E-commerce', description: 'Gerencie produtos, pedidos e clientes com um backend Postgres robusto.' },
    ];
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Comece com um template</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Acelere seu desenvolvimento com nossos templates pré-construídos. Clone, personalize e implante seu próximo grande projeto em minutos, não em semanas.
                    </p>
                </AnimatedSection>
                 <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template, i) => (
                        <AnimatedSection key={template.name} delay={i * 100}>
                            <div className="group relative h-full">
                               <div className="gradient-border absolute inset-0 rounded-xl"></div>
                                <a href="#" className="relative p-8 bg-[#1c1c1c] rounded-lg h-full flex flex-col text-left">
                                    <div className="flex items-center space-x-3">
                                        {React.cloneElement(template.icon, { className: 'h-7 w-7 text-green-400' })}
                                        <h3 className="text-xl font-semibold">{template.name}</h3>
                                    </div>
                                    <p className="mt-3 text-zinc-400 flex-grow">{template.description}</p>
                                    <div className="mt-6 font-semibold text-green-400 flex items-center group-hover:text-white transition-colors">
                                        Explorar template
                                        <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </a>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

const GlobalSection: React.FC = () => {
    const points = [
        { cx: 250, cy: 200, name: 'São Paulo, Brasil' },
        { cx: 450, cy: 150, name: 'Frankfurt, Alemanha' },
        { cx: 700, cy: 250, name: 'Singapura' },
        { cx: 550, cy: 350, name: 'Sydney, Austrália' },
        { cx: 200, cy: 150, name: 'N. Virginia, EUA' },
    ];
    const [activePoint, setActivePoint] = useState<{ x: number; y: number; name: string } | null>(null);

    return (
    <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Global por Padrão</h2>
                <p className="mt-4 text-lg text-zinc-400">
                    Nossa infraestrutura distribuída globalmente garante a menor latência possível para seus usuários, não importa onde eles estejam.
                </p>
                 <a href="#" className="mt-6 inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
                    Explore nossa rede <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
            </AnimatedSection>
        </div>
        <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="w-full h-full max-w-6xl mx-auto relative">
                 {activePoint && (
                    <div 
                        className="absolute bg-zinc-900 text-white text-sm px-3 py-1.5 rounded-md shadow-lg pointer-events-none transition-opacity duration-300"
                        style={{
                            left: activePoint.x,
                            top: activePoint.y,
                            transform: 'translate(-50%, -150%)',
                        }}
                    >
                        {activePoint.name}
                    </div>
                 )}
                 <svg viewBox="0 0 1000 500" className="w-full h-auto opacity-20">
                    <path d="M499.95,3.64C397.08,3.64,303.9,41.4,242.38,103.11c-60.16,60.29-99.16,143.2-101.62,235.8l-1.07,39.51l-4.29,1.07c-21.43,5.36-32.14,16.07-32.14,26.78c0,16.07,26.78,32.14,64.28,37.5c37.5,5.36,80.35-5.36,96.42-21.43l-5.36-32.14c-10.71-5.36-21.43-10.71-32.14-10.71c-10.71,0-16.07,5.36-10.71,10.71c5.36,5.36,21.43,10.71,37.5,5.36l10.71-37.5c5.36-26.78,16.07-53.56,32.14-74.99c26.78-32.14,64.28-53.56,107.13-53.56s80.35,21.43,107.13,53.56c21.43,26.78,32.14,58.92,32.14,91.06c0,26.78-5.36,53.56-21.43,74.99c-10.71,16.07-26.78,26.78-42.85,32.14l-5.36,37.5c16.07,10.71,37.5,16.07,58.92,10.71c32.14-5.36,53.56-21.43,53.56-42.85c0-16.07-10.71-26.78-32.14-32.14l-5.36-1.07l-1.07-42.85c-2.14-97.84-42.85-180.75-107.13-241.03C696.05,41.4,602.87,3.64,499.95,3.64Z" fill="#1a1a1a"/>
                    {points.map((point, index) => (
                        <circle
                            key={index}
                            cx={point.cx}
                            cy={point.cy}
                            r="6"
                            fill="#34d399"
                            className="cursor-pointer"
                            onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const svgRect = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
                                setActivePoint({ x: rect.left - svgRect.left + rect.width / 2, y: rect.top - svgRect.top, name: point.name });
                            }}
                            onMouseLeave={() => setActivePoint(null)}
                        >
                          <animate attributeName="r" values="6;10;6" dur="2s" begin={`${index * 0.4}s`} repeatCount="indefinite" />
                        </circle>
                    ))}
                    <path d="M 250 200 Q 350 100 450 150" stroke="#34d399" strokeWidth="1.5" fill="none" className="globe-path" style={{animationDelay: '0s'}} />
                    <path d="M 450 150 Q 575 200 700 250" stroke="#34d399" strokeWidth="1.5" fill="none" className="globe-path" style={{animationDelay: '1s'}} />
                    <path d="M 700 250 Q 625 350 550 350" stroke="#34d399" strokeWidth="1.5" fill="none" className="globe-path" style={{animationDelay: '2s'}} />
                    <path d="M 200 150 Q 425 300 550 350" stroke="#34d399" strokeWidth="1.5" fill="none" className="globe-path" style={{animationDelay: '3s'}} />
                 </svg>
            </div>
        </div>
    </section>
)};

const testimonials = [
    { name: 'Guilherme Rodz', title: 'CEO, Vercel', text: 'Estou apostando na Pitchutcha. Eles estão construindo o que todo desenvolvedor quer.', image: 'https://picsum.photos/id/1005/100/100' },
    { name: 'Ana Silva', title: 'Engenheira de Software, Stripe', text: 'Com a Pitchutcha, conseguimos lançar nosso MVP em dias em vez de meses. É um divisor de águas.', image: 'https://picsum.photos/id/1011/100/100' },
    { name: 'Lucas Costa', title: 'Fundador, IndieHackers', text: 'A melhor experiência de desenvolvedor que já tive. É como ter uma equipe de infra inteira à sua disposição.', image: 'https://picsum.photos/id/1027/100/100' },
    { name: 'Mariana Oliveira', title: 'Desenvolvedora Frontend, Nubank', text: 'As APIs são intuitivas e a documentação é impecável. Acelera muito o desenvolvimento.', image: 'https://picsum.photos/id/1012/100/100' },
];

const TestimonialsSection: React.FC = () => (
    <section className="py-20 bg-[#1c1c1c] border-y border-zinc-800">
        <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Amado por desenvolvedores</h2>
                <p className="mt-4 text-lg text-zinc-400">
                    Startups e empresas de todos os tamanhos usam a Pitchutcha para construir e escalar seus produtos com confiança.
                </p>
                 <div className="mt-8 flex justify-center items-center space-x-8">
                    <VercelLogo className="h-7 text-zinc-500 hover:text-white transition-colors"/>
                    <StripeLogo className="h-7 text-zinc-500 hover:text-white transition-colors"/>
                    <DiscordLogo className="h-7 text-zinc-500 hover:text-white transition-colors"/>
                    <NotionLogo className="h-7 text-zinc-500 hover:text-white transition-colors"/>
                </div>
            </AnimatedSection>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map(testimonial => (
                    <AnimatedSection key={testimonial.name}>
                        <div className="p-6 bg-zinc-800/50 rounded-lg border border-zinc-700/50 relative overflow-hidden">
                            <QuoteIcon className="absolute -top-2 -left-2 h-20 w-20 text-zinc-700/60 opacity-50" />
                            <p className="text-zinc-300 relative z-10">"{testimonial.text}"</p>
                            <div className="mt-4 flex items-center space-x-4 relative z-10">
                                <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full" />
                                <div>
                                    <p className="font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-sm text-zinc-400">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    </section>
);

const PricingSection: React.FC = () => {
    const plans = [
        {
            name: "Grátis",
            price: "$0",
            description: "Para projetos de hobby e experimentação.",
            features: ["50.000 usuários de Auth", "5GB de Storage", "500MB de Database", "Suporte da comunidade"],
            cta: "Comece a construir",
            highlight: false
        },
        {
            name: "Pro",
            price: "$25",
            priceSuffix: "/mês",
            description: "Para aplicações em produção com necessidade de escala.",
            features: ["Usuários de Auth ilimitados", "100GB de Storage", "8GB de Database", "Backups diários", "Suporte por e-mail"],
            cta: "Começar com Pro",
            highlight: true
        },
        {
            name: "Empresarial",
            price: "Personalizado",
            description: "Para aplicações de missão crítica e grandes equipes.",
            features: ["Tudo do Pro", "SSO / SAML", "Logs de auditoria", "Suporte dedicado 24/7", "SLA garantido"],
            cta: "Fale com vendas",
            highlight: false
        }
    ];

    const highlightedBgStyle = {
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%2334d399' stroke-opacity='0.1'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                 <AnimatedSection className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Preços flexíveis</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Comece de graça e pague conforme seu projeto cresce. Sem surpresas, sem contratos de longo prazo.
                    </p>
                </AnimatedSection>
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {plans.map(plan => (
                        <AnimatedSection key={plan.name}>
                            <div 
                                className={`p-8 rounded-lg border h-full flex flex-col transition-transform duration-300 hover:scale-105 ${plan.highlight ? 'bg-[#1c1c1c] border-green-500' : 'bg-zinc-900/50 border-zinc-800'}`}
                                style={plan.highlight ? highlightedBgStyle : {}}
                            >
                                {plan.highlight && <div className="text-center mb-4"><span className="bg-green-500/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">Mais Popular</span></div>}
                                <h3 className="text-2xl font-semibold text-center">{plan.name}</h3>
                                <div className="mt-4 text-center">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.priceSuffix && <span className="text-zinc-400">{plan.priceSuffix}</span>}
                                </div>
                                <p className="mt-4 text-zinc-400 text-center flex-grow">{plan.description}</p>
                                <ul className="mt-6 space-y-4">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-start">
                                            <CheckIcon className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-zinc-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8">
                                    <a href="#" className={`block w-full text-center px-6 py-3 rounded-md font-semibold transition-colors ${plan.highlight ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>{plan.cta}</a>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

const ShowcaseSection: React.FC = () => {
    type ShowcaseKey = 'saas' | 'ai' | 'ecommerce';
    const [activeShowcase, setActiveShowcase] = useState<ShowcaseKey>('saas');

    const SaaSVisual: React.FC = () => {
        const [highlightedRow, setHighlightedRow] = useState(1);
        useEffect(() => {
            const interval = setInterval(() => {
                setHighlightedRow(prev => (prev % 3) + 1);
            }, 1500);
            return () => clearInterval(interval);
        }, []);
        return (
            <div className="font-mono text-xs text-zinc-400 p-4 bg-zinc-900 rounded">
                <p className="text-green-400">&gt; select * from subscriptions;</p>
                <div className="mt-2 text-zinc-300">
                    <p>user_id | plan | status</p>
                    <p>-------------------------</p>
                    <p className={`transition-colors ${highlightedRow === 1 ? 'text-white bg-green-500/20' : ''}`}>user_a | free | active</p>
                    <p className={`transition-colors ${highlightedRow === 2 ? 'text-white bg-green-500/20' : ''}`}>user_b | pro | active</p>
                    <p className={`transition-colors ${highlightedRow === 3 ? 'text-white bg-green-500/20' : ''}`}>user_c | free | canceled</p>
                </div>
            </div>
        );
    };

    const AiVisual: React.FC = () => (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg viewBox="0 0 100 60" className="w-full h-auto">
                <defs><style>{`.query-dot { animation: pulse 2s infinite; } @keyframes pulse { 0%, 100% { r: 3; opacity: 1; } 50% { r: 4; opacity: 0.7; } } .match-line { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw-line 1.5s ease-out forwards; animation-delay: var(--delay); } @keyframes draw-line { to { stroke-dashoffset: 0; } }`}</style></defs>
                <circle cx="10" cy="30" r="3" fill="#34d399" className="query-dot" />
                <text x="10" y="42" fill="#34d399" fontSize="6" textAnchor="middle">Sua Pergunta</text>
                <circle cx="50" cy="15" r="2.5" fill="#a1a1aa" /><circle cx="60" cy="45" r="2.5" fill="#a1a1aa" /><circle cx="90" cy="30" r="2.5" fill="#a1a1aa" />
                <circle cx="45" cy="25" r="2.5" fill="#71717a" /><circle cx="75" cy="10" r="2.5" fill="#71717a" /><circle cx="80" cy="50" r="2.5" fill="#71717a" />
                <path d="M 10 30 L 50 15" stroke="#34d399" strokeWidth="0.5" fill="none" className="match-line" style={{'--delay': '0s'} as React.CSSProperties} />
                <path d="M 10 30 L 60 45" stroke="#34d399" strokeWidth="0.5" fill="none" className="match-line" style={{'--delay': '0.2s'} as React.CSSProperties}/>
                <path d="M 10 30 L 45 25" stroke="#34d399" strokeWidth="0.5" fill="none" className="match-line" style={{'--delay': '0.4s'} as React.CSSProperties}/>
            </svg>
        </div>
    );
    
    const EcommerceVisual: React.FC = () => {
        const [stock, setStock] = useState(12);
        useEffect(() => {
            const interval = setInterval(() => {
                setStock(prev => (prev > 0 ? prev - 1 : 12));
            }, 2000);
            return () => clearInterval(interval);
        }, []);
        return (
            <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-700/50">
                <p className="font-semibold text-white">Fones de Ouvido Incríveis</p>
                <p className="text-sm text-zinc-400">Áudio de alta fidelidade</p>
                <div className="mt-2 text-lg font-bold text-white flex justify-between items-center">
                    <span>$99.99</span>
                    <span key={stock} className="text-sm bg-green-500/20 text-green-300 px-2 py-1 rounded-md animate-[fadeIn_0.5s]">
                        {stock} em estoque
                    </span>
                </div>
            </div>
        );
    };

    const showcases = {
        saas: {
            icon: <RocketLaunchIcon />,
            name: "Starter para SaaS",
            description: "Construa um SaaS completo com autenticação, assinaturas e permissões baseadas em RLS.",
            code: `-- Permitir que usuários leiam faturas de sua própria equipe
CREATE POLICY "select_own_team_invoices"
ON invoices FOR SELECT
USING ( team_id = get_current_team_id() );`,
            visual: <SaaSVisual/>
        },
        ai: {
            icon: <ChatBubbleLeftRightIcon />,
            name: "Chatbot com IA",
            description: "Use embeddings vetoriais para criar um chatbot que responde perguntas com base em seus documentos.",
            code: `-- Encontre documentos similares a uma pergunta
SELECT content
FROM documents
ORDER BY embedding <=> query_embedding
LIMIT 5;`,
             visual: <AiVisual/>
        },
        ecommerce: {
            icon: <ShoppingCartIcon />,
            name: "Backend de E-commerce",
            description: "Gerencie produtos, pedidos e inventário em tempo real com o poder do Postgres e Realtime.",
            code: `-- Ouça mudanças no estoque de produtos
const channel = pitchutcha
  .channel('product_stock')
  .on('postgres_changes', ...)
  .subscribe();`,
            visual: <EcommerceVisual/>
        }
    };

    const ShowcaseButton = ({ showcaseKey, name, icon }: { showcaseKey: ShowcaseKey, name: string, icon: JSX.Element }) => (
        <button
            onClick={() => setActiveShowcase(showcaseKey)}
            className={`flex items-center space-x-3 p-3 rounded-md transition-colors w-full text-left ${activeShowcase === showcaseKey ? 'bg-zinc-700/50 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}
        >
            {React.cloneElement(icon, { className: 'h-6 w-6' })}
            <span className="font-semibold">{name}</span>
        </button>
    );

    return (
        <section className="py-20 bg-[#1c1c1c] border-y border-zinc-800">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Do Código à Produção em Minutos</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Pitchutcha combina ferramentas de código aberto poderosas em um fluxo de trabalho unificado para acelerar o desenvolvimento de qualquer aplicação.
                    </p>
                </AnimatedSection>

                <AnimatedSection className="mt-16 max-w-6xl mx-auto">
                    <div className="bg-[#1a1a1a] rounded-lg border border-zinc-700/50 overflow-hidden shadow-2xl shadow-green-500/10">
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            <div className="p-4 space-y-2 border-b lg:border-b-0 lg:border-r border-zinc-700/50">
                                {Object.entries(showcases).map(([key, value]) => (
                                    <ShowcaseButton
                                        key={key}
                                        showcaseKey={key as ShowcaseKey}
                                        name={value.name}
                                        icon={value.icon}
                                    />
                                ))}
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2">
                                <div className="p-6 font-mono text-sm border-b md:border-b-0 md:border-r border-zinc-700/50">
                                    <h4 className="font-sans font-bold text-white mb-2">Código</h4>
                                    <p className="font-sans text-xs text-zinc-400 mb-4">{showcases[activeShowcase].description}</p>
                                    <SyntaxHighlighter code={showcases[activeShowcase].code} />
                                </div>
                                <div className="p-6 bg-zinc-900/30">
                                    <h4 className="font-sans font-bold text-white mb-2">Resultado</h4>
                                    <div className="mt-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 h-48 flex items-center justify-center">
                                       <div key={activeShowcase} className="w-full h-full animate-[fadeIn_0.5s_ease-in-out]">
                                            {showcases[activeShowcase].visual}
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const cliAnimationCommands = [
    'pitchutcha init',
    '✔ Project initialized.',
    'pitchutcha login',
    '✔ Logged in as: seu-email@example.com',
    'pitchutcha link --project-ref your-project-ref',
    '✔ Project linked.',
    'pitchutcha start',
    '✔ Local services started.'
];

const CliAnimation: React.FC = () => {
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
                    const cursor = document.createElement('span');
                    cursor.className = "h-4 w-2 bg-green-400 animate-blink ml-1";
                    const line = document.createElement('div');
                    line.className = 'flex items-center';
                    line.innerHTML = `<span class="text-zinc-500 mr-2">$</span><span class="text-zinc-300" id="current-command"></span>`;
                    line.appendChild(cursor);
                    outputEl.appendChild(line);
                }
            });

            tl.call(tl.vars.onRepeat);

            cliAnimationCommands.forEach(command => {
                const isSuccess = command.startsWith('✔');
                
                if (isSuccess) {
                     tl.call(() => {
                        const line = document.createElement('div');
                        line.className = 'text-green-400';
                        line.textContent = command;
                        outputEl.insertBefore(line, outputEl.lastChild);
                     }).to({}, {duration: 0.3}); // Pause
                } else {
                    tl.to("#current-command", {
                        duration: command.length * 0.08,
                        text: command,
                        ease: 'none'
                    }, '+=0.5').call(() => {
                        const line = document.createElement('div');
                        line.className = 'flex items-center';
                        line.innerHTML = `<span class="text-zinc-500 mr-2">$</span><span class="text-zinc-300">${command}</span>`;
                        outputEl.insertBefore(line, outputEl.lastChild);
                        gsap.set("#current-command", { text: '' });
                    });
                }
            });

        }, outputRef);
        
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-[#1c1c1c] rounded-lg border border-zinc-700/50 overflow-hidden shadow-2xl shadow-green-500/10 font-mono text-sm p-6 min-h-[250px]">
           <div ref={outputRef}></div>
        </div>
    );
};

const CliSection: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => (
    <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection>
                    <CliAnimation />
                </AnimatedSection>
                 <AnimatedSection className="lg:pl-8">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Comece a construir em segundos</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Use nossa CLI para inicializar seu projeto e gerenciar seu ambiente de desenvolvimento local. Quando estiver pronto, implante em nossa plataforma com um único comando.
                    </p>
                    <div className="mt-8 flex items-center space-x-4">
                        <a href="#" className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-transform hover:scale-105">
                            Explorar a CLI
                        </a>
                        <a href="#/docs/project-setup" onClick={(e) => { e.preventDefault(); navigate('/docs/project-setup'); }} className="flex items-center text-zinc-300 hover:text-white transition-colors">
                            Ler a documentação <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    </section>
);

const LivePlaygroundSection: React.FC = () => {
    type Scenario = 'query' | 'insert' | 'secure' | 'reset';
    const initialData = [
        { id: 1, username: 'ada', text: 'Olá, mundo!', timestamp: '2 minutos atrás', isNew: false },
        { id: 2, username: 'grace', text: 'Realtime é incrível.', timestamp: '1 minuto atrás', isNew: false },
    ];
    
    const [commandInput, setCommandInput] = useState('SELECT * FROM messages;');
    const [commandHistory, setCommandHistory] = useState<{ command: string; output: string }[]>([]);
    const [tableData, setTableData] = useState(initialData);
    const [isRlsActive, setIsRlsActive] = useState(false);
    const [realtimeNotif, setRealtimeNotif] = useState({ show: false, text: '' });
    const [activeScenario, setActiveScenario] = useState<Scenario>('query');

    const scenarios: { key: Scenario; name: string; command: string; description: string }[] = [
        { key: 'query', name: '1. Consultar Dados', command: 'SELECT * FROM messages;', description: 'Busque dados usando SQL.' },
        { key: 'insert', name: '2. Inserir em Tempo Real', command: "INSERT INTO messages (username, text) VALUES ('você', 'Funciona!');", description: 'Adicione dados e veja a UI atualizar instantaneamente.' },
        { key: 'secure', name: '3. Proteger com RLS', command: "ENABLE RLS FOR messages WHERE username = 'você';", description: 'Aplique políticas de segurança para filtrar o acesso aos dados.' },
        { key: 'reset', name: '4. Resetar', command: "RESET_DEMO;", description: 'Reinicie a demonstração para o estado inicial.' },
    ];
    
    const handleCommandSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        
        let output = '✔ Comando executado com sucesso.';
        
        if (commandInput.toUpperCase().startsWith('SELECT')) {
            // Apenas um efeito visual, os dados já estão lá
        } else if (commandInput.toUpperCase().startsWith('INSERT')) {
            const newData = { id: Date.now(), username: 'você', text: 'Funciona!', timestamp: 'agora', isNew: true };
            setTableData(prev => [...prev, newData]);
            setRealtimeNotif({ show: true, text: 'Nova mensagem recebida!' });
            setTimeout(() => setRealtimeNotif({ show: false, text: '' }), 3000);
            setTimeout(() => setTableData(prev => prev.map(d => ({...d, isNew: false}))), 1000);
        } else if (commandInput.toUpperCase().startsWith('ENABLE RLS')) {
            setIsRlsActive(true);
        } else if (commandInput.toUpperCase().startsWith('RESET_DEMO')) {
             setTableData(initialData);
             setIsRlsActive(false);
             setCommandHistory([]);
             setCommandInput('SELECT * FROM messages;');
             setActiveScenario('query');
             return;
        } else {
             output = "❌ Erro: Comando não reconhecido nesta demo."
        }
        
        setCommandHistory(prev => [...prev, { command: commandInput, output }]);
        setCommandInput('');
    };

    const handleScenarioClick = (scenario: (typeof scenarios)[0]) => {
        setActiveScenario(scenario.key);
        setCommandInput(scenario.command);
        if(scenario.key === 'reset'){
             handleCommandSubmit();
        }
    };
    
    const displayedData = isRlsActive ? tableData.filter(d => d.username === 'você') : tableData;

    return (
        <section className="py-20 bg-[#111111] border-y border-zinc-800">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto">
                    <div className="inline-block p-3 bg-green-500/10 rounded-full mb-4">
                        <CubeTransparentIcon className="h-8 w-8 text-green-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Plataforma Unificada em Ação</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Experimente a sinergia entre Banco de Dados, Tempo Real e Segurança. Execute comandos e veja os resultados acontecerem ao vivo.
                    </p>
                </AnimatedSection>
                
                <AnimatedSection className="mt-16 max-w-6xl mx-auto">
                    <div className="bg-[#1c1c1c] rounded-lg border border-zinc-700/50 shadow-2xl shadow-green-500/10 overflow-hidden">
                       <div className="grid grid-cols-1 lg:grid-cols-2">
                           {/* Left: Controls & CLI */}
                           <div className="p-6 border-b lg:border-b-0 lg:border-r border-zinc-700/50 flex flex-col">
                               <div className="space-y-2 mb-4">
                                   {scenarios.map(s => (
                                       <button key={s.key} onClick={() => handleScenarioClick(s)} className={`w-full text-left p-3 rounded-md transition-colors ${activeScenario === s.key ? 'bg-green-500/20' : 'hover:bg-zinc-800/50'}`}>
                                           <p className={`font-semibold ${activeScenario === s.key ? 'text-green-300' : 'text-white'}`}>{s.name}</p>
                                           <p className={`text-sm ${activeScenario === s.key ? 'text-green-400/80' : 'text-zinc-400'}`}>{s.description}</p>
                                       </button>
                                   ))}
                               </div>
                               <div className="bg-[#111] font-mono text-sm p-4 rounded-lg flex-grow border border-zinc-800/50 h-64 overflow-y-auto">
                                   {commandHistory.map((item, i) => (
                                       <div key={i} className="mb-2">
                                           <div className="flex items-center">
                                                <span className="text-zinc-500 mr-2">$</span>
                                                <span className="text-zinc-300">{item.command}</span>
                                           </div>
                                           <p className={`${item.output.startsWith('❌') ? 'text-red-400' : 'text-green-400'}`}>{item.output}</p>
                                       </div>
                                   ))}
                                   <form onSubmit={handleCommandSubmit} className="flex items-center">
                                        <span className="text-zinc-500 mr-2">$</span>
                                        <input
                                            type="text"
                                            value={commandInput}
                                            onChange={e => setCommandInput(e.target.value)}
                                            className="bg-transparent w-full outline-none text-zinc-300"
                                            placeholder="Digite um comando..."
                                        />
                                        <span className="h-4 w-2 bg-green-400 animate-blink ml-1"></span>
                                   </form>
                               </div>
                           </div>
                           {/* Right: Data Visualizer */}
                           <div className="p-6 relative">
                               <div className="flex justify-between items-center mb-2">
                                   <h4 className="font-semibold text-white">Tabela: `messages`</h4>
                                   {isRlsActive && (
                                       <span className="flex items-center text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                                            <ShieldCheckIcon className="h-4 w-4 mr-1.5"/>
                                            RLS Ativada
                                       </span>
                                   )}
                               </div>
                               <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg min-h-[300px] overflow-x-auto">
                                   <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-zinc-700 text-zinc-400">
                                                <th className="p-2 font-medium">id</th>
                                                <th className="p-2 font-medium">username</th>
                                                <th className="p-2 font-medium">text</th>
                                                <th className="p-2 font-medium">timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayedData.map(row => (
                                                <tr key={row.id} className={`transition-all duration-500 ${row.isNew ? 'bg-green-500/20' : ''}`}>
                                                    <td className="p-2 font-mono text-zinc-500">{row.id.toString().slice(-4)}</td>
                                                    <td className="p-2">{row.username}</td>
                                                    <td className="p-2">{row.text}</td>
                                                    <td className="p-2 text-zinc-400">{row.timestamp}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                   </table>
                               </div>
                                {realtimeNotif.show && (
                                    <div className="absolute bottom-8 right-8 flex items-center bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-lg shadow-lg animate-pulse">
                                        <RealtimeIcon className="h-5 w-5 mr-2 text-green-400"/>
                                        <span className="text-sm text-white">{realtimeNotif.text}</span>
                                    </div>
                                )}
                           </div>
                       </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

// --- Homepage Component ---
const HomePage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => (
    <>
        <HeroSection navigate={navigate} />
        <LogosSection />
        <FeaturesSection />
        <LivePlaygroundSection />
        <DeveloperWorkflowSection />
        <ShowcaseSection />
        <TemplatesSection />
        <CompareSection />
        <GlobalSection />
        <ExtensionsSection />
        <TestimonialsSection />
        <CliSection navigate={navigate} />
        <PricingSection />
        <CTASection />
    </>
);


// --- Main App Component ---
const App: React.FC = () => {
  const getCurrentPath = () => window.location.hash.slice(1) || '/';
  
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  const navigate = (path: string) => {
    window.location.hash = path;
    window.scrollTo(0, 0);
  };
  
  useEffect(() => {
    const onHashChange = () => {
      setCurrentPath(getCurrentPath());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  
  const renderPage = () => {
      if (currentPath.startsWith('/docs')) {
        const docId = currentPath.split('/')[2];
        if (docId) {
            return <DocsPage activeTopic={docId} navigate={navigate} />;
        }
        return <DocsPortal navigate={navigate} />;
      }

      switch (currentPath) {
          case '/database':
              return <DatabasePage />;
          case '/status':
              return <StatusPage />;
          default:
              return <HomePage navigate={navigate} />;
      }
  };

  return (
    <GlobalLayout navigate={navigate}>
      {renderPage()}
    </GlobalLayout>
  );
};

export default App;