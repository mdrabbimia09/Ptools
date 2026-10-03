import React from 'react';
import { Tool } from '../../types';
import { Star, ArrowRight, Calculator, FileText, Binary, ShieldCheck, Code, Globe, Link, Search, Image, Palette, FileSpreadsheet, BookOpen, Table, Cloud, Folder, Video, Share2, Briefcase, GraduationCap, Clock, Archive, Compass, QrCode, Cpu, Sparkles, Languages, Laptop, Crop, Split, Minimize } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string, e: React.MouseEvent) => void;
  onClick: (tool: Tool) => void;
}

// Icon resolver helper
export const renderToolIcon = (iconName: string, className = 'w-5 h-5') => {
  switch (iconName) {
    case 'Calculator': return <Calculator className={className} />;
    case 'Percent': return <Calculator className={className} />;
    case 'Calendar': return <Clock className={className} />;
    case 'Activity': return <Compass className={className} />;
    case 'ArrowLeftRight': return <Compass className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Type': return <FileText className={className} />;
    case 'CaseSensitive': return <FileText className={className} />;
    case 'ListFilter': return <FileText className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Binary': return <Binary className={className} />;
    case 'Link': return <Link className={className} />;
    case 'Code': return <Code className={className} />;
    case 'Code2': return <Code className={className} />;
    case 'CheckCircle2': return <ShieldCheck className={className} />;
    case 'Minimize2': return <Minimize className={className} />;
    case 'Fingerprint': return <ShieldCheck className={className} />;
    case 'Key': return <ShieldCheck className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Pipette': return <Palette className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Layers': return <Palette className={className} />;
    case 'QrCode': return <QrCode className={className} />;
    case 'Image': return <Image className={className} />;
    case 'Crop': return <Crop className={className} />;
    case 'FileImage': return <Image className={className} />;
    case 'FileSpreadsheet': return <FileSpreadsheet className={className} />;
    case 'FilePlus': return <FileSpreadsheet className={className} />;
    case 'Split': return <Split className={className} />;
    case 'Minimize': return <Minimize className={className} />;
    case 'Table': return <Table className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Hourglass': return <Clock className={className} />;
    case 'Watch': return <Clock className={className} />;
    case 'Link2': return <Link className={className} />;
    case 'Search': return <Search className={className} />;
    case 'FileCode': return <Code className={className} />;
    case 'Cloud': return <Cloud className={className} />;
    case 'HardDrive': return <Cloud className={className} />;
    default: return <Code className={className} />;
  }
};

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(tool)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            {renderToolIcon(tool.icon)}
          </div>

          <button
            onClick={(e) => onToggleFavorite(tool.id, e)}
            className={`p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              isFavorite ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-slate-500'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label="Toggle favorite"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
          {tool.name}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>
      </div>

      {/* Clean unboxed metadata (anti-slop discipline: no pill capsules) */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
        <span className="capitalize">{tool.category.replace(/-/g, ' ')}</span>
        <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-0.5 transition-transform">
          Open Tool <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
