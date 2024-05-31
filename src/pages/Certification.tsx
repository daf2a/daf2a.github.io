import { Card, CardContent } from "@/components/ui/card";
import { FaReact, FaNodeJs, FaJsSquare, FaGitAlt } from "react-icons/fa"; // Adjust based on your library
import { SiAmazonaws, SiScrumalliance, SiGoogle } from "react-icons/si";
import { SiTypescript, SiTailwindcss } from "react-icons/si";
import { useState, useEffect } from "react";
import { LuConstruction } from "react-icons/lu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

// Type definitions
interface ItemProps {
  icon: React.ElementType;
  text: string;
  issuedBy?: string;
  date?: string;
  className?: string;
}

// Reusable Skill/Certification Item
const Item: React.FC<ItemProps> = ({
  icon: Icon,
  text,
  issuedBy,
  date,
  className,
}) => (
  <div
    className={`bg-zinc-900 w-full rounded-lg p-4 flex justify-between space-y-2 ${className}`}
  >
    <div className="flex flex-col">
      <Icon className="h-8 w-8" />
      <span className="text-sm font-medium mt-3">{text}</span>
      {issuedBy && <p className="text-xs text-gray-500">{issuedBy}</p>}
    </div>
    {date && (
      <div className="bg-zinc-700 text-white rounded-full px-3 py-1 text-xs font-medium self-start">
        {date}
      </div>
    )}
  </div>
);

export default function SkillsAndCertifications() {
  // Data (Replace with your actual skills and certifications)
  const skills: ItemProps[] = [
    { icon: FaReact, text: "React" },
    { icon: FaNodeJs, text: "Node.js" },
    { icon: FaJsSquare, text: "JavaScript" },
    { icon: SiTypescript, text: "TypeScript" },
    { icon: SiTailwindcss, text: "Tailwind CSS" },
    { icon: FaGitAlt, text: "Git" },
  ];

  const certifications: ItemProps[] = [
    {
      icon: SiAmazonaws,
      text: "Certified React Developer",
      issuedBy: "Udemy",
      date: "May 2022",
    },
    {
      icon: SiAmazonaws,
      text: "AWS Certified Cloud Practitioner",
      issuedBy: "Amazon Web Services",
      date: "Dec 2021",
    },
    {
      icon: SiScrumalliance,
      text: "Certified Scrum Master",
      issuedBy: "Scrum Alliance",
      date: "Sept 2020",
    },
    {
      icon: SiGoogle,
      text: "Google Analytics for Beginners",
      issuedBy: "Google",
      date: "July 2019",
    },
  ];

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    setIsDialogVisible(true);
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
                    This page is currently under construction. Please check back later.
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <Item key={index} {...skill} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Certifications
          </h2>
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
            {certifications.map((cert, index) => (
              <Card key={index}>
                <CardContent className="p-4 md:p-6 flex items-center justify-between">
                  <Item {...cert} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
