// src/pages/Twitter.tsx
import  { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { useContent } from "../hooks/useContent";

export function Twitter() {

  const { contents, refresh } = useContent("twitter");  // <-- now correct route is used

  useEffect(() => {
    // Ask twitter widgets to parse newly added blockquotes
    if (typeof window !== "undefined" && (window as any).twttr?.widgets?.load) {
      (window as any).twttr.widgets.load();
    }
  }, [contents]);
  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-90 min-h-screen bg-gray-100 border">
        <h1 className="text-xl font-semibold mb-4">Twitter</h1>

        <div className="flex gap-4 m-4 flex-wrap">
          {contents.map(({ _id,type, link, title }) => (
            <Card key={_id} id={_id} type={type} link={link} title={title} onDelete={() => refresh()}  />
          ))}
        </div>
      </div>
    </div>
  );
}
