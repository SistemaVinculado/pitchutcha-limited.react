
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, ShieldCheckIcon,
    EnvelopeIcon, ChevronDownIcon, ChevronUpIcon, InformationCircleIcon,
    LightBulbIcon, EyeIcon, CheckBadgeIcon, FireIcon, ExclamationCircleIcon,
    CalendarDaysIcon, CogIcon, WrenchScrewdriverIcon
} from './constants';
import { AnimatedSection } from './shared';

// --- Types ---
type Status = 'operational' | 'degraded' | 'outage' | 'under_maintenance';
type IncidentStatus = 'investigating' | 'identified' | 'monitoring' | 'resolved';
type MaintenanceStatus = 'upcoming' | 'in_progress' | 'completed';

interface SystemComponent {
    name: string;
    status: Status;
    group: string;
    description: string;
    statusMessage?: string;
}

interface Incident {
    title: string;
    severity: 'critical' | 'major' | 'minor';
    affectedComponents: string[];
    updates: IncidentUpdate[];
}

interface IncidentUpdate {
    timestamp: Date;
    description: string;
    status: IncidentStatus;
}

interface MaintenanceEvent {
    title: string;
    description: string;
    status: MaintenanceStatus;
    scheduledStart: Date;
    scheduledEnd: Date;
    affectedComponents: string[];
}

interface UptimePoint {
    date: string; // ISO string for key
    status: Status;
    label: string; // Formatted string for tooltip
}

// --- Mock Data Generation ---
const mockComponents: SystemComponent[] = [
    { name: 'API Global', status: 'degraded', group: 'Infraestrutura Principal', description: 'Processa todas as requisições REST e GraphQL recebidas.', statusMessage: 'Tempo de resposta p95 aumentado.' },
    { name: 'Dashboard', status: 'operational', group: 'Infraestrutura Principal', description: 'Interface de gerenciamento de projetos.' },
    { name: 'Banco de Dados (Leste dos EUA)', status: 'operational', group: 'Bancos de Dados', description: 'Servidores de banco de dados primários na região us-east-1.' },
    { name: 'Banco de Dados (Oeste da Europa)', status: 'operational', group: 'Bancos de Dados', description: 'Servidores de banco de dados primários na região eu-west-1.' },
    { name: 'Banco de Dados (Sudeste Asiático)', status: 'operational', group: 'Bancos de Dados', description: 'Servidores de banco de dados primários na região ap-southeast-1.' },
    { name: 'Autenticação', status: 'operational', group: 'Serviços de Backend', description: 'Gerencia o login de usuários e a emissão de JWTs.' },
    { name: 'Storage', status: 'operational', group: 'Serviços de Backend', description: 'Armazenamento e serviço de arquivos grandes.' },
    { name: 'Edge Functions', status: 'outage', group: 'Serviços de Backend', description: 'Execução de código serverless distribuído globalmente.', statusMessage: 'Invocações estão falhando em todas as regiões.' },
    { name: 'Realtime', status: 'operational', group: 'Serviços de Backend', description: 'Servidores WebSocket para transmissão de alterações do banco de dados.' },
];

const mockIncidents: Incident[] = [
    {
        title: "Falhas nas Edge Functions",
        severity: 'critical',
        affectedComponents: ['Edge Functions'],
        updates: [
            { timestamp: new Date(Date.now() - 15 * 60000), status: 'monitoring', description: 'A correção foi implementada e estamos monitorando os resultados. As invocações de funções estão se recuperando.' },
            { timestamp: new Date(Date.now() - 45 * 60000), status: 'identified', description: 'A causa raiz foi identificada em uma implantação recente de infraestrutura de rede. Estamos revertendo a alteração.' },
            { timestamp: new Date(Date.now() - 60 * 60000), status: 'investigating', description: 'Estamos investigando relatos de falhas na invocação de Edge Functions em todas as regiões.' },
        ]
    },
     {
        title: "Latência Elevada na API Global",
        severity: 'major',
        affectedComponents: ['API Global'],
        updates: [
            { timestamp: new Date(Date.now() - 10 * 60000), status: 'identified', description: 'A causa foi identificada como um pico de tráfego inesperado de um subconjunto de clientes. Estamos implementando medidas de limitação de taxa.' },
            { timestamp: new Date(Date.now() - 30 * 60000), status: 'investigating', description: 'Estamos investigando um aumento na latência p95 para requisições da API em todas as regiões.' },
        ]
    },
    {
        title: "Problemas intermitentes no Dashboard",
        severity: 'minor',
        affectedComponents: ['Dashboard'],
        updates: [
            { timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000), status: 'resolved', description: 'A causa raiz foi corrigida em uma nova implantação do frontend. Todos os sistemas estão operacionais.' },
            { timestamp: new Date(Date.now() - (2 * 24 + 1) * 60 * 60000), status: 'monitoring', description: 'A correção foi aplicada e estamos monitorando a estabilidade do serviço.' },
            { timestamp: new Date(Date.now() - (2 * 24 + 2) * 60 * 60000), status: 'identified', description: 'Identificamos um vazamento de memória no cache do lado do cliente.'},
            { timestamp: new Date(Date.now() - (2 * 24 + 3) * 60 * 60000), status: 'investigating', description: 'Alguns usuários relataram erros 500 intermitentes ao carregar projetos no Dashboard.' },
        ]
    }
];

const mockMaintenances: MaintenanceEvent[] = [
    {
        title: 'Atualização do cluster de Banco de Dados (Oeste da Europa)',
        description: 'Vamos aplicar patches de segurança e atualizações de versão menores nos clusters de banco de dados na região eu-west-1. Nenhuma interrupção é esperada, mas pode haver breves períodos de latência elevada.',
        status: 'upcoming',
        scheduledStart: new Date(Date.now() + 2 * 24 * 60 * 60000),
        scheduledEnd: new Date(Date.now() + (2 * 24 + 2) * 60 * 60000),
        affectedComponents: ['Banco de Dados (Oeste da Europa)']
    },
    {
        title: 'Manutenção da Rede de Storage',
        description: 'Realizando manutenção programada na infraestrutura de rede que suporta o serviço de Storage.',
        status: 'in_progress',
        scheduledStart: new Date(Date.now() - 1 * 60 * 60000),
        scheduledEnd: new Date(Date.now() + 3 * 60 * 60000),
        affectedComponents: ['Storage']
    },
    {
        title: 'Atualização do Painel de Controle',
        description: 'Implantamos uma nova versão do painel com melhorias de performance e novas funcionalidades.',
        status: 'completed',
        scheduledStart: new Date(Date.now() - 3 * 24 * 60 * 60000),
        scheduledEnd: new Date(Date.now() - (3 * 24 - 1) * 60 * 60000),
        affectedComponents: ['Dashboard']
    }
];

// --- Helper Objects & Functions ---

const statusMap: { [key in Status]: { text: string; icon: React.FC<any>; color: string; bgColor: string; } } = {
    operational: { text: 'Operacional', icon: CheckCircleIcon, color: 'text-green-400', bgColor: 'bg-green-500/10' },
    degraded: { text: 'Performance Degradada', icon: ExclamationTriangleIcon, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
    outage: { text: 'Interrupção de Serviço', icon: XCircleIcon, color: 'text-red-400', bgColor: 'bg-red-500/10' },
    under_maintenance: { text: 'Em Manutenção', icon: WrenchScrewdriverIcon, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
};

const incidentStatusMap: { [key in IncidentStatus]: { text: string; icon: React.FC<any>; color: string; } } = {
    investigating: { text: 'Investigando', icon: LightBulbIcon, color: 'text-blue-400' },
    identified: { text: 'Identificado', icon: EyeIcon, color: 'text-purple-400' },
    monitoring: { text: 'Monitorando', icon: ShieldCheckIcon, color: 'text-yellow-400' },
    resolved: { text: 'Resolvido', icon: CheckBadgeIcon, color: 'text-green-400' },
};

const maintenanceStatusMap: { [key in MaintenanceStatus]: { text: string; icon: React.FC<any>; color: string; } } = {
    in_progress: { text: 'Em Progresso', icon: CogIcon, color: 'text-blue-400' },
    upcoming: { text: 'Agendada', icon: CalendarDaysIcon, color: 'text-yellow-400' },
    completed: { text: 'Concluída', icon: CheckCircleIcon, color: 'text-green-400' },
};

const formatShortDate = (date: Date) => date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
const formatTime = (date: Date) => date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "agora mesmo";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} dia${days > 1 ? 's' : ''} atrás`;
    return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
};

const generateUptimeData = (componentName: string, currentStatus: Status, range: '90d' | '30d' | '7d' | '24h'): UptimePoint[] => {
    const history: UptimePoint[] = [];
    const now = new Date();
    const hash = componentName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const getMockStatus = (index: number): Status => {
        const randomFactor = (hash + index) % 100;
        if (randomFactor > 97) return 'outage';
        if (randomFactor > 94) return 'degraded';
        return 'operational';
    };

    if (range === '24h') {
        for (let i = 23; i >= 0; i--) {
            const date = new Date(now);
            date.setHours(now.getHours() - i);
            const status = i === 0 ? (currentStatus === 'under_maintenance' ? 'operational' : currentStatus) : getMockStatus(i);
            history.push({
                date: date.toISOString(),
                status: status,
                label: `${date.getHours()}:00 - ${date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}: ${statusMap[status].text}`
            });
        }
    } else {
        const days = { '90d': 89, '30d': 29, '7d': 6 }[range];
        for (let i = days; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(now.getDate() - i);
            const status = i === 0 ? (currentStatus === 'under_maintenance' ? 'operational' : currentStatus) : getMockStatus(i + date.getDate()); // Add date to hash for more variance
             history.push({
                date: date.toISOString().split('T')[0],
                status: status,
                label: `${date.toISOString().split('T')[0]}: ${statusMap[status].text}`
            });
        }
    }
    return history;
};

// --- Sub Components ---

const Tooltip: React.FC<{ text: string; children: React.ReactElement }> = ({ text, children }) => (
    <div className="group relative flex justify-center">
        {children}
        <span className="absolute bottom-full mb-2 w-max max-w-xs scale-0 rounded bg-zinc-800 p-2 text-center text-xs text-white transition-all group-hover:scale-100 origin-bottom z-10">
            {text}
        </span>
    </div>
);

const StatusIndicator: React.FC<{ status: Status }> = ({ status }) => {
    const { icon: Icon, color } = statusMap[status];
    return <Icon className={`h-6 w-6 ${color}`} />;
};

const OverallStatusBanner: React.FC<{ components: SystemComponent[] }> = ({ components }) => {
    const [overallStatus, message] = useMemo(() => {
        const outages = components.filter(c => c.status === 'outage');
        const degradations = components.filter(c => c.status === 'degraded');
        const maintenances = components.filter(c => c.status === 'under_maintenance');

        const messages: string[] = [];
        
        if (outages.length > 0) {
            messages.push(`${outages.length} Interrupção de Serviço${outages.length > 1 ? 's' : ''}`);
        }
        if (degradations.length > 0) {
            messages.push(`${degradations.length} Serviço${degradations.length > 1 ? 's' : ''} com Performance Degradada`);
        }
        if (maintenances.length > 0) {
            messages.push(`${maintenances.length} Serviço${maintenances.length > 1 ? 's' : ''} em Manutenção`);
        }

        const finalMessage = messages.join(', ').replace(/,([^,]*)$/, ' e$1');

        if (outages.length > 0) {
            return ['outage', finalMessage];
        }
        if (degradations.length > 0) {
            return ['degraded', finalMessage];
        }
        if (maintenances.length > 0) {
            return ['under_maintenance', finalMessage];
        }

        return ['operational', 'Todos os sistemas estão operacionais.'];
    }, [components]);

    const statusInfo = statusMap[overallStatus as Status];
    const { text, icon: Icon, color, bgColor } = statusInfo;
    
    if (overallStatus === 'operational') {
        return (
             <div className="p-6 rounded-lg border border-zinc-800 bg-green-500/10">
                <div className="flex items-center">
                    <CheckBadgeIcon className="h-10 w-10 mr-4 text-green-400" />
                    <div>
                        <h2 className="text-2xl font-bold text-green-400">Tudo Certo</h2>
                        <p className="text-zinc-300">{message}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`p-6 rounded-lg border border-zinc-800 ${bgColor}`}>
            <div className="flex items-center">
                <Icon className={`h-10 w-10 mr-4 ${color}`} />
                <div>
                    <h2 className={`text-2xl font-bold ${color}`}>{text}</h2>
                    <p className="text-zinc-300">{message}</p>
                </div>
            </div>
        </div>
    );
};

const ComponentGroup: React.FC<{ groupName: string; components: SystemComponent[] }> = ({ groupName, components }) => {
    const [isOpen, setIsOpen] = useState(true);
    
    const groupStatus = useMemo<Status>(() => {
        if (components.some(c => c.status === 'outage')) return 'outage';
        if (components.some(c => c.status === 'degraded')) return 'degraded';
        if (components.some(c => c.status === 'under_maintenance')) return 'under_maintenance';
        return 'operational';
    }, [components]);

    const { icon: GroupStatusIcon, color: groupStatusColor } = statusMap[groupStatus];

    return (
        <div className="bg-[#1c1c1c] p-4 rounded-lg border border-zinc-800">
            <button className="w-full flex justify-between items-center text-left" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center space-x-3">
                    <GroupStatusIcon className={`h-5 w-5 ${groupStatusColor}`} />
                    <h3 className="text-lg font-semibold text-white">{groupName}</h3>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDownIcon className="h-5 w-5 text-zinc-500" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                >
                    <div className="space-y-3 mt-4 pt-3 border-t border-zinc-800/50">
                        {components.map(component => (
                            <div key={component.name} className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-md">
                                <div className="flex items-center space-x-3">
                                    <span className="font-medium text-zinc-300">{component.name}</span>
                                    <Tooltip text={component.description}>
                                        <InformationCircleIcon className="h-5 w-5 text-zinc-500 cursor-pointer" />
                                    </Tooltip>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-right">
                                    <span className={statusMap[component.status].color}>
                                        {component.statusMessage || statusMap[component.status].text}
                                    </span>
                                    <StatusIndicator status={component.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

const ComponentStatusList: React.FC<{ components: SystemComponent[] }> = ({ components }) => {
    const groupedComponents = useMemo(() => {
        return components.reduce((acc, component) => {
            (acc[component.group] = acc[component.group] || []).push(component);
            return acc;
        }, {} as Record<string, SystemComponent[]>);
    }, [components]);

    return (
        <div className="space-y-6">
            {Object.entries(groupedComponents).map(([groupName, componentsInGroup]) => (
                <ComponentGroup key={groupName} groupName={groupName} components={componentsInGroup} />
            ))}
        </div>
    );
};

const UptimeHistory: React.FC<{ components: SystemComponent[] }> = ({ components }) => {
    type TimeRange = '90d' | '30d' | '7d' | '24h';
    const [timeRange, setTimeRange] = useState<TimeRange>('90d');
    const [uptimeData, setUptimeData] = useState<Record<string, UptimePoint[]>>({});
    
    useEffect(() => {
        const data: Record<string, UptimePoint[]> = {};
        components.forEach(c => {
            data[c.name] = generateUptimeData(c.name, c.status, timeRange);
        });
        setUptimeData(data);
    }, [components, timeRange]);

    const rangeDetails = useMemo(() => ({
        '90d': { label: '90 dias', start: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000), gridCols: 90 },
        '30d': { label: '30 dias', start: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), gridCols: 30 },
        '7d': { label: '7 dias', start: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), gridCols: 7 },
        '24h': { label: '24 horas', start: new Date(Date.now() - 23 * 60 * 60 * 1000), gridCols: 24 }
    }), []);
    
    const currentRange = rangeDetails[timeRange];
    const endLabel = timeRange === '24h' ? 'Agora' : 'Hoje';
    const startLabel = timeRange === '24h' ? '24 horas atrás' : formatShortDate(currentRange.start);

    const statusColorClass = {
        operational: 'bg-green-500',
        degraded: 'bg-yellow-500',
        outage: 'bg-red-500',
        under_maintenance: 'bg-green-500' // Rendered as operational
    };
    
    const timeRanges: { id: TimeRange; label: string }[] = [
        { id: '24h', label: '24 Horas' },
        { id: '7d', label: '7 Dias' },
        { id: '30d', label: '30 Dias' },
        { id: '90d', label: '90 Dias' },
    ];

    return (
        <div className="bg-[#1c1c1c] p-4 rounded-lg border border-zinc-800 overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                 <h2 className="text-xl font-bold mb-2 sm:mb-0">Histórico de Uptime</h2>
                 <div className="flex items-center space-x-1 bg-zinc-800/50 p-1 rounded-lg">
                    {timeRanges.map(range => (
                        <button 
                            key={range.id}
                            onClick={() => setTimeRange(range.id)}
                            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${timeRange === range.id ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'}`}
                        >
                            {range.label}
                        </button>
                    ))}
                 </div>
            </div>
            <div className="flex justify-between items-center mb-4 text-xs text-zinc-400">
                <span>{startLabel}</span>
                <span>&larr; {currentRange.label} &rarr;</span>
                <span>{endLabel}</span>
            </div>
            <div className="space-y-3 min-w-[800px]">
                {components.map(component => (
                    <div key={component.name} className="grid grid-cols-[200px,1fr] items-center gap-x-3">
                        <span className="text-sm font-medium text-zinc-300 truncate">{component.name}</span>
                        <div className={`grid grid-cols-[repeat(${currentRange.gridCols},minmax(0,1fr))] gap-px bg-zinc-700 p-px rounded`}>
                            {uptimeData[component.name]?.map((point) => (
                                <Tooltip key={point.date} text={point.label}>
                                    <motion.div 
                                        className={`h-5 w-full ${statusColorClass[point.status]}`}
                                        whileHover={{ transform: 'scale(1.2)', zIndex: 1, position: 'relative' }}
                                        transition={{ duration: 0.1 }}
                                    ></motion.div>
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end space-x-4 mt-4 text-xs">
                <div className="flex items-center space-x-1.5"><div className="w-3 h-3 bg-green-500 rounded-sm"></div><span>Operacional</span></div>
                <div className="flex items-center space-x-1.5"><div className="w-3 h-3 bg-yellow-500 rounded-sm"></div><span>Degradado</span></div>
                <div className="flex items-center space-x-1.5"><div className="w-3 h-3 bg-red-500 rounded-sm"></div><span>Interrupção</span></div>
            </div>
        </div>
    );
};


const IncidentHistoryItem: React.FC<{ incident: Incident }> = ({ incident }) => {
    const isResolved = incident.updates[0].status === 'resolved';
    const [isOpen, setIsOpen] = useState(!isResolved);
    const [showAllUpdates, setShowAllUpdates] = useState(false);
    
    const updatesToShow = 3;
    const hasMoreUpdates = incident.updates.length > updatesToShow;
    const displayedUpdates = showAllUpdates ? incident.updates : incident.updates.slice(0, updatesToShow);

    const severityMap = {
        critical: { text: 'Crítico', icon: FireIcon, color: 'text-red-400' },
        major: { text: 'Grave', icon: ExclamationCircleIcon, color: 'text-orange-400' },
        minor: { text: 'Menor', icon: ExclamationTriangleIcon, color: 'text-yellow-400' },
    };
    
    const { icon: SeverityIcon, color: severityColor } = severityMap[incident.severity];
    const latestUpdate = incident.updates[0];
    const { icon: StatusIcon, color: statusColor, text: statusText } = incidentStatusMap[latestUpdate.status];

    return (
        <div className="bg-[#1c1c1c] p-4 rounded-lg border border-zinc-800">
            <button className="w-full flex justify-between items-center text-left" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    <h3 className="font-semibold text-white">{incident.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-zinc-400 mt-1">
                        <span className={`flex items-center space-x-1.5 ${severityColor}`}>
                            <SeverityIcon className="h-4 w-4" />
                            <span>{severityMap[incident.severity].text}</span>
                        </span>
                        <span className={`flex items-center space-x-1.5 ${statusColor}`}>
                            <StatusIcon className="h-4 w-4" />
                            <span>{statusText}</span>
                        </span>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDownIcon className="h-5 w-5 text-zinc-500" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                >
                    <div className="mt-4 pt-4 border-t border-zinc-700/50">
                        <div className="text-xs text-zinc-400 mb-4">
                            <span className="font-semibold">Componentes Afetados:</span> {incident.affectedComponents.join(', ')}
                        </div>
                        <div className="pl-5 border-l-2 border-zinc-700 space-y-4">
                            {displayedUpdates.map((update, i) => (
                                 <div key={i} className="relative">
                                    <div className={`absolute -left-[15px] top-1 h-3 w-3 rounded-full bg-zinc-700 border-2 border-[#1c1c1c]`}>
                                        {i === 0 && !isResolved && (
                                            <div className={`absolute -inset-1 rounded-full animate-ping ${incidentStatusMap[update.status].color.replace('text-','bg-')} opacity-75`}></div>
                                        )}
                                        <div className={`h-full w-full rounded-full ${incidentStatusMap[update.status].color.replace('text-', 'bg-')}`}></div>
                                    </div>
                                    <p className="font-semibold text-zinc-400 text-sm">
                                        <span className="font-mono">{timeAgo(update.timestamp)}</span> - <span className={incidentStatusMap[update.status].color}>{incidentStatusMap[update.status].text}</span>
                                    </p>
                                    <p className="text-zinc-300 mt-1">{update.description}</p>
                                </div>
                            ))}
                        </div>
                        {hasMoreUpdates && (
                            <div className="pl-5 mt-4">
                                <button 
                                    onClick={() => setShowAllUpdates(!showAllUpdates)} 
                                    className="text-sm text-green-400 hover:text-white transition-colors"
                                >
                                    {showAllUpdates ? 'Mostrar menos atualizações' : `Mostrar histórico completo (${incident.updates.length - updatesToShow} mais)`}
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

const CollapsibleSection: React.FC<{ title: string, children: React.ReactNode, defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div>
            <button className="w-full flex justify-between items-center text-left mb-4" onClick={() => setIsOpen(!isOpen)}>
                <h2 className="text-2xl font-bold">{title}</h2>
                 <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronUpIcon className="h-6 w-6 text-zinc-500" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                     <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-4">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const IncidentHistory: React.FC<{ incidents: Incident[] }> = ({ incidents }) => {
    const activeIncidents = incidents.filter(inc => inc.updates[0].status !== 'resolved');
    const pastIncidents = incidents.filter(inc => inc.updates[0].status === 'resolved');

    return (
        <div className="space-y-8">
            {activeIncidents.length > 0 && (
                 <CollapsibleSection title="Incidentes Ativos">
                    {activeIncidents.map((incident, i) => <IncidentHistoryItem key={i} incident={incident} />)}
                </CollapsibleSection>
            )}
            {pastIncidents.length > 0 && (
                <CollapsibleSection title="Histórico de Incidentes" defaultOpen={activeIncidents.length === 0}>
                    {pastIncidents.map((incident, i) => <IncidentHistoryItem key={i} incident={incident} />)}
                </CollapsibleSection>
            )}
        </div>
    );
};

const MaintenanceSchedule: React.FC<{ maintenances: MaintenanceEvent[] }> = ({ maintenances }) => {
    const inProgress = maintenances.filter(m => m.status === 'in_progress');
    const upcoming = maintenances.filter(m => m.status === 'upcoming');
    const completed = maintenances.filter(m => m.status === 'completed').slice(0, 3); // Show last 3

    const MaintenanceItem: React.FC<{ event: MaintenanceEvent }> = ({ event }) => {
        const { text, icon: Icon, color } = maintenanceStatusMap[event.status];
        return (
            <div className="p-4 bg-zinc-900/50 rounded-lg">
                <p className={`flex items-center space-x-2 font-semibold ${color}`}>
                    <Icon className="h-5 w-5" />
                    <span>{text}</span>
                </p>
                <h4 className="font-semibold text-white mt-2">{event.title}</h4>
                <p className="text-sm text-zinc-400 mt-1">{event.description}</p>
                 <div className="text-xs text-zinc-400 mt-2">
                    <span className="font-semibold">Componentes Afetados:</span> {event.affectedComponents.join(', ')}
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                    De {formatShortDate(event.scheduledStart)}, {formatTime(event.scheduledStart)} até {formatShortDate(event.scheduledEnd)}, {formatTime(event.scheduledEnd)}
                </p>
            </div>
        );
    };

    return (
        <div className="bg-[#1c1c1c] p-4 rounded-lg border border-zinc-800 space-y-6">
            <h2 className="text-xl font-bold">Manutenções Agendadas</h2>
            {inProgress.length === 0 && upcoming.length === 0 && <p className="text-sm text-zinc-400">Nenhuma manutenção em progresso ou agendada.</p>}
            {inProgress.length > 0 && (
                <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-white">Em Progresso</h3>
                    {inProgress.map(event => <MaintenanceItem key={event.title} event={event} />)}
                </div>
            )}
            {upcoming.length > 0 && (
                <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-white">Agendadas</h3>
                    {upcoming.map(event => <MaintenanceItem key={event.title} event={event} />)}
                </div>
            )}
            {completed.length > 0 && (
                 <div className="space-y-3 pt-4 border-t border-zinc-800/50">
                    <h3 className="font-semibold text-lg text-white">Concluídas Recentes</h3>
                    {completed.map(event => <MaintenanceItem key={event.title} event={event} />)}
                </div>
            )}
        </div>
    );
};

const SubscribeForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
        }
    };

    if (subscribed) {
        return (
            <div className="text-center p-6 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <CheckCircleIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="font-semibold text-white">Inscrição bem-sucedida!</p>
                <p className="text-sm text-zinc-400">Você receberá atualizações de status em {email}.</p>
            </div>
        );
    }

    return (
        <div className="text-center p-6 bg-[#1c1c1c] rounded-lg border border-zinc-800">
            <EnvelopeIcon className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">Inscreva-se para receber atualizações</h3>
            <p className="text-sm text-zinc-400 mt-1 mb-4 max-w-sm mx-auto">Receba notificações por e-mail sempre que a Pitchutcha criar ou atualizar um incidente.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
                <label htmlFor="status-email-subscribe" className="sr-only">Endereço de e-mail</label>
                <input 
                    id="status-email-subscribe"
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="seu-email@example.com"
                    required
                    className="flex-grow bg-zinc-800/50 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-green-600 transition-colors">
                    Inscrever-se
                </button>
            </form>
        </div>
    );
};


// --- Main Page Component ---
const StatusPage: React.FC = () => {
    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setLastUpdated(new Date()), 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);
    
    // FIX: Explicitly type `processedComponents` as `SystemComponent[]` to resolve a type inference issue.
    const processedComponents: SystemComponent[] = useMemo(() => {
        const componentsUnderMaintenance = mockMaintenances
            .filter(m => m.status === 'in_progress')
            .flatMap(m => m.affectedComponents);

        return mockComponents.map(c => {
            if (componentsUnderMaintenance.includes(c.name) && c.status === 'operational') {
                return { ...c, status: 'under_maintenance', statusMessage: 'Atividades de manutenção em andamento.' };
            }
            return c;
        });
    }, []);

    return (
        <>
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(50,205,50,0.15),rgba(255,255,255,0))]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection className="text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                           Status do Sistema
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-400">
                           Bem-vindo à página de status da Pitchutcha. Aqui você encontrará informações em tempo real sobre a saúde e o uptime dos nossos serviços.
                        </p>
                        <p className="text-sm text-zinc-500 mt-2">
                            Última atualização: {formatTime(lastUpdated)} (Seu fuso horário local)
                        </p>
                    </AnimatedSection>

                    <div className="max-w-5xl mx-auto mt-12 space-y-12">
                       <AnimatedSection><OverallStatusBanner components={processedComponents} /></AnimatedSection>
                       <AnimatedSection delay={100}><ComponentStatusList components={processedComponents} /></AnimatedSection>
                       
                       <AnimatedSection delay={200}><UptimeHistory components={processedComponents} /></AnimatedSection>

                       <AnimatedSection delay={300}><IncidentHistory incidents={mockIncidents} /></AnimatedSection>
                       
                       <AnimatedSection delay={400}><MaintenanceSchedule maintenances={mockMaintenances} /></AnimatedSection>
                       <AnimatedSection delay={500}><SubscribeForm /></AnimatedSection>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StatusPage;
