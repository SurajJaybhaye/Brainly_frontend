// src/pages/Share.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";

type ContentItem = {
  _id: string;
  title?: string;
  link?: string;
  tags?: any[];
  type?: string;
  userId?: any;
};

export function Share() {
  const { sharelink } = useParams<{ sharelink?: string }>();
  const [username, setUsername] = useState<string | null>(null);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShared() {
      if (!sharelink) {
        setError("No share id provided in URL.");
        setContents([]);
        setUsername(null);
        return;
      }


      setError(null);

      try {
        const url = `${BACKEND_URL}/api/v1/brain/share/${encodeURIComponent(sharelink)}`;
        const resp = await axios.get(url);
        setUsername(resp.data.username ?? null);
        setContents(resp.data.content ?? []);
      } catch (err: any) {
        console.error("fetchShared error:", err);
        if (err?.response?.status === 404) {
          setError("Share not found.");
        } else {
          setError(err?.response?.data?.message ?? err?.message ?? "Failed to load shared content.");
        }
        setContents([]);
        setUsername(null);
      } 
    }

    fetchShared();
  }, [sharelink]);
  useEffect(() => {
  // Ask twitter widgets to parse newly added blockquotes
  if (typeof window !== "undefined" && (window as any).twttr?.widgets?.load) {
    (window as any).twttr.widgets.load();
  }
}, [contents]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {username ? `${username}'s Shared Brain` : "Shared Content"}
          </h1>
          {username ? <p className="text-sm text-gray-500 mt-1">Publicly shared items</p> : null}
        </header>

       

        {error && (
          <div className="p-4 mb-6 text-center text-red-700 bg-red-50 border border-red-100 rounded">
            {error}
          </div>
        )}

        {contents.length === 0 && (
          <div className="p-8 text-center text-gray-600">No content available in this share.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.map((c) => (
            <Card
              key={c._id}
              id={c._id}
              type={c.type as "twitter" | "youtube"}
                link={c.link!}
                title={c.title ?? ""}
              
            />
          ))}
        </div>
      </div>
    </div>
  );
}
