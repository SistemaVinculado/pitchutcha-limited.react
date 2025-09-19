import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ClipboardIcon, ClipboardCheckIcon, InformationCircleIcon, LightBulbIcon, ExclamationTriangleIcon } from '../constants';

// --- Reusable Components ---
interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const highlightedCode = useMemo(() => {
        let tempCode = code;
        tempCode = tempCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        tempCode = tempCode.replace(/(\/\/.+)/g, '<span class="text-gray-500">$1</span>');
        tempCode = tempCode.replace(/('.*?'|`.*?`|--.+)/g, '<span class="text-green-400">$1</span>');
        tempCode = tempCode.replace(/\b(import|from|export|const|let|var|async|await|new|return|if|else|in|of|for|while|switch|case|break|continue|function|=>|throw|try|catch|finally|SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|POLICY|ON|FOR|USING|ALTER|ENABLE|ROW|LEVEL|SECURITY|ORDER|BY|DESC|LIMIT)\b/gi, '<span class="text-purple-400">$1</span>');
        tempCode = tempCode.replace(/\b(true|false|null|undefined)\b/g, '<span class="text-red-400">$1</span>');
        tempCode = tempCode.replace(/([a-zA-Z_]\w*)\s*\(/g, '<span class="text-yellow-400">$1</span>(');
        tempCode = tempCode.replace(/(\b[A-Z][a-zA-Z_]\w*\b)/g, '<span class="text-cyan-400">$1</span>');
        tempCode = tempCode.replace(/({|}|[|]|,|\.|:|;)/g, '<span class="text-zinc-400">$1</span>');
        return tempCode;
    }, [code]);


    return (
        <div className="bg-[#1c1c1c] rounded-lg border border-zinc-700/50 my-6">
            <div className="flex justify-between items-center px-4 py-2 bg-zinc-800/50 border-b border-zinc-700/50">
                <span className="text-xs font-semibold text-zinc-400 uppercase">{language}</span>
                <button onClick={handleCopy} className="text-zinc-400 hover:text-white transition-colors" aria-label="Copiar código">
                    {copied ? <ClipboardCheckIcon className="h-5 w-5 text-green-400" /> : <ClipboardIcon className="h-5 w-5" />}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code className="font-mono text-sm text-zinc-300 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
        </div>
    );
};

interface CalloutProps {
    type?: 'info' | 'warning' | 'tip';
    children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type = 'info', children }) => {
    const styles = {
        info: {
            icon: InformationCircleIcon,
            borderColor: 'border-blue-500',
            bgColor: 'bg-blue-500/10',
            textColor: 'text-blue-300',
        },
        warning: {
            icon: ExclamationTriangleIcon,
            borderColor: 'border-yellow-500',
            bgColor: 'bg-yellow-500/10',
            textColor: 'text-yellow-300',
        },
        tip: {
            icon: LightBulbIcon,
            borderColor: 'border-green-500',
            bgColor: 'bg-green-500/10',
            textColor: 'text-green-300',
        }
    };

    const { icon: Icon, borderColor, bgColor, textColor } = styles[type];

    return (
        <div className={`border-l-4 ${borderColor} ${bgColor} p-4 my-6 rounded-r-lg flex items-start space-x-4`}>
            <Icon className={`h-6 w-6 flex-shrink-0 mt-0.5 ${textColor.replace('text-', 'text-')}`} />
            <div className={`prose-p:my-0 prose-p:text-zinc-300`}>
                {children}
            </div>
        </div>
    );
};