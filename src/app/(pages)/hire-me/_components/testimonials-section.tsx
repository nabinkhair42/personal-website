"use client";

import { testimonials } from "@/constants/testimonials";
import { motion } from "framer-motion";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Quote } from 'lucide-react';
import { TestimonialSkeleton } from "@/components/ui/ui-extend/testimonial-skeleton";

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 border-b">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl text-center">
            {/* Don&apos;t just take my word for it. Here&apos;s what some of my clients have to say about working with me. */}
           Currently collecting testimonials from the clients I have worked with, so please hold on for their valuable feedback.
          </p>
        </div>

        {/* <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> */}
         <div className="flex flex-wrap gap-6 items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <TestimonialSkeleton key={index} />
            // <motion.div
            //   key={testimonial.name}
            //   initial={{ opacity: 0, y: 20 }}
            //   whileInView={{ opacity: 1, y: 0 }}
            //   transition={{ duration: 0.5, delay: index * 0.1 }}
            //   viewport={{ once: true }}
            // >
              
            //   <Card className="h-full flex flex-col rounded-2xl bg-card shadow-lg ring-1 ring-border/50 hover:shadow-xl hover:ring-primary/50 transition-all">
            //     <CardContent className="flex-grow p-6">
            //       <Quote className="h-8 w-8 text-primary/20 mb-4" />
            //       <blockquote className="space-y-2">
            //         <p className="text-muted-foreground leading-relaxed">
            //           {testimonial.content}
            //         </p>
            //       </blockquote>
            //     </CardContent>
            //     <CardFooter className="p-6 pt-0 flex items-center gap-4">
            //       <Avatar className="h-10 w-10 border-2 border-primary/10">
            //         <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            //         <AvatarFallback className="bg-primary/5">
            //           {testimonial.name
            //             .split(" ")
            //             .map((n) => n[0])
            //             .join("")}
            //         </AvatarFallback>
            //       </Avatar>
            //       <div className="flex flex-col">
            //         <div className="font-semibold">{testimonial.name}</div>
            //         <div className="text-sm text-muted-foreground">
            //           {testimonial.role} at {testimonial.company}
            //         </div>
            //       </div>
            //     </CardFooter>
            //   </Card>
            // </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};