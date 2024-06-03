import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { NotionRenderer, BlockMapType } from "react-notion";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface Portfolio {
  id: string;
  title: string;
  deskripsi: string;
  img_url: string;
  date: string;
  type: string;
  techstack: string;
  properties: BlockMapType;
}

const PortfolioItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { state } = location;

  const [portfolio, setPortfolio] = useState<Portfolio | null>(state?.portfolio || null);
  const [isLoading, setIsLoading] = useState(!portfolio);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!portfolio) {
      fetchPortfolioData(id);
    }
  }, [id, portfolio]);

  const fetchPortfolioData = async (portfolioId: string | undefined) => {
    if (!portfolioId) return;

    try {
      const response = await axios.get(`https://be-daf2a.vercel.app/api/notion-portfolio`);
      if (response.status !== 200) {
        throw new Error("Notion API request failed");
      }
      const portfolioData = response.data.find((item: Portfolio) => item.id === portfolioId);
      setPortfolio(portfolioData);
    } catch (error) {
      console.error("Error fetching Notion data:", error);
    } finally {
      setIsLoading(false);
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
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            <p className="text-zinc-400 text-sm mt-6">
              Fetching data from Notion...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (!portfolio) {
    return (
      <div className="py-8 text-zinc-300">You need to go back and select a portfolio item again.</div>
    );
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
          Back to Project List
        </Button>
        <div className="self-start">
          {portfolio.properties ? (
            <NotionRenderer blockMap={portfolio.properties as BlockMapType} />
          ) : (
            <div>No properties found for this portfolio item.</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioItem;
