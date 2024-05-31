import { BsCalendarDate } from "react-icons/bs";
import { useEffect, useState } from "react";
import { LuConstruction } from "react-icons/lu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

// Blog post interface
interface BlogPost {
  title: string;
  description: string;
  date: string;
  link: string;
  image: string;
}

// Blog card data as an array of objects
const blogPosts: BlogPost[] = [
  {
    title: "Unlocking the Secrets of Sustainable Living",
    description:
      "Discover practical tips and strategies to reduce your carbon footprint and live a more eco-friendly lifestyle.",
    date: "May 15, 2023",
    link: "#",
    image: "/placeholder.svg",
  },
  {
    title: "Unlocking the Secrets of Sustainable Living",
    description:
      "Discover practical tips and strategies to reduce your carbon footprint and live a more eco-friendly lifestyle.",
    date: "May 15, 2023",
    link: "#",
    image: "/placeholder.svg",
  },
  {
    title: "Unlocking the Secrets of Sustainable Living",
    description:
      "Discover practical tips and strategies to reduce your carbon footprint and live a more eco-friendly lifestyle.",
    date: "May 15, 2023",
    link: "#",
    image: "/placeholder.svg",
  },
  {
    title: "Unlocking the Secrets of Sustainable Living",
    description:
      "Discover practical tips and strategies to reduce your carbon footprint and live a more eco-friendly lifestyle.",
    date: "May 15, 2023",
    link: "#",
    image: "/placeholder.svg",
  },
  {
    title: "Unlocking the Secrets of Sustainable Living",
    description:
      "Discover practical tips and strategies to reduce your carbon footprint and live a more eco-friendly lifestyle.",
    date: "May 15, 2023",
    link: "#",
    image: "/placeholder.svg",
  },
  {
    title: "Unlocking the Secrets of Sustainable Living",
    description:
      "Discover practical tips and strategies to reduce your carbon footprint and live a more eco-friendly lifestyle.",
    date: "May 15, 2023",
    link: "#",
    image: "/placeholder.svg",
  },
];

function BlogCard({ title, description, date}: BlogPost) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchRandomImage = async () => {
      const response = await fetch(
        "https://source.unsplash.com/random/200x100/"
      );
      if (response.ok) {
        setImageUrl(response.url);
      } 
    };

    fetchRandomImage();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center text-left gap-4 rounded-lg shadow-sm dark:border px-8 py-8 mt-4 lg:mt-0">
      <img
        src={imageUrl} // Use the fetched image URL
        alt="Random Image from Unsplash"
        width={200}
        height={100}
        className="w-full sm:w-[30%] rounded-lg object-cover bg-zinc-900"
        onError={() => setImageUrl("/placeholder.svg")} // Error handling
      />
      <div className="space-y-1 w-full sm:w-[70%] md:p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {description}
        </p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <BsCalendarDate className="mr-1 h-3 w-3" />
          <span>Published on {date}</span>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    setIsDialogVisible(true);
  }, []);

  return (
    <div className="mx-auto py-4 md:py-12 px-8 md:px-12 lg:px-24 lg:grid lg:grid-cols-2 lg:gap-4">
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
      {blogPosts.map((post) => (
        <BlogCard key={post.title} {...post} />
      ))}
    </div>
  );
}
