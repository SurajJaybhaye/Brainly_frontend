// src/pages/Twitter.tsx
import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { useContent } from "../hooks/useContent";

export function Twitter() {
  const { contents, refresh } = useContent("twitter");

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border">
        <h1 className="text-xl font-semibold mb-4">Twitter</h1>

        <div className="flex gap-4 m-4 flex-wrap">
          {contents.map((c: any) => (
            <Card key={c._id} id={c._id} type={c.type} link={c.link} title={c.title} onDelete={() => refresh()} />
          ))}
        </div>
      </div>
    </div>
  );
}
