// src/pages/Youtube.tsx
import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { useContent } from "../hooks/useContent";

export function Youtube() {

  const { contents, refresh } = useContent("youtube");  // <-- now correct route is used


  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-90 min-h-screen bg-gray-100 border">
        <h1 className="text-xl font-semibold mb-4">Youtube</h1>

        <div className="flex gap-4 m-4 flex-wrap">
          {contents.map(({ _id,type, link, title }) => (
            <Card key={_id} id={_id} type={type} link={link} title={title} onDelete={() => refresh()}  />
          ))}
        </div>
      </div>
    </div>
  );
}