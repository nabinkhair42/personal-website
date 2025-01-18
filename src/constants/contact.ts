import { Mail, MapPin, Phone } from "lucide-react";
import { BsGithub, BsInstagram, BsLinkedin, BsThreads } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

export const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+977-9848989898",
    link: "tel:+9779848989898",
  },
  {
    icon: Mail,
    title: "Email",
    value: "nabinkhair12@gmail.com",
    link: "mailto:nabinkhair12@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dharan, Nepal",
    link: "https://maps.google.com/?q=Dharan,Nepal",
  },
];

export const socialLinks = [
  {
    icon: BsGithub,
    name: "GitHub",
    url: "https://github.com/nabinkhair42",
  },
  {
    icon: BsLinkedin,
    name: "LinkedIn",
    url: "https://linkedin.com/in/nabin-khair-39b486342",
  },
  {
    icon: BsInstagram,
    name: "Instagram",
    url: "https://www.instagram.com/nabinkhair2",
  },
  {
    icon: FaFacebook,
    name: "Facebook",
    url: "https://www.facebook.com/nabinkhair2",
  },
  {
    icon: BsThreads,
    name: "Threads",
    url: "https://www.threads.net/@nabinkhair2",
  },
];
