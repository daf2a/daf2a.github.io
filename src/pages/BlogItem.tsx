// src/pages/BlogItem.tsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NotionRenderer, BlockMapType } from "react-notion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const BlogItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const blog = state?.blog;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    return <div>Blog post not found.</div>;
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
          onClick={() => navigate(-1)}
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
