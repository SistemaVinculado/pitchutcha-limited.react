import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
    BookOpenIcon, DatabaseIcon, AuthIcon, StorageIcon, EdgeFunctionsIcon,
    MenuIcon, XIcon, ChevronRightIcon, ChevronDownIcon, SearchIcon, ArrowRightIcon, ArrowLeftIcon,
    RealtimeIcon, VectorIcon, GitHubIcon, HandThumbUpIcon, HandThumbDownIcon,
    CodeBracketSquareIcon, RocketLaunchIcon
} from './constants';
import IntroductionDoc from './docs/IntroductionDoc';
import QuickstartGuideDoc from './docs/QuickstartGuideDoc';
import ProjectSetupDoc from './docs/ProjectSetupDoc';
import JsClientLibDoc from './docs/JsClientLibDoc';
import DatabaseOverviewDoc from './docs/DatabaseOverviewDoc';
import DatabaseApiDoc from './docs/DatabaseApiDoc';
import DatabaseRlsDoc from './docs/DatabaseRlsDoc';
import AuthOverviewDoc from './docs/AuthOverviewDoc';
import AuthProvidersDoc from './docs/AuthProvidersDoc';
import StorageOverviewDoc from './docs/StorageOverviewDoc';
import StorageUploadDoc from './docs/StorageUploadDoc';
import EdgeFunctionsOverviewDoc from './docs/EdgeFunctionsOverviewDoc';
import EdgeFunctionsSecretsDoc from './docs/EdgeFunctionsSecretsDoc';
import RealtimeOverviewDoc from './docs/RealtimeOverviewDoc';
import VectorOverviewDoc from './docs/VectorOverviewDoc';

// --- Utility Functions ---
const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

// --- Navigation and Content Mapping ---
const navigationStructure = [
    { 
        title: 'Começando', 
        icon: <BookOpenIcon/>,
        links: [
            { id: 'introduction', name: 'Introdução' },
            { id: 'quickstart-guide', name: 'Início Rápido' },
            { id: 'project-setup', name: 'Configuração do Projeto' },
            { id: 'js-client-lib', name: 'Biblioteca Cliente JS' },
        ]
    },
    { 
        title: 'Database', 
        icon: <DatabaseIcon/>,
        links: [
            { id: 'database-overview', name: 'Visão Geral' },
            { id: 'database-api', name: 'Uso da API' },
            { id: 'database-rls', name: 'Segurança (RLS)' },
        ] 
    },
    { 
        title: 'Authentication', 
        icon: <AuthIcon/>,
        links: [
            { id: 'auth-overview', name: 'Visão Geral' },
            { id: 'auth-providers', name: 'Provedores OAuth' },
        ]
    },
    { 
        title: 'Storage', 
        icon: <StorageIcon/>,
        links: [
            { id: 'storage-overview', name: 'Visão Geral' },
            { id: 'storage-upload', name: 'Upload de Arquivos' },
        ]
    },
    { 
        title: 'Edge Functions', 
        icon: <EdgeFunctionsIcon/>,
        links: [
            { id: 'edge-functions-overview', name: 'Visão Geral' },
            { id: 'edge-functions-secrets', name: 'Segredos' },
        ]
    },
    {
        title: 'Realtime',
        icon: <RealtimeIcon />,
        links: [
            { id: 'realtime-overview', name: 'Visão Geral' },
        ]
    },
    {
        title: 'Vector / IA',
        icon: <VectorIcon />,
        links: [
            { id: 'vector-overview', name: 'Visão Geral' },
        ]
    }
];

const docComponentMap: { [key: string]: React.FC } = {
  'introduction': IntroductionDoc,
  'quickstart-guide': QuickstartGuideDoc,
  'project-setup': ProjectSetupDoc,
  'js-client-lib': JsClientLibDoc,
  'database-overview': DatabaseOverviewDoc,
  'database-api': DatabaseApiDoc,
  'database-rls': DatabaseRlsDoc,
  'auth-overview': AuthOverviewDoc,
  'auth-providers': AuthProvidersDoc,
  'storage-overview': StorageOverviewDoc,
  'storage-upload': StorageUploadDoc,
  'edge-functions-overview': EdgeFunctionsOverviewDoc,
  'edge-functions-secrets': EdgeFunctionsSecretsDoc,
  'realtime-overview': RealtimeOverviewDoc,
  'vector-overview': VectorOverviewDoc,
};

// --- Componente de Feedback ---
const FeedbackWidget: React.FC = () => {
    const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

    const handleFeedback = () => {
        setFeedbackSent(true);
    };

    if (feedbackSent) {
        return (
            <div className="text-center p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <p className="text-zinc-300">Obrigado pelo seu feedback!</p>
            </div>
        );
    }

    return (
        <div className="text-center p-6 bg-zinc-900/50 rounded-lg border border-zinc-800">
            <p className="font-semibold text-white">Esta página foi útil?</p>
            <div className="mt-4 flex justify-center space-x-3">
                <button 
                    onClick={handleFeedback}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-700 hover:text-white transition-colors"
                >
                    <HandThumbUpIcon className="h-5 w-5" />
                    <span>Sim</span>
                </button>
                <button 
                    onClick={handleFeedback}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-700 hover:text-white transition-colors"
                >
                    <HandThumbDownIcon className="h-5 w-5" />
                    <span>Não</span>
                </button>
            </div>
        </div>
    );
};

// --- Main Docs Layout Component ---
interface DocsPageProps {
    activeTopic: string;
    navigate: (path: string) => void;
}

const DocsPage: React.FC<DocsPageProps> = ({ activeTopic, navigate }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openCategories, setOpenCategories] = useState<string[]>(navigationStructure.map(c => c.title));
    const [searchTerm, setSearchTerm] = useState('');
    const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
    const [activeHeading, setActiveHeading] = useState('');
    const mainContentRef = useRef<HTMLDivElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);
    
    const ContentComponent = docComponentMap[activeTopic] || IntroductionDoc;

    const handleNavClick = (id: string) => {
        navigate(`/docs/${id}`);
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
        window.scrollTo(0,0);
    };

    const toggleCategory = (title: string) => {
        setOpenCategories(prev => 
            prev.includes(title) ? prev.filter(c => c !== title) : [...prev, title]
        );
    };

    // --- Dynamic Table of Contents & Scroll Spy ---
    useEffect(() => {
        if (!contentWrapperRef.current) return;
        
        const headingElements = Array.from(contentWrapperRef.current.querySelectorAll('h2'));
        const newHeadings = headingElements.map(h => ({ text: h.innerText, id: slugify(h.innerText) }));
        setHeadings(newHeadings);
        
        headingElements.forEach(h => h.id = slugify(h.innerText));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            // Adjust rootMargin to better detect the heading at the top of the viewport
            { rootMargin: '-80px 0px -60% 0px' } 
        );

        headingElements.forEach(el => observer.observe(el!));

        return () => headingElements.forEach(el => el && observer.unobserve(el));
    }, [activeTopic]); // Rerun when content component changes

    const filteredNav = useMemo(() => {
        if (!searchTerm) return navigationStructure;
        const lowercasedFilter = searchTerm.toLowerCase();
        const newOpenCategories: string[] = [];
        
        const nav = navigationStructure.map(category => {
            const filteredLinks = category.links.filter(link =>
                link.name.toLowerCase().includes(lowercasedFilter)
            );
            if (filteredLinks.length > 0 || category.title.toLowerCase().includes(lowercasedFilter)) {
                if (!openCategories.includes(category.title)) {
                    newOpenCategories.push(category.title);
                }
                return { ...category, links: filteredLinks.length > 0 ? filteredLinks : category.links };
            }
            return null;
        }).filter(Boolean) as typeof navigationStructure;
        
        if (newOpenCategories.length > 0) {
             setTimeout(() => setOpenCategories(prev => [...new Set([...prev, ...newOpenCategories])]), 0);
        }

        return nav;
    }, [searchTerm, openCategories]);

    const allLinks = useMemo(() => navigationStructure.flatMap(cat => cat.links), []);
    const activeLinkIndex = useMemo(() => allLinks.findIndex(link => link.id === activeTopic), [activeTopic, allLinks]);
    const prevLink = activeLinkIndex > 0 ? allLinks[activeLinkIndex - 1] : null;
    const nextLink = activeLinkIndex < allLinks.length - 1 ? allLinks[activeLinkIndex + 1] : null;

    return (
        <>
            {/* Mobile-specific sub-header for navigation and sidebar toggle */}
             <div className="fixed top-16 left-0 right-0 h-16 bg-[#111111] z-20 flex items-center justify-between px-4 lg:hidden border-b border-zinc-800">
                <button 
                    onClick={() => navigate('/docs')} 
                    className="flex items-center text-sm text-zinc-300 hover:text-white"
                >
                   <ArrowLeftIcon className="h-4 w-4 mr-2" /> Voltar ao Portal
                </button>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    aria-label="Toggle Documentation Menu"
                    className="p-2"
                >
                    {isSidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>
            
            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsSidebarOpen(false)}></div>}

            <div className="flex">
                 {/* Sidebar */}
                <aside className={`fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-72 lg:w-64 flex-shrink-0 bg-[#1c1c1c] border-r border-zinc-800 pt-8 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:transform-none z-40`}>
                    <div className="px-4">
                        <div className="relative mb-4">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500"/>
                            <input 
                                type="text" 
                                placeholder="Pesquisar..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-md pl-9 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                            />
                        </div>
                    </div>
                    <nav className="h-full overflow-y-auto pb-24 px-4">
                        <ul>
                            {filteredNav.map(category => (
                                <li key={category.title} className="mb-4">
                                    <button 
                                        onClick={() => toggleCategory(category.title)}
                                        className="w-full flex justify-between items-center text-left font-semibold text-white px-2 py-1 rounded-md hover:bg-zinc-800/50"
                                    >
                                        <div className="flex items-center space-x-2">
                                            {React.cloneElement(category.icon, { className: 'h-5 w-5 text-zinc-400' })}
                                            <span>{category.title}</span>
                                        </div>
                                        {category.links.length > 0 && (
                                           openCategories.includes(category.title) ? <ChevronDownIcon className="h-4 w-4 text-zinc-500" /> : <ChevronRightIcon className="h-4 w-4 text-zinc-500" />
                                        )}
                                    </button>
                                    {(openCategories.includes(category.title) || searchTerm) && category.links.length > 0 && (
                                        <ul className="mt-2 pl-4 border-l border-zinc-800">
                                            {category.links.map(link => (
                                                <li key={link.id}>
                                                    <button 
                                                        onClick={() => handleNavClick(link.id)}
                                                        className={`w-full text-left text-sm py-1.5 pl-3 pr-2 rounded-md transition-colors relative ${activeTopic === link.id ? 'text-green-400 font-semibold' : 'text-zinc-400 hover:text-white'}`}
                                                    >
                                                        {activeTopic === link.id && <span className="absolute left-[-9px] top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-green-400 rounded-full"></span>}
                                                        {link.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                
                {/* Main Content & Right ToC */}
                <div className="flex-1 min-w-0 pt-32 lg:pt-0">
                    <div className="flex justify-center w-full">
                        <main ref={mainContentRef} className="w-full flex-1 scroll-smooth lg:pt-8">
                            <div className="max-w-4xl mx-auto px-4 lg:px-12">
                                <div ref={contentWrapperRef} className="prose prose-invert prose-headings:text-white prose-a:text-green-400 hover:prose-a:text-green-300">
                                    <div className="flex justify-end -mt-4 mb-8">
                                        <a href="https://github.com/pitchutcha/docs" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors no-underline">
                                            <GitHubIcon className="h-4 w-4 mr-2" />
                                            Editar esta página no GitHub
                                        </a>
                                    </div>
                                <ContentComponent />
                                </div>
                                
                                <div className="mt-12 pt-8 border-t border-zinc-800">
                                    <FeedbackWidget key={activeTopic} />
                                </div>

                                <div className="mt-12 pt-6 border-t border-zinc-800 flex justify-between items-center">
                                    {prevLink ? (
                                        <button onClick={() => handleNavClick(prevLink.id)} className="group flex items-center text-left text-zinc-400 hover:text-white transition-colors">
                                            <ArrowLeftIcon className="h-5 w-5 mr-3 transition-transform group-hover:-translate-x-1"/>
                                            <div>
                                                <span className="text-xs">Anterior</span>
                                                <p className="font-semibold text-white">{prevLink.name}</p>
                                            </div>
                                        </button>
                                    ) : <div></div>}
                                    {nextLink ? (
                                        <button onClick={() => handleNavClick(nextLink.id)} className="group flex items-center text-right text-zinc-400 hover:text-white transition-colors">
                                            <div>
                                                <span className="text-xs">Próximo</span>
                                                <p className="font-semibold text-white">{nextLink.name}</p>
                                            </div>
                                            <ArrowRightIcon className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1"/>
                                        </button>
                                    ) : <div></div>}
                                </div>
                                <div className="h-24"></div> {/* Bottom padding */}
                            </div>
                        </main>

                        <aside className="hidden xl:block w-64 flex-shrink-0 pt-8 pr-4">
                            <div className="sticky top-24">
                                <h3 className="text-sm font-semibold text-white mb-2">Nesta Página</h3>
                                {headings.length > 0 ? (
                                    <ul className="space-y-2 text-sm border-l border-zinc-800">
                                        {headings.map(heading => (
                                            <li key={heading.id}>
                                                <a 
                                                    href={`#${heading.id}`}
                                                    className={`block pl-4 -ml-px border-l-2 transition-colors ${activeHeading === heading.id ? 'border-green-400 text-green-400 font-semibold' : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-500'}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                    }}
                                                >
                                                    {heading.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-zinc-500">Nenhum tópico nesta página.</p>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DocsPage;