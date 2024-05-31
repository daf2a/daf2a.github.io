import { Card, CardContent } from "@/components/ui/card";
import { SiAmazonaws, SiScrumalliance, SiGoogle } from "react-icons/si";
import { useState, useEffect } from "react";
import { LuConstruction } from "react-icons/lu";
import { FaReact, FaGitAlt, FaPython, FaPhp, FaAndroid } from "react-icons/fa";
import {
  SiCplusplus,
  SiKotlin,
  SiTypescript,
  SiThreedotjs,
  SiLaravel,
  SiFlask,
  SiFigma,
  SiMqtt,
  SiBlender,
  SiNextdotjs,
  SiVuedotjs,
  SiPlatformio,
  SiArduino,
} from "react-icons/si";

import Dicoding from "./../assets/dicoding.png";
import Rubrik from "./../assets/rubrikgrafis.png";

const Image: React.FC<{ src: string; alt: string; className?: string }> = ({
  src,
  alt,
  className,
}) => <img src={src} alt={alt} className={className} />;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

// Type definitions
interface ItemProps {
  icon: React.ElementType | string;
  text: string;
  issuedBy?: string;
  date?: string;
  className?: string;
  link?: string;
}

// Reusable Skill/Certification Item
const Item: React.FC<ItemProps> = ({
  icon: Icon,
  text,
  issuedBy,
  date,
  className,
  link,
}) => (
  <div
    className={`bg-zinc-900 w-full rounded-lg p-4 flex justify-between space-y-2 ${className}`}
  >
    <div className="flex flex-col">
      {typeof Icon === "string" ? (
        <Image src={Icon} alt={text} className="h-8 py-1 w-fit" />
      ) : (
        <Icon className="h-8 w-8" />
      )}
      <span className="text-sm font-medium mt-3">{text}</span>
      {issuedBy && <p className="text-xs text-gray-500">{issuedBy}</p>}
    </div>
    {date && (
      <div className="bg-zinc-700 text-white rounded-full px-3 py-1 text-xs font-medium self-start">
        {date}
      </div>
    )}
      <p className="hidden">{link}</p>
  </div>
);

export default function SkillsAndCertifications() {
  const skills: ItemProps[] = [
    { icon: SiCplusplus, text: "C++" },
    { icon: SiPlatformio, text: "Platformio" },
    { icon: SiArduino, text: "Arduino" },
    { icon: FaPython, text: "Python" },
    { icon: SiFlask, text: "Flask" },
    { icon: SiKotlin, text: "Kotlin" },
    { icon: FaAndroid, text: "Android SDK" },
    { icon: FaPhp, text: "PHP" },
    { icon: SiLaravel, text: "Laravel" },
    { icon: SiTypescript, text: "TypeScript" },
    { icon: SiVuedotjs, text: "Vue.js" },
    { icon: SiThreedotjs, text: "Three.js" },
    { icon: FaReact, text: "React.js" },
    { icon: SiNextdotjs, text: "Next.js" },
    { icon: SiMqtt, text: "MQTT" },
    { icon: FaGitAlt, text: "Git" },
    { icon: SiBlender, text: "Blender" },
    { icon: SiFigma, text: "Figma" },
  ];
  const certifications: ItemProps[] = [
    {
      icon: Dicoding,
      text: "Belajar Pengembangan Aplikasi ANdroid Intermediate",
      issuedBy: "Dicoding Academy",
      date: "May 2024",
      link: "https://www.dicoding.com/certificates/KEXL11YG4XG2",
    },
    {
      icon: Dicoding,
      text: "Belajar Penerapan Machine Learning Android",
      issuedBy: "Dicoding Academy",
      date: "Apr 2024",
      link: "https://www.dicoding.com/certificates/53XEO0L09ZRN",
    },
    {
      icon: Dicoding,
      text: "Belajar Fundamental Aplikasi Android",
      issuedBy: "Dicoding Academy",
      date: "Mar 2024",
      link: "https://www.dicoding.com/certificates/QLZ94514DP5D",
    },
    {
      icon: Dicoding,
      text: "Belajar Membuat Aplikasi Android untuk Pemula",
      issuedBy: "Dicoding Academy",
      date: "Mar 2024",
      link: "https://www.dicoding.com/certificates/QLZ94514DP5D",
    },
    {
      icon: Dicoding,
      text: "Belajar Dasar AI",
      issuedBy: "Dicoding Academy",
      date: "Feb 2024",
      link: "https://www.dicoding.com/certificates/53XEYGME9PRN",
    },
    {
      icon: Dicoding,
      text: "Belajar Dasar Git dengan Github",
      issuedBy: "Dicoding Academy",
      date: "May 2022",
      link: "https://www.dicoding.com/certificates/N9ZOO0LERZG5",
    },
    {
      icon: Dicoding,
      text: "Belajar Prinsip Pemrograman SOLID",
      issuedBy: "Dicoding Academy",
      date: "Feb 2024",
      link: "https://www.dicoding.com/certificates/N9ZOOJNWRZG5",
    },
    {
      icon: Dicoding,
      text: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
      issuedBy: "Dicoding Academy",
      date: "Feb 2024",
      link: "https://www.dicoding.com/certificates/JLX12KKYNZ72",
    },
    {
      icon: Dicoding,
      text: "Memulai Pemrograman dengan Kotlin",
      issuedBy: "Dicoding Academy",
      date: "Feb 2024",
      link: "https://www.dicoding.com/certificates/KEXL8J5VYZG2",
    },
    {
      icon: Dicoding,
      text: "Programming Logic",
      issuedBy: "Dicoding Academy",
      date: "Feb 2024",
      link: "https://www.dicoding.com/certificates/KEXL8MN00ZG2",
    },
    {
      icon: Rubrik,
      text: "Logo Design Mastery",
      issuedBy: "Rubrik Grafis",
      date: "Jan 2023",
    },
    {
      icon: Rubrik,
      text: "3D Design with Blender",
      issuedBy: "Rubrik Grafis",
      date: "Nov 2021",
    },
    {
      icon: Rubrik,
      text: "UI Design For Landing Page",
      issuedBy: "Rubrik Grafis",
      date: "Jun 2022",
    },
    {
      icon: Rubrik,
      text: "Basic Motion Graphic with After Effects",
      issuedBy: "Rubrik Grafis",
      date: "Nov 2021",
    },
  ];

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    setIsDialogVisible(false);
  }, []);

  return (
    <div className="w-full lg:px-24 mx-auto py-6 md:py-12 px-6 md:px-12 text-left">
      {isDialogVisible && (
        <Dialog open={isDialogVisible}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <div className="py-3 flex gap-4 items-center justify-center text-zinc-400">
                  <LuConstruction className="text-zinc-400 flex-shrink-0 w-16 h-16 text-primary-foreground" />
                  <p className="text-left font-semibold">
                    This page is currently under construction. Please check back
                    later.
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      <div className="grid grid-cols-1 gap-8 md:gap-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Tech & Skills</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <Item key={index} {...skill} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Certifications
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {certifications.map((cert, index) => (
              <div key={index}>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <Card>
                      <CardContent className="p-4 md:p-6 flex items-center justify-between">
                        <Item {...cert} />
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card>
                    <CardContent className="p-4 md:p-6 flex items-center justify-between">
                      <Item {...cert} />
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
