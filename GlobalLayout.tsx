import React, { useState, useEffect, useRef } from 'react';
import { 
    PitchutchaLogo, GitHubIcon, SearchIcon, XIcon, MenuIcon, 
    BookOpenIcon, TagIcon, SparklesIcon, CommandLineIcon, GlobeAltIcon
} from './constants';

// --- Componentes Movidos para o Layout Global ---

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
                                    <li key={link}>
                                        <a 
                                            href={link.toLowerCase().replace(' ', '-') === 'system-status' ? '#/status' : '#'} 
                                            className="text-sm text-zinc-400 hover:text-white transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
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
                        <a href="#/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center space-x-2 text-xl font-bold">
                            <PitchutchaLogo className="h-7 w-7" />
                            <span>Pitchutcha</span>
                        </a>
                        <nav className="hidden md:flex items-center space-x-6">
                            {navLinks.map(link => (
                                <a key={link.name} href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className="flex items-center text-sm text-zinc-300 hover:text-white transition-colors">
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
                         <a key={link.name} href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className="block text-zinc-300 hover:text-white">{link.name}</a>
                     ))}
                     <a href="#" className="block bg-green-500 text-white text-center px-4 py-2 rounded-md hover:bg-green-600 transition-colors">Comece seu projeto</a>
                     <a href="#" className="block text-center text-zinc-300 hover:text-white transition-colors">Entrar</a>
                 </div>
            )}
        </header>
    );
};

const CommandMenu: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void; navigate: (path: string) => void }> = ({ isOpen, setIsOpen, navigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const commandMenuRef = useRef<HTMLDivElement>(null);

    const commands = [
        { name: 'Documentação', icon: <BookOpenIcon/>, href: '/docs' },
        { name: 'Preços', icon: <TagIcon/>, href: '/pricing' },
        { name: 'Começar um Projeto', icon: <SparklesIcon/>, href: '#' },
        { name: 'Referência da CLI', icon: <CommandLineIcon/>, href: '/docs/project-setup'},
        { name: 'Status do Sistema', icon: <GlobeAltIcon/>, href: '/status'},
    ];

    const filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleCommandClick = (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      navigate(href);
      setIsOpen(false);
    }

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
                                <a href={`#${cmd.href}`} onClick={(e) => handleCommandClick(e, cmd.href)} className="flex items-center p-2 rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
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


// --- Componente de Layout Global ---
interface GlobalLayoutProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children, navigate }) => {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col">
      <CommandMenu isOpen={isCommandMenuOpen} setIsOpen={setIsCommandMenuOpen} navigate={navigate} />
      <Header setIsCommandMenuOpen={setIsCommandMenuOpen} navigate={navigate} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;