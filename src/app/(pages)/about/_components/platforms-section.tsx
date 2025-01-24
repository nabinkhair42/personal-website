"use client";

import { platforms } from "@/constants/about";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Database, Globe, Cpu, BarChart, Image, LucideIcon } from "lucide-react";

type IconComponent = LucideIcon;

const serviceIcons: Record<string, IconComponent> = {
  "EC2": Server,
  "S3": Database,
  "CloudFront": Globe,
  "Workers": Cpu,
  "Pages": Globe,
  "KV Storage": Database,
  "R2": Database,
  "DNS Management": Globe,
  "Edge Functions": Cpu,
  "Serverless Functions": Server,
  "CI/CD Pipeline": BarChart,
  "Analytics & Monitoring": BarChart,
  "Image Optimization": Image,
} as const;



export const PlatformsSection = () => {
  return (
    <section className="py-20 border-b px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cloud Platforms</h2>
          <p className="text-muted-foreground">
            Platforms and services I use to deploy and scale applications
          </p>
        </div>

        <Tabs defaultValue={platforms[0].name} className="w-full">
          <TabsList className="flex justify-center mb-12 bg-transparent h-auto flex-wrap gap-4">
            {platforms.map((platform) => {
              const Icon = platform.icon as IconType;
              return (
                <TabsTrigger
                  key={platform.name}
                  value={platform.name}
                  className="flex gap-2"
                >
                  <Icon className="h-5 w-5" style={{ color: platform.color }} />
                  {platform.name}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {platforms.map((platform) => (
            <TabsContent key={platform.name} value={platform.name} className="mt-2">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                {platform.services.map((service, index) => {
                  const [name] = service.split(" (");
                  const ServiceIcon = serviceIcons[name] || Server;
                  
                  return (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group flex items-start gap-4 p-4 rounded-lg hover:bg-card transition-all duration-300"
                    >
                      <div 
                        className="p-2.5 rounded-md shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          backgroundColor: `color-mix(in srgb, ${platform.color} 10%, transparent)`,
                        }}
                      >
                        <ServiceIcon 
                          className="w-5 h-5"
                          style={{ color: platform.color }}
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <h3 className="text-base font-medium text-foreground">
                            {name}
                          </h3>
                          {service.includes("(") && (
                            <span className="text-sm text-muted-foreground">
                              {service.split("(")[1].replace(")", "")}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {getServiceDescription(service)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

// Helper function to get service descriptions
function getServiceDescription(service: string): string {
  const descriptions: Record<string, string> = {
    "EC2 (Virtual Servers)": "Deploy and manage virtual servers in the cloud with complete control over computing resources",
    "S3 (Object Storage)": "Scalable storage solution for storing and retrieving any amount of data",
    "CloudFront (CDN)": "Fast and secure content delivery network with low latency",
    "Workers (Serverless)": "Run serverless JavaScript/TypeScript at the edge, closer to users",
    "Pages (Static/JAMstack)": "Deploy and host static sites with continuous integration from Git",
    "KV Storage (Key-Value)": "Globally distributed, low-latency key-value data store",
    "R2 (Object Storage)": "Compatible object storage with zero egress fees",
    "DNS Management": "Enterprise-grade authoritative DNS service",
    "Edge Functions": "Run code at the edge with automatic scaling and zero cold starts",
    "Serverless Functions": "Deploy code that scales automatically with your usage",
    "CI/CD Pipeline": "Automated deployment pipeline with preview environments",
    "Analytics & Monitoring": "Real-time insights into your application's performance",
    "Image Optimization": "Automatic image optimization and responsive image delivery"
  };

  return descriptions[service] || "Advanced cloud platform capability";
}
