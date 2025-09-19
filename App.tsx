
import React, { useState, useEffect, useRef } from 'react';
import { 
    DatabaseIcon, AuthIcon, StorageIcon, EdgeFunctionsIcon, RealtimeIcon, VectorIcon,
    ReactLogo, VueLogo, SvelteLogo, AngularLogo, NextLogo, NuxtLogo, GitHubIcon,
    ArrowRightIcon, CheckIcon, StarIcon, ChevronDownIcon, MenuIcon, XIcon,
    PitchutchaLogo, VercelLogo, StripeLogo, DiscordLogo, NotionLogo, PlayIcon,
    SearchIcon, GlobeAltIcon, BookOpenIcon, TagIcon, SparklesIcon, CommandLineIcon,
    FirebaseLogo, CheckCircleIcon, XCircleIcon, ClipboardIcon, ClipboardCheckIcon,
    RocketLaunchIcon, ChatBubbleLeftRightIcon, ShoppingCartIcon, QuoteIcon
} from './constants';
import DatabasePage from './DatabasePage';
import { AnimatedSection, useTypingAnimation, ExtensionsSection, CTASection } from './shared';

// --- Sub-Components ---
const SyntaxHighlighter: React.FC<{ code: React.ReactNode }> = ({ code }) => (
    <pre className="whitespace-pre-wrap">
        <code className="text-zinc-300">
            {code}
        </code>
    </pre>
);

const codeSamples = {
    database: {
        jsx: (
            <>
              <span className="text-gray-500">// Crie um cliente para se conectar ao seu Pitchutcha DB</span><br />
              <span className="text-purple-400">import</span> {'{ createClient }'} <span className="text-purple-400">from</span> <span className="text-green-400">'@pitchutcha/pitchutcha-js'</span><br />
              <span className="text-blue-400">const</span> pitchutcha = <span className="text-yellow-400">createClient</span>(pitchutchaUrl, pitchutchaKey)<br />
              <br />
              <span className="text-gray-500">// Obtenha dados da sua tabela 'paises'</span><br />
              <span className="text-blue-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> pitchutcha<br />
              {'  '}.<span className="text-yellow-400">from</span>(<span className="text-green-400">'paises'</span>)<br />
              {'  '}.<span className="text-yellow-400">select</span>()
            </>
        ),
        text: `// Crie um cliente para se conectar ao seu Pitchutcha DB\nimport { createClient } from '@pitchutcha/pitchutcha-js'\nconst pitchutcha = createClient(pitchutchaUrl, pitchutchaKey)\n\n// Obtenha dados da sua tabela 'paises'\nconst { data, error } = await pitchutcha\n  .from('paises')\n  .select()`
    },
    auth: {
        jsx: (
            <>
              <span className="text-gray-500">// Crie um novo usuário</span><br/>
              <span className="text-blue-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> pitchutcha.auth.<span className="text-yellow-400">signUp</span>({'{'}<br/>
              {'  '}email: <span className="text-green-400">'example@email.com'</span>,<br/>
              {'  '}password: <span className="text-green-400">'example-password'</span>,<br/>
              {'})'}<br/>
              <br/>
              <span className="text-gray-500">// Faça login com um usuário existente</span><br/>
              <span className="text-blue-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> pitchutcha.auth.<span className="text-yellow-400">signInWithPassword</span>({'{'}<br/>
              {'  '}email: <span className="text-green-400">'example@email.com'</span>,<br/>
              {'  '}password: <span className="text-green-400">'example-password'</span>,<br/>
              {'})'}
            </>
        ),
        text: `// Crie um novo usuário\nconst { data, error } = await pitchutcha.auth.signUp({\n  email: 'example@email.com',\n  password: 'example-password',\n})\n\n// Faça login com um usuário existente\nconst { data, error } = await pitchutcha.auth.signInWithPassword({\n  email: 'example@email.com',\n  password: 'example-password',\n})`
    },
    storage: {
        jsx: (
            <>
                <span className="text-gray-500">// Faça upload de um arquivo para um bucket</span><br/>
                <span className="text-blue-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> pitchutcha<br/>
                {'  '}.storage<br/>
                {'  '}.<span className="text-yellow-400">from</span>(<span className="text-green-400">'avatares'</span>)<br/>
                {'  '}.<span className="text-yellow-400">upload</span>(<span className="text-green-400">'public/avatar1.png'</span>, file)<br/>
                <br/>
                <span className="text-gray-500">// Faça o download de um arquivo</span><br/>
                <span className="text-blue-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> pitchutcha<br/>
                {'  '}.storage<br/>
                {'  '}.<span className="text-yellow-400">from</span>(<span className="text-green-400">'avatares'</span>)<br/>
                {'  '}.<span className="text-yellow-400">download</span>(<span className="text-green-400">'public/avatar1.png'</span>)
            </>
        ),
        text: `// Faça upload de um arquivo para um bucket\nconst { data, error } = await pitchutcha\n  .storage\n  .from('avatares')\n  .upload('public/avatar1.png', file)\n\n// Faça o download de um arquivo\nconst { data, error } = await pitchutcha\n  .storage\n  .from('avatares')\n  .download('public/avatar1.png')`
    },
    edge_functions: {
        jsx: (
            <>
                <span className="text-purple-400">import</span> {'{ serve }'} <span className="text-purple-400">from</span> <span className="text-green-400">'https://deno.land/std/http/server.ts'</span><br/>
                <br/>
                <span className="text-yellow-400">serve</span>(<span className="text-blue-400">async</span> (req) {'=>'} {'{'}<br/>
                {'  '}<span className="text-blue-400">const</span> {'{ name }'} = <span className="text-purple-400">await</span> req.<span className="text-yellow-400">json</span>()<br/>
                {'  '}<span className="text-blue-400">const</span> data = {'{'}<br/>
                {'    '}message: <span className="text-green-400">`Olá {'${name}'}!`</span>,<br/>
                {'  '}{'}'}<br/>
                <br/>
                {'  '}<span className="text-purple-400">return new</span> <span className="text-cyan-400">Response</span>(<br/>
                {'    '}JSON.<span className="text-yellow-400">stringify</span>(data),<br/>
                {'    '}<span>{'{ headers: { "Content-Type": "application/json" } }'}</span>,<br/>
                {'  '})<br/>
                {'}'})
            </>
        ),
        text: `import { serve } from 'https://deno.land/std/http/server.ts'\n\nserve(async (req) => {\n  const { name } = await req.json()\n  const data = {\n    message: \`Olá \${name}!\`,\n  }\n\n  return new Response(\n    JSON.stringify(data),\n    { headers: { "Content-Type": "application/json" } },\n  )\n})`
    },
    realtime: {
        jsx: (
            <>
              <span className="text-gray-500">// Ouça mudanças em tempo real</span><br/>
              <span className="text-blue-400">const</span> canal = pitchutcha.<span className="text-yellow-400">channel</span>(<span className="text-green-400">'qualquer'</span>)<br/>
              {'  '}.<span className="text-yellow-400">on</span>(<br/>
              {'    '}<span className="text-green-400">'postgres_changes'</span>,<br/>
              {'    '}{'{'} event: <span className="text-green-400">'*'</span>, schema: <span className="text-green-400">'public'</span>, table: <span className="text-green-400">'mensagens'</span> {'}'},<br/>
              {'    '}(payload) {'=>'} {'{'}<br/>
              {'      '}console.<span className="text-yellow-400">log</span>(<span className="text-green-400">'Mudança recebida!'</span>, payload)<br/>
              {'    '}{'}'}<br/>
              {'  '})<br/>
              {'  '}.<span className="text-yellow-400">subscribe</span>()
            </>
        ),
        text: `// Ouça mudanças em tempo real\nconst canal = pitchutcha.channel('qualquer')\n  .on(\n    'postgres_changes',\n    { event: '*', schema: 'public', table: 'mensagens' },\n    (payload) => {\n      console.log('Mudança recebida!', payload)\n    }\n  )\n  .subscribe()`
    },
    vector: {
        jsx: (
            <>
                <span className="text-gray-500">// Gere embeddings</span><br/>
                <span className="text-blue-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> pitchutcha.functions.<span className="text-yellow-400">invoke</span>(<span className="text-green-400">'embed'</span>, {'{'}<br/>
                {'  '}inputText: <span className="text-green-400">'Olá Mundo'</span><br/>
                {'})'}<br/>
                <br/>
                <span className="text-gray-500">// Faça uma busca por similaridade</span><br/>
                <span className="text-blue-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> pitchutcha.<span className="text-yellow-400">rpc</span>(<span className="text-green-400">'match_documents'</span>, {'{'}<br/>
                {'  '}query_embedding: embedding,<br/>
                {'  '}match_threshold: 0.78,<br/>
                {'  '}match_count: 10,<br/>
                {'})'}
            </>
        ),
        text: `// Gere embeddings\nconst { data, error } = await pitchutcha.functions.invoke('embed', {\n  inputText: 'Olá Mundo'\n})\n\n// Faça uma busca por similaridade\nconst { data, error } = await pitchutcha.rpc('match_documents', {\n  query_embedding: embedding,\n  match_threshold: 0.78,\n  match_count: 10,\n})`
    },
};


type FeatureKey = keyof typeof codeSamples;

const InteractiveCode: React.FC = () => {
    const [activeFeature, setActiveFeature] = useState<FeatureKey>('database');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSamples[activeFeature].text);
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
                    <SyntaxHighlighter code={codeSamples[activeFeature].jsx} />
                </div>
            </div>
        </div>
    );
};

const Header: React.FC<{ setIsCommandMenuOpen: (isOpen: boolean) => void; navigate: (path: string) => void; }> = ({ setIsCommandMenuOpen, navigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        navigate(path);
        setIsOpen(false); // Close mobile menu on navigation
    };

    const navLinks = [
        { name: 'Database', href: '/database' },
        { name: 'Desenvolvedores', href: '/developers' },
        { name: 'Preços', href: '/pricing' },
        { name: 'Docs', href: '/docs' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#111111]/80 backdrop-blur-lg border-b border-zinc-800' : 'border-b border-transparent'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center space-x-2 text-xl font-bold">
                            <PitchutchaLogo className="h-7 w-7" />
                            <span>Pitchutcha</span>
                        </a>
                        <nav className="hidden md:flex items-center space-x-6">
                            {navLinks.map(link => (
                                <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="flex items-center text-sm text-zinc-300 hover:text-white transition-colors">
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                         <button 
                            onClick={() => setIsCommandMenuOpen(true)}
                            className="flex items-center text-sm px-3 py-1.5 border border-zinc-700 rounded-md hover:bg-zinc-800 transition-colors text-zinc-400"
                            aria-label="Abrir menu de pesquisa"
                        >
                            <SearchIcon className="h-4 w-4 mr-2" />
                            Pesquisar...
                            <span className="ml-3 text-xs border border-zinc-600 px-1.5 py-0.5 rounded">⌘K</span>
                        </button>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm px-3 py-1.5 border border-zinc-700 rounded-md hover:bg-zinc-800 transition-colors">
                            <GitHubIcon className="h-4 w-4 mr-2" />
                            Star no GitHub
                            <span className="ml-2 bg-zinc-700 text-xs px-1.5 py-0.5 rounded-full">123k</span>
                        </a>
                        <a href="#" className="text-sm text-zinc-300 hover:text-white transition-colors">Entrar</a>
                        <a href="#" className="bg-green-500 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 transition-colors">Comece seu projeto</a>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                 <div className="md:hidden bg-[#1c1c1c] p-4 space-y-4">
                     {navLinks.map(link => (
                         <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="block text-zinc-300 hover:text-white">{link.name}</a>
                     ))}
                     <a href="#" className="block bg-green-500 text-white text-center px-4 py-2 rounded-md hover:bg-green-600 transition-colors">Comece seu projeto</a>
                     <a href="#" className="block text-center text-zinc-300 hover:text-white transition-colors">Entrar</a>
                 </div>
            )}
        </header>
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
                        href={p.href}
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
                        Pitchutcha é uma alternativa de código aberto ao Firebase. Estamos construindo as funcionalidades do Firebase usando ferramentas de código aberto de nível empresarial.
                    </p>
                    <div className="mt-8 flex justify-center items-center space-x-4">
                        <a href="#" className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-transform hover:scale-105 shadow-lg shadow-green-500/20">
                            Comece seu projeto
                        </a>
                        <a href="#" className="flex items-center bg-zinc-800/80 border border-zinc-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-zinc-700/80 transition-transform hover:scale-105">
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

const features = [
    { icon: <DatabaseIcon />, name: 'Database', description: 'Banco de dados Postgres completo com extensões poderosas.', points: ['RLS', 'Backups', 'Extensões'] },
    { icon: <AuthIcon />, name: 'Authentication', description: 'Adicione login social, de senha e sem senha a qualquer aplicativo.', points: ['Provedores', 'Controle de Acesso', 'Segurança'] },
    { icon: <StorageIcon />, name: 'Storage', description: 'Armazene, organize e sirva arquivos grandes com permissões.', points: ['CDN', 'Transformações', 'Permissões'] },
    { icon: <EdgeFunctionsIcon />, name: 'Edge Functions', description: 'Execute sua lógica de negócios globalmente perto de seus usuários.', points: ['Deno', 'Global', 'Secrets'] },
    { icon: <RealtimeIcon />, name: 'Realtime', description: 'Construa aplicativos colaborativos e em tempo real com facilidade.', points: ['Broadcast', 'Presence', 'Postgres Changes'] },
    { icon: <VectorIcon />, name: 'Vector', description: 'Integre embeddings e construa aplicativos de IA com facilidade.', points: ['pg_vector', 'Embeddings', 'Busca por similaridade'] },
];

const FeaturesSection: React.FC = () => (
    <section className="py-20">
        <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Construa qualquer coisa</h2>
                <p className="mt-4 text-lg text-zinc-400">
                    Pitchutcha fornece todas as funcionalidades de backend que você precisa para construir seu produto. Foco na experiência do usuário, nós cuidamos da infra.
                </p>
            </AnimatedSection>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                    <AnimatedSection key={feature.name} delay={i * 100}>
                        <div className="group relative h-full">
                           <div className="gradient-border absolute inset-0 rounded-xl"></div>
                            <div className="relative p-8 bg-[#1c1c1c] rounded-lg h-full flex flex-col">
                                <div className="flex items-center space-x-3">
                                    {React.cloneElement(feature.icon, { className: 'h-6 w-6 text-green-400 group-hover:scale-110 transition-transform duration-300' })}
                                    <h3 className="text-xl font-semibold">{feature.name}</h3>
                                </div>
                                <p className="mt-3 text-zinc-400 flex-grow">{feature.description}</p>
                                <div className="mt-4 space-y-2">
                                    {feature.points.map(point => (
                                        <div key={point} className="flex items-center text-sm text-zinc-300">
                                            <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    </section>
);

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
    const { lines, currentLine } = useTypingAnimation(cliAnimationCommands);

    return (
        <div className="bg-[#1c1c1c] rounded-lg border border-zinc-700/50 overflow-hidden shadow-2xl shadow-green-500/10 font-mono text-sm p-6 min-h-[250px]">
            {lines.map((line, index) => (
                <div key={index} className="flex items-center">
                    <span className={`mr-2 ${line.startsWith('✔') ? 'text-green-400' : 'text-zinc-500'}`}>{line.startsWith('✔') ? '' : '$'}</span>
                    <span className={line.startsWith('✔') ? 'text-green-400' : 'text-zinc-300'}>{line}</span>
                </div>
            ))}
            {currentLine && (
                 <div className="flex items-center">
                    <span className="text-zinc-500 mr-2">$</span>
                    <span className="text-zinc-300">{currentLine}</span>
                    <span className="h-4 w-2 bg-green-400 animate-blink ml-1"></span>
                </div>
            )}
        </div>
    );
};

const CliSection: React.FC = () => (
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
                        <a href="#" className="flex items-center text-zinc-300 hover:text-white transition-colors">
                            Ler a documentação <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    </section>
);

const MadeWithPitchutchaSection: React.FC = () => {
    const logos = [
        <VercelLogo />, <StripeLogo />, <DiscordLogo />, <NotionLogo />, <GitHubIcon />, <NextLogo />
    ];
    // Duplicate logos for a seamless loop
    const extendedLogos = [...logos, ...logos, ...logos, ...logos];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Confiado por milhões</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Pitchutcha é a base para startups, empresas da Fortune 500 e qualquer projeto que queira se mover mais rápido sem sacrificar a escalabilidade.
                    </p>
                </AnimatedSection>
                <div className="mt-16 relative w-full overflow-hidden mask-gradient">
                     <div className="flex animate-marquee">
                        {extendedLogos.map((Logo, index) => (
                            <div key={index} className="flex-shrink-0 mx-8 text-zinc-500 hover:text-white transition-colors">
                                {React.cloneElement(Logo, { className: 'h-8' })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer: React.FC = () => {
    const footerLinks = {
        Produto: ['Database', 'Auth', 'Functions', 'Realtime', 'Storage', 'Vector'],
        Recursos: ['Suporte', 'Preços', 'Tornar-se um Parceiro', 'Integrações', 'Experts'],
        Desenvolvedores: ['Documentação', 'API Reference', 'Guias', 'Código Aberto', 'System Status'],
        Empresa: ['Blog', 'Carreiras', 'Suporte', 'Termos de Serviço'],
    };

    return (
        <footer className="border-t border-zinc-800 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-1">
                         <a href="#" className="flex items-center space-x-2 text-xl font-bold">
                            <PitchutchaLogo className="h-7 w-7" />
                            <span>Pitchutcha</span>
                        </a>
                        <p className="mt-4 text-sm text-zinc-400">&copy; {new Date().getFullYear()} Pitchutcha. Todos os direitos reservados.</p>
                    </div>

                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-semibold text-white">{title}</h4>
                            <ul className="mt-4 space-y-3">
                                {links.map(link => (
                                    <li key={link}><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

const CommandMenu: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void }> = ({ isOpen, setIsOpen }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const commandMenuRef = useRef<HTMLDivElement>(null);

    const commands = [
        { name: 'Documentação', icon: <BookOpenIcon/>, href: '#' },
        { name: 'Preços', icon: <TagIcon/>, href: '#' },
        { name: 'Começar um Projeto', icon: <SparklesIcon/>, href: '#' },
        { name: 'Referência da CLI', icon: <CommandLineIcon/>, href: '#'},
        { name: 'Status do Sistema', icon: <GlobeAltIcon/>, href: '#'},
    ];

    const filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (commandMenuRef.current && !commandMenuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true">
            <div ref={commandMenuRef} className="bg-[#1c1c1c] w-full max-w-xl rounded-lg border border-zinc-800 shadow-2xl shadow-black/50 transform transition-all duration-300 opacity-100 scale-100">
                <div className="p-2 border-b border-zinc-800 flex items-center">
                    <SearchIcon className="h-5 w-5 text-zinc-500 mx-2" />
                    <input
                        type="text"
                        placeholder="Pesquisar documentação ou navegar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent outline-none text-white placeholder-zinc-500"
                        autoFocus
                    />
                </div>
                <ul className="p-2 max-h-[300px] overflow-y-auto">
                    {filteredCommands.length > 0 ? (
                        filteredCommands.map(cmd => (
                            <li key={cmd.name}>
                                <a href={cmd.href} className="flex items-center p-2 rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                                    {React.cloneElement(cmd.icon, { className: "h-5 w-5 mr-3 text-zinc-500" })}
                                    {cmd.name}
                                </a>
                            </li>
                        ))
                    ) : (
                        <p className="p-4 text-center text-zinc-500">Nenhum resultado encontrado.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

// --- Homepage Component ---
const HomePage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => (
    <>
        <HeroSection navigate={navigate} />
        <LogosSection />
        <FeaturesSection />
        <CompareSection />
        <ExtensionsSection />
        <TemplatesSection />
        <GlobalSection />
        <TestimonialsSection />
        <PricingSection />
        <MadeWithPitchutchaSection />
        <CliSection />
        <CTASection />
    </>
);


// --- Main App Component ---
const App: React.FC = () => {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPage(path);
    window.scrollTo(0, 0);
  };
  
  useEffect(() => {
    const onPopState = () => setCurrentPage(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
          if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
              event.preventDefault();
              setIsCommandMenuOpen(prev => !prev);
          }
          if (event.key === 'Escape') {
              setIsCommandMenuOpen(false);
          }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };
  }, []);
  
  const renderPage = () => {
      switch (currentPage) {
          case '/database':
              return <DatabasePage />;
          default:
              return <HomePage navigate={navigate} />;
      }
  };

  return (
    <div className="min-h-screen">
      <CommandMenu isOpen={isCommandMenuOpen} setIsOpen={setIsCommandMenuOpen} />
      <Header setIsCommandMenuOpen={setIsCommandMenuOpen} navigate={navigate} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
