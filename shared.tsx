import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
    ArrowRightIcon, PostGisIcon, PgCronIcon, PgNetIcon, PgGraphqlIcon, PlayIcon
} from './constants';

// Custom Hook for animations on scroll
const useOnScreen = <T extends Element,>(options?: IntersectionObserverInit): [React.RefObject<T>, boolean] => {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', delay = 0 }) => {
    const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export const useTypingAnimation = (commands: string[], loop: boolean = true) => {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState('');
    const [commandIndex, setCommandIndex] = useState(0);

    const runAnimation = useCallback(() => {
        setLines([]);
        setCurrentLine('');
        setCommandIndex(0);
        let currentLines: string[] = [];

        const typeCommand = (index: number) => {
            if (index >= commands.length) {
                if(loop) {
                    setTimeout(runAnimation, 2000);
                }
                return;
            }

            const command = commands[index];
            if (command.startsWith('✔')) {
                currentLines.push(command);
                setLines([...currentLines]);
                typeCommand(index + 1);
            } else {
                let charIndex = 0;
                const interval = setInterval(() => {
                    setCurrentLine(command.substring(0, charIndex + 1));
                    charIndex++;
                    if (charIndex === command.length) {
                        clearInterval(interval);
                        currentLines.push(command);
                        setLines([...currentLines]);
                        setCurrentLine('');
                        setTimeout(() => typeCommand(index + 1), 500);
                    }
                }, 50);
            }
        };

        typeCommand(0);
    }, [commands, loop]);
    
    useEffect(() => {
        runAnimation();
    }, [runAnimation]);

    return { lines, currentLine };
}

export const ExtensionsSection: React.FC = () => {
    const extensions = [
        { icon: <PostGisIcon />, name: 'PostGIS', description: 'Adicione suporte para objetos geográficos ao seu banco de dados Postgres.' },
        { icon: <PgCronIcon />, name: 'pg_cron', description: 'Agende tarefas periódicas e comandos SQL diretamente do seu banco de dados.' },
        { icon: <PgNetIcon />, name: 'pg_net', description: 'Faça requisições de rede assíncronas (HTTP/S) a partir do seu banco de dados.' },
        { icon: <PgGraphqlIcon />, name: 'pg_graphql', description: 'Exponha uma API GraphQL com um único comando SQL, sem código adicional.' },
    ];
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Supercarregue seu Banco de Dados com Extensões</h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Aproveite o poder e a flexibilidade do ecossistema PostgreSQL com nossas extensões selecionadas, disponíveis com um clique.
                    </p>
                </AnimatedSection>
                 <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {extensions.map((ext, i) => (
                        <AnimatedSection key={ext.name} delay={i * 100}>
                            <div className="group relative h-full">
                               <div className="gradient-border absolute inset-0 rounded-xl"></div>
                                <div className="relative p-8 bg-[#1c1c1c] rounded-lg h-full flex flex-col text-left">
                                    <div className="flex items-center space-x-3">
                                        {React.cloneElement(ext.icon, { className: 'h-7 w-7 text-green-400 group-hover:scale-110 transition-transform duration-300' })}
                                        <h3 className="text-xl font-semibold">{ext.name}</h3>
                                    </div>
                                    <p className="mt-3 text-zinc-400 flex-grow">{ext.description}</p>
                                    <div className="mt-6 font-semibold text-green-400 flex items-center group-hover:text-white transition-colors">
                                        Saber mais
                                        <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const CTASection: React.FC<{
    title?: string;
    description?: string;
    buttonText?: string;
    buttonIcon?: React.ReactNode;
}> = ({
    title = "Comece a construir em minutos",
    description = "Inicie seu próximo projeto com o generoso plano gratuito da Pitchutcha. Escale conforme você cresce.",
    buttonText = "Comece seu projeto",
    buttonIcon = <PlayIcon className="h-6 w-6 mr-2" />
}) => (
    <section className="py-20">
        <div className="container mx-auto px-4">
            <AnimatedSection>
                <div className="relative bg-[#1c1c1c] border border-zinc-800 rounded-lg p-12 text-center overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(50,205,50,0.2),transparent_60%)]"></div>
                     <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
                     <p className="mt-4 max-w-xl mx-auto text-lg text-zinc-400">{description}</p>
                     <div className="mt-8">
                         <a href="#" className="inline-block bg-green-500 text-white px-8 py-4 rounded-md font-semibold hover:bg-green-600 transition-transform hover:scale-105 shadow-lg shadow-green-500/20">
                             <div className="flex items-center">
                                {buttonIcon}
                                <span>{buttonText}</span>
                             </div>
                         </a>
                     </div>
                </div>
            </AnimatedSection>
        </div>
    </section>
);