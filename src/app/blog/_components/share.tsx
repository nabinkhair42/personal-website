import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { BlogMdxFrontmatter } from "@/lib/markdown";
import {  Linkedin, Copy } from "lucide-react"
import Image from "next/image";
import { BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { toast } from "sonner";
import { CiShare2 } from "react-icons/ci";
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface ShareButtonProps {
    currentURL: string;
    formatter: BlogMdxFrontmatter
}

export function ShareButton({ formatter, currentURL }: ShareButtonProps) {
    const copyURL = () => {
        navigator.clipboard.writeText(currentURL);
        toast.success("URL copied to clipboard");
    }

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
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                    <CiShare2 className="h-4 w-4" />
                    <VisuallyHidden>Share this post</VisuallyHidden>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share {formatter.title}</DialogTitle>
                    <DialogDescription className="text-center">
                        Share this insightful article with your network
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    {/* Preview Card */}
                    <div className="overflow-hidden rounded-lg border bg-background">
                        <div className="relative h-48 w-full">
                            <Image
                                src={formatter.cover}
                                alt={formatter.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold line-clamp-1">{formatter.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {formatter.description}
                            </p>
                        </div>
                    </div>

                    {/* Social Share Buttons */}
                    <div className="flex justify-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => shareToSocial('twitter')}
                        >
                            <BsTwitterX className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="hover:text-[#4267B2] hover:border-[#4267B2]"
                            onClick={() => shareToSocial('facebook')}
                        >
                            <FaFacebook className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="hover:text-[#0077B5] hover:border-[#0077B5]" onClick={() => shareToSocial('linkedin')}
                        >
                            <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"

                            className="hover:text-[#075E54] hover:border-[#075E54]"

                            onClick={() => shareToSocial('whatsapp')}
                        >
                            <BsWhatsapp className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex-1 rounded-md border bg-muted px-3 py-2 text-sm">
                            <span className="line-clamp-1">{currentURL}</span>
                        </div>
                        <Button variant="secondary" size="icon" onClick={copyURL}>
                            <Copy className="h-4 w-4" />
                            
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
