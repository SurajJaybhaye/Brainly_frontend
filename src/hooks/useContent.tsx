// src/hooks/useContent.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent(type?: "twitter" | "youtube") {
  const [contents, setContents] = useState([]);

  function refresh() {
    const token = localStorage.getItem("token");

    // choose URL based on type
    const url = type
      ? `${BACKEND_URL}/api/v1/content/${type}`     // /content/twitter OR /content/youtube
      : `${BACKEND_URL}/api/v1/content`;           // fallback: all content

    axios.get(url, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      setContents(response.data.content || []);
    })
    .catch((e) => {
      console.error("useContent error:", e);
      setContents([]);
    });
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(() => refresh(), 10_000);
    return () => clearInterval(interval);
  }, [type]); // refresh when type changes

  return { contents, refresh };
}
