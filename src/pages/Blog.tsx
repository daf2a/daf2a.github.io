// src/pages/Blog.tsx
import { BsCalendarDate } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BlockMapType } from "react-notion";
import axios from "axios";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import LottieAnimationCat from "@/components/ui/LottieAnimationCat";


interface BlogPost {
  title: string;
  description: string;
  date: string;
  image: string;
  onClick: () => void;
}

interface Blog {
  id: string;
  title: string;
  deskripsi: string;
  img_url: string;
  date: string;
  properties: BlockMapType;
}

function BlogCard({ title, description, date, image, onClick }: BlogPost) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div
      className="flex flex-col sm:flex-row items-center text-left gap-4 rounded-lg shadow-sm dark:border px-6 py-6 md:py-2 mt-4 lg:mt-0 cursor-pointer hover:bg-zinc-900"
      onClick={onClick}
    >
      {!isImageLoaded && (
        <Skeleton className="w-full sm:w-[30%] h-[110px] rounded-lg" />
      )}
      <img
        src={image || "/placeholder.svg"}
        alt="Blog Image"
        width={200}
        height={110}
        className={`w-full sm:w-[30%] h-[110px] rounded-lg object-cover bg-zinc-900 ${isImageLoaded ? "block" : "hidden"}`}
        onLoad={() => setIsImageLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = "/placeholder.svg";
          setIsImageLoaded(true);
        }}
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

function Blog() {
  const [data, setData] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isBlogRoute = location.pathname === "/blog";
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://be-daf2a.vercel.app/api/notion-blog"
        );

        if (response.status !== 200) {
          throw new Error("Notion API request failed");
        }

        const sortedData = sortByDate(response.data);
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching Notion data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortByDate = (data: Blog[]): Blog[] => {
    return data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCardClick = (blog: Blog) => {
    navigate(`${blog.id}`, { state: { blog } });
  };

  return (
    <div>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <LottieAnimationCat />
          </motion.div>
        )}
      </AnimatePresence>
      {isBlogRoute && (
        <div className="mx-auto py-4 md:py-12 px-8 md:px-12 lg:px-24 lg:grid lg:grid-cols-2 lg:gap-4">
          {data.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.deskripsi}
              date={formatDate(blog.date)}
              image={blog.img_url}
              onClick={() => handleCardClick(blog)}
            />
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Blog;
