interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    avatar: "/testimonials/avatar1.jpg",
    content: "Nabin is an exceptional developer who consistently delivers high-quality work. His attention to detail and ability to understand complex requirements made our project a success.",
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "InnovateLabs",
    avatar: "/testimonials/avatar2.jpg",
    content: "Working with Nabin was a great experience. He not only delivered the project on time but also provided valuable insights that improved our product significantly.",
  },
  {
    name: "Emily Rodriguez",
    role: "Creative Director",
    company: "DesignHub",
    avatar: "/testimonials/avatar3.jpg",
    content: "Nabin's technical expertise combined with his eye for design made him the perfect developer for our project. He's proactive, communicative, and delivers exceptional results.",
  }
];
