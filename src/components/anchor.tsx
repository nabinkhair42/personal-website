'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';

type AnchorProps = ComponentProps<typeof Link> & {
  absolute?: boolean;
  activeClassName?: string;
  disabled?: boolean;
};

export default function Anchor({
  absolute,
  className = '',
  activeClassName = '',
  disabled,
  children,
  ...props
}: AnchorProps) {
  const path = usePathname();
  let isMatch = absolute
    ? props.href.toString().split('/')[1] === path.split('/')[1]
    : path === props.href;

  if (props.href.toString().includes('http')) isMatch = false;

  if (disabled)
    return (
      <div
        className={cn(
          'cursor-not-allowed opacity-50 text-zinc-400 dark:text-zinc-600',
          className
        )}
      >
        {children}
      </div>
    );

  return (
    <Link
      className={cn(
        'relative transition-all duration-300 hover:scale-[1.02]',
        className,
        isMatch && activeClassName
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
