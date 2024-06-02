import { BsCalendarDate } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BlockMapType } from "react-notion";
import axios from "axios";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { NotionRenderer } from "react-notion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

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
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
    setSelectedBlog(blog);
  };

  const handleBackClick = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            <p className="text-zinc-400 text-sm mt-6">
              Fetching data from Notion...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {selectedBlog ? (
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: "easeInOut",
          }}
          className=""
        >
          <div className="p-8 md:p-16 item-left text-left bg-zinc-200 relative">
          <Button
              onClick={handleBackClick}
              variant="outline"
              className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8 lg:bottom-16 lg:right-16 bg-zinc-800 text-zinc-100 border-zinc-200 hover:bg-zinc-600"
            >
              Back to Blog List
            </Button>
            <div className="self-start">
              <NotionRenderer blockMap={selectedBlog.properties} />
            </div>
          </div>
        </motion.div>
      ) : (
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
    </>
  );
}

export default Blog;
