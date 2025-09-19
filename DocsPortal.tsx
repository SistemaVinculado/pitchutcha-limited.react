import React, { useState, useMemo } from 'react';
import { 
    DatabaseIcon, AuthIcon, StorageIcon, EdgeFunctionsIcon, RealtimeIcon, VectorIcon,
    BookOpenIcon, ArrowRightIcon, SearchIcon, NextLogo, ClipboardDocumentListIcon,
    ShoppingCartIcon, GitHubIcon, ShieldCheckIcon, RocketLaunchIcon
} from './constants';
import { AnimatedSection } from './shared';

interface DocsPortalProps {
    navigate: (path: string) => void;
}

const DocsPortal: React.FC<DocsPortalProps> = ({ navigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleCardClick = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    const mainCategories = [
        { name: 'Database', description: 'Acesse um banco de dados Postgres completo com APIs instantâneas.', icon: <DatabaseIcon />, path: '/docs/database-overview' },
        { name: 'Authentication', description: 'Adicione login social, de senha e sem senha a qualquer aplicativo.', icon: <AuthIcon />, path: '/docs/auth-overview' },
        { name: 'Storage', description: 'Armazene, organize e sirva arquivos grandes com permissões.', icon: <StorageIcon />, path: '/docs/storage-overview' },
        { name: 'Edge Functions', description: 'Execute sua lógica de negócios globalmente perto de seus usuários.', icon: <EdgeFunctionsIcon />, path: '/docs/edge-functions-overview' },
        { name: 'Realtime', description: 'Construa aplicativos colaborativos e em tempo real com facilidade.', icon: <RealtimeIcon />, path: '/docs/realtime-overview' },
        { name: 'Vector / IA', description: 'Integre embeddings e construa aplicativos de IA com facilidade.', icon: <VectorIcon />, path: '/docs/vector-overview' },
    ];
    
    const quickstartGuides = [
        { name: 'Guia de Início Rápido', description: 'Configure seu projeto e faça sua primeira consulta em menos de 5 minutos.', icon: <RocketLaunchIcon />, path: '/docs/quickstart-guide' },
        { name: 'Guia Rápido com Next.js', description: 'Integre a Pitchutcha em seu aplicativo Next.js com autenticação e banco de dados.', icon: <NextLogo />, path: '/docs/guides/nextjs' },
    ];

    const tutorials = [
        { name: 'Criando uma Lista de Tarefas', description: 'Um guia completo para construir uma aplicação CRUD em tempo real do zero.', icon: <ClipboardDocumentListIcon />, path: '/docs/guides/todo-list' },
        { name: 'Gerenciamento de Assinaturas', description: 'Aprenda a gerenciar assinaturas de usuários com Edge Functions e Stripe.', icon: <ShoppingCartIcon />, path: '/docs/guides/subscriptions' },
    ];
    
    const helpLinks = [
        { name: 'Junte-se à Comunidade', description: 'Conecte-se com outros desenvolvedores, faça perguntas e compartilhe seus projetos em nosso GitHub Discussions.', icon: <GitHubIcon />, cta: 'Ir para Discussões', path: 'https://github.com', external: true },
        { name: 'Status do Sistema', description: 'Verifique a disponibilidade em tempo real de todos os nossos serviços e inscreva-se para receber atualizações.', icon: <ShieldCheckIcon />, cta: 'Ver Status', path: '/status', external: false },
    ];

    const filterItems = (items: any[], term: string) => {
        if (!term) return items;
        const lowerCaseTerm = term.toLowerCase();
        return items.filter(item => 
            item.name.toLowerCase().includes(lowerCaseTerm) || 
            item.description.toLowerCase().includes(lowerCaseTerm)
        );
    };

    const filteredCategories = useMemo(() => filterItems(mainCategories, searchTerm), [searchTerm]);
    const filteredQuickstarts = useMemo(() => filterItems(quickstartGuides, searchTerm), [searchTerm]);
    const filteredTutorials = useMemo(() => filterItems(tutorials, searchTerm), [searchTerm]);

    return (
        <div className="min-h-screen">
             <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(50,205,50,0.2),rgba(255,255,255,0))]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection className="text-center">
                        <div className="inline-flex items-center space-x-2 bg-green-500/10 text-green-300 px-3 py-1 rounded-full text-sm mb-4">
                            <BookOpenIcon className="h-4 w-4" />
                            <span>Portal de Documentação</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                            Bem-vindo à Documentação
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-400">
                            Encontre guias, tutoriais e referências de API para todos os produtos Pitchutcha. Comece a construir seu próximo projeto hoje.
                        </p>
                        <div className="mt-8 max-w-xl mx-auto">
                            <div className="relative">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500"/>
                                <input 
                                    type="text" 
                                    placeholder="Pesquisar guias e produtos..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-12 pr-4 py-3 text-base outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                                />
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-16">
                 <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCategories.map((cat, i) => (
                             <AnimatedSection key={cat.name} delay={i * 50}>
                                <a 
                                    href={`#${cat.path}`} 
                                    onClick={(e) => handleCardClick(e, cat.path)} 
                                    className="group block relative p-8 bg-[#1c1c1c] rounded-lg h-full text-left border border-zinc-800 hover:border-zinc-700 transition-colors duration-300"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-zinc-800/70 rounded-lg">
                                            {React.cloneElement(cat.icon, { className: 'h-7 w-7 text-green-400 transition-transform duration-300 group-hover:scale-110' })}
                                        </div>
                                        <h3 className="text-xl font-semibold">{cat.name}</h3>
                                    </div>
                                    <p className="mt-4 text-zinc-400 flex-grow">{cat.description}</p>
                                    <div className="mt-6 font-semibold text-zinc-500 flex items-center group-hover:text-green-400 transition-colors duration-300">
                                        Ver documentação
                                        <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </a>
                            </AnimatedSection>
                        ))}
                    </div>
                     {searchTerm && filteredCategories.length === 0 && (
                        <AnimatedSection className="text-center py-8 text-zinc-400">Nenhum produto encontrado.</AnimatedSection>
                    )}
                </div>
            </section>
            
            <section className="py-16 bg-[#111111] border-y border-zinc-800">
              <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Início Rápido</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Comece a construir em minutos com nossos guias essenciais.
                    </p>
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {filteredQuickstarts.map((guide, i) => (
                        <AnimatedSection key={guide.name} delay={i * 100}>
                            <a href={`#${guide.path}`} onClick={(e) => handleCardClick(e, guide.path)} className="group block p-8 bg-[#1c1c1c] border border-zinc-800 rounded-lg h-full hover:border-green-500/50 hover:-translate-y-1 transition-all">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-zinc-800 p-3 rounded-lg mt-1">
                                        {React.cloneElement(guide.icon, { className: 'h-7 w-7 text-green-400' })}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{guide.name}</h3>
                                        <p className="mt-1 text-zinc-400">{guide.description}</p>
                                    </div>
                                </div>
                            </a>
                        </AnimatedSection>
                    ))}
                </div>
                 {searchTerm && filteredQuickstarts.length === 0 && (
                    <AnimatedSection className="text-center py-8 text-zinc-400">Nenhum guia de início rápido encontrado.</AnimatedSection>
                )}
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Tutoriais Completos</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Siga nossos guias passo a passo para construir aplicações completas com a Pitchutcha.
                    </p>
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {filteredTutorials.map((guide, i) => (
                        <AnimatedSection key={guide.name} delay={i * 100}>
                            <a href={`#${guide.path}`} onClick={(e) => handleCardClick(e, guide.path)} className="group block p-8 bg-[#1c1c1c] border border-zinc-800 rounded-lg h-full hover:border-green-500/50 hover:-translate-y-1 transition-all">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-zinc-800 p-2 rounded-md">
                                        {React.cloneElement(guide.icon, { className: 'h-6 w-6 text-green-400' })}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{guide.name}</h3>
                                </div>
                                <p className="mt-3 text-zinc-400">{guide.description}</p>
                            </a>
                        </AnimatedSection>
                    ))}
                </div>
                 {searchTerm && filteredTutorials.length === 0 && (
                    <AnimatedSection className="text-center py-8 text-zinc-400">Nenhum tutorial encontrado.</AnimatedSection>
                )}
              </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
                         <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Precisa de Ajuda?</h2>
                         <p className="mt-4 text-lg text-zinc-400">
                            Explore nossos canais da comunidade e recursos de suporte para obter ajuda.
                         </p>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {helpLinks.map((link, i) => (
                            <AnimatedSection key={link.name} delay={i * 100}>
                                <div className="p-8 bg-[#1c1c1c] border border-zinc-800 rounded-lg h-full text-center">
                                    <div className="inline-block p-3 bg-zinc-800 rounded-full mb-4">
                                        {React.cloneElement(link.icon, { className: 'h-7 w-7 text-green-400' })}
                                    </div>
                                    <h3 className="text-xl font-semibold">{link.name}</h3>
                                    <p className="mt-2 text-zinc-400 max-w-sm mx-auto">{link.description}</p>
                                    <a 
                                        href={link.external ? link.path : `#${link.path}`} 
                                        onClick={(e) => !link.external && handleCardClick(e, link.path)}
                                        target={link.external ? '_blank' : '_self'}
                                        rel={link.external ? 'noopener noreferrer' : ''}
                                        className="inline-flex items-center mt-6 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors"
                                    >
                                        {link.cta} <ArrowRightIcon className="ml-2 h-4 w-4" />
                                    </a>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DocsPortal;