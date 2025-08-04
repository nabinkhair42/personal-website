import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

type NoteProps = PropsWithChildren & {
  title?: string;
  type?: 'note' | 'danger' | 'warning' | 'success';
};

const noteIcons = {
  note: Info,
  danger: XCircle,
  warning: AlertTriangle,
  success: CheckCircle,
};

export default function Note({
  children,
  title = 'Note',
  type = 'note',
}: NoteProps) {
  const Icon = noteIcons[type];

  const noteClassNames = clsx({
    'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800':
      type === 'note',
    'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50':
      type === 'danger',
    'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/50':
      type === 'warning',
    'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/50':
      type === 'success',
  });

  const iconColors = clsx({
    'text-zinc-600 dark:text-zinc-400': type === 'note',
    'text-red-600 dark:text-red-400': type === 'danger',
    'text-orange-600 dark:text-orange-400': type === 'warning',
    'text-green-600 dark:text-green-400': type === 'success',
  });

  const titleColors = clsx({
    'text-zinc-900 dark:text-zinc-100': type === 'note',
    'text-red-900 dark:text-red-100': type === 'danger',
    'text-orange-900 dark:text-orange-100': type === 'warning',
    'text-green-900 dark:text-green-100': type === 'success',
  });

  return (
    <div className={cn('relative my-6', noteClassNames)}>
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative border p-4">
        {/* Enhanced header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              'p-1.5 bg-white dark:bg-zinc-950 border border-current/20',
              iconColors
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2 flex-1">
            <h4
              className={cn(
                'font-mono text-sm uppercase tracking-wide font-medium',
                titleColors
              )}
            >
              {title}
            </h4>
            <div className="flex-1 h-px bg-current/20"></div>
          </div>
        </div>

        {/* Content */}
        <div className="text-sm text-zinc-700 dark:text-zinc-300 font-light leading-relaxed pl-10">
          {children}
        </div>
      </div>
    </div>
  );
}
