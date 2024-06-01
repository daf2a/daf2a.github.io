import { BsCalendarDate } from "react-icons/bs";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { useEffect, useState } from "react";
import { BlockMapType } from "react-notion";
import axios from "axios";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { NotionRenderer } from "react-notion";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const loadingStates = [
  {
    text: "Fetching data from Notion",
  },
  {
    text: "Building the Blog",
  },
  {
    text: "Adding finishing touches",
  },
];

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
  created_time: string;
  properties: BlockMapType;
}

function BlogCard({ title, description, date, image, onClick }: BlogPost) {
  return (
    <div
      className="flex flex-col sm:flex-row items-center text-left gap-4 rounded-lg shadow-sm dark:border px-8 py-8 mt-4 lg:mt-0 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={image || "/placeholder.svg"}
        alt="Blog Image"
        width={200}
        height={100}
        className="w-full sm:w-[30%] rounded-lg object-cover bg-zinc-900"
        onError={(e) => (e.currentTarget.src = "/placeholder.svg")} // Error handling
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
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Notion data:", error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {isLoading && (
        <Loader
          loadingStates={loadingStates}
          loading={isLoading}
          duration={1000}
        />
      )}
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
          <div className="p-8 md:p-16 item-left text-left flex flex-col items-end bg-zinc-200 relative">
            <Button
              onClick={handleBackClick}
              variant="outline"
              className="mb-4 -mt-4 sticky top-20 left-4"
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
              date={formatDate(blog.created_time)}
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
