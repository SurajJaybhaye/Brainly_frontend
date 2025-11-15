// src/hooks/useContent.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

type ContentType = "twitter" | "youtube";

export function useContent(typeFilter?: ContentType | "") {
  const [contents, setContents] = useState<any[]>([]);

  async function refresh() {
    try {
      // Build URL with optional query param
      const url = `${BACKEND_URL}/api/v1/content` + (typeFilter ? `?type=${typeFilter}` : "");
      console.log("useContent fetching:", url); // <- debug log
      const resp = await axios.get(url, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setContents(resp.data.content || []);
    } catch (err) {
      console.error("Failed to fetch contents", err);
      setContents([]);
    }
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [typeFilter]); // re-run when filter changes

  return { contents, refresh };
}
