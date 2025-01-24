"use client";

import { BlogMdxFrontmatter } from "@/lib/markdown";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ViewCounter from "./view-counter";
import { formatDate } from "@/lib/utils";
import { ShareButton } from "./share";

interface TitleProps {
    formatter: BlogMdxFrontmatter;
    slug: string;
    currentURL: string;
}

export const Title = ({ formatter, slug, currentURL }: TitleProps) => {

    return (
        <section className="text-center px-4 py-20 border-b">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 flex flex-col items-center"
            >
                <h1 className="text-4xl font-bold">{formatter.title}</h1>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                            {formatDate(formatter.date)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-8 flex-wrap">
                    {formatter.authors.map((author) => {
                        return (
                            <Link
                                href={author.handleUrl}
                                className="flex items-center gap-4"
                                key={author.username}
                            >
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={author.avatar} />
                                    <AvatarFallback>
                                        {author.username.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-left">
                                    {author.username}
                                    <p className="font-code text-[13px] text-muted-foreground">
                                        @{author.handle}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex items-center gap-4"> <ViewCounter slug={slug} />
                    <ShareButton
                        currentURL={currentURL}
                        formatter={formatter}

                    /></div>
            </motion.div>
        </section>
    );
};
