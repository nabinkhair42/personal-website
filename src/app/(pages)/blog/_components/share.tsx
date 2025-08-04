import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BlogMdxFrontmatter } from '@/lib/markdown';
import { Linkedin, Copy, Share2 } from 'lucide-react';
import Image from 'next/image';
import { BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { toast } from 'sonner';

interface ShareButtonProps {
  currentURL: string;
  formatter: BlogMdxFrontmatter;
}

export function ShareButton({ formatter, currentURL }: ShareButtonProps) {
  const copyURL = () => {
    navigator.clipboard.writeText(currentURL);
    toast.success('URL copied to clipboard');
  };

  const shareToSocial = (platform: string) => {
    let url = '';
    const text = `Check out "${formatter.title}" by ${formatter.authors[0].username}`;

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentURL)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentURL)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(currentURL)}`;
        break;
      default:
        break;
    }

    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-300"
        >
          <Share2 className="h-4 w-4 mr-2" />
          <span className="font-mono text-xs uppercase tracking-wide">
            Share
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
            Share Article
          </DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-400 font-light">
            Share this insightful article with your network
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Card */}
          <div className="overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="relative h-32 w-full">
              <Image
                src={formatter.cover}
                alt={formatter.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-light text-zinc-900 dark:text-zinc-100 line-clamp-1 mb-2">
                {formatter.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light line-clamp-2">
                {formatter.description}
              </p>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-4 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => shareToSocial('twitter')}
              className="flex flex-col items-center gap-2 h-16 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300"
            >
              <BsTwitterX className="h-5 w-5" />
              <span className="text-xs font-mono">X</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => shareToSocial('facebook')}
              className="flex flex-col items-center gap-2 h-16 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-[#4267B2] transition-all duration-300"
            >
              <FaFacebook className="h-5 w-5" />
              <span className="text-xs font-mono">Facebook</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => shareToSocial('linkedin')}
              className="flex flex-col items-center gap-2 h-16 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-[#0077B5] transition-all duration-300"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-xs font-mono">LinkedIn</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => shareToSocial('whatsapp')}
              className="flex flex-col items-center gap-2 h-16 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-[#075E54] transition-all duration-300"
            >
              <BsWhatsapp className="h-5 w-5" />
              <span className="text-xs font-mono">WhatsApp</span>
            </Button>
          </div>

          {/* Copy URL */}
          <div className="flex items-center gap-3">
            <div className="flex-1 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-mono">
              <span className="line-clamp-1 text-zinc-700 dark:text-zinc-300">
                {currentURL}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyURL}
              className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
