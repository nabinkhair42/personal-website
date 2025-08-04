import { ComponentProps } from 'react';
import NextImage from 'next/image';

type Height = ComponentProps<typeof NextImage>['height'];
type Width = ComponentProps<typeof NextImage>['width'];

export default function Image({
  src,
  alt = 'Image',
  width = 800,
  height = 350,
  ...props
}: ComponentProps<'img'>) {
  if (!src) return null;

  return (
    <div className="relative my-8 group">
      {/* Enhanced image container */}
      <div className="relative overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
        <NextImage
          src={src}
          alt={alt}
          width={width as Width}
          height={height as Height}
          quality={90}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          {...props}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Image caption if alt text is provided */}
      {alt !== 'Image' && (
        <div className="mt-3 text-center">
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            {alt}
          </p>
          <div className="mx-auto mt-1 w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
        </div>
      )}
    </div>
  );
}
