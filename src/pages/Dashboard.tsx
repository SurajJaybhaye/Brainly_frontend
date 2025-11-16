import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);
  useEffect(() => {
  // Ask twitter widgets to parse newly added blockquotes
  if (typeof window !== "undefined" && (window as any).twttr?.widgets?.load) {
    (window as any).twttr.widgets.load();
  }
}, [contents]);

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-90 min-h-screen bg-gray-100 ">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-8 pr-4">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          ></Button>
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const hash = await response.data.hash;
              const shareUrl = `https://brainly-frontend-ar1j.vercel.app/share/${hash}`;
              alert(shareUrl);
            }}
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          ></Button>
        </div>

        <div className="flex gap-4 m-4 flex-wrap">
          {contents.map(({ _id,type, link, title }) => (
            <Card key={_id} id={_id} type={type} link={link} title={title} onDelete={() => refresh()}  />
          ))}
        </div>
      </div>
    </div>
  );
}
