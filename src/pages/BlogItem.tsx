// src/pages/BlogItem.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { NotionRenderer, BlockMapType } from "react-notion";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import LottieAnimationCat from "@/components/ui/LottieAnimationCat";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  deskripsi: string;
  img_url: string;
  date: string;
  properties: BlockMapType;
}

const BlogItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { state } = location;

  const [blog, setBlog] = useState<Blog | null>(state?.blog || null);
  const [isLoading, setIsLoading] = useState(!blog);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!blog) {
      fetchBlogData(id);
    }
  }, [id, blog]);

  const fetchBlogData = async (blogId: string | undefined) => {
    if (!blogId) return;
    const cachedData = localStorage.getItem("blogData");
      
    if (cachedData) {
      setBlog(JSON.parse(cachedData));
      setIsLoading(false);
    } else {
      setIsLoading(true);
      try {
          const response = await axios.get(
            `https://be-daf2a.vercel.app/api/notion-blog`
          );
          if (response.status !== 200) {
            throw new Error("Notion API request failed");
          }
          const blogData = response.data.find((item: Blog) => item.id === blogId);
          localStorage.setItem("blogData", JSON.stringify(blogData));
          setBlog(blogData);
        } catch (error) {
          console.error("Error fetching Notion data:", error);
        } finally {
          setIsLoading(false);
        }
    }
  };

  if (isLoading) {
    return (
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
    );
  }

  if (!blog) {
    return <div className="py-8 text-zinc-300">Blog post not found.</div>;
  }

  return (
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
      <div className="p-8 md:p-16 item-left text-left bg-zinc-200 min-h-screen relative z-50">
        <Button
          onClick={() => navigate("/blog")}
          variant="outline"
          className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8 lg:bottom-16 lg:right-16 bg-zinc-800 text-zinc-100 border-zinc-200 hover:bg-zinc-600"
        >
          Back to Blog List
        </Button>
        <div className="self-start">
          {blog.properties ? (
            <NotionRenderer blockMap={blog.properties as BlockMapType} />
          ) : (
            <div>No properties found for this blog post.</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogItem;
