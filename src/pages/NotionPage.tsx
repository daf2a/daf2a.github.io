"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/api/notion";

function NotionPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then((fetchedData) => setData(fetchedData))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data)}</pre> : "Loading..."}
    </div>
  );
}

export default NotionPage;