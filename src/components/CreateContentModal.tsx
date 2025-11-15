import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

//@ts-expect-errorkkk
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

type CreateContentModalProps = {
  open: boolean;
  onClose?: () => void;
};

// controlled component
export function CreateContentModal(props: CreateContentModalProps) {
  const { open, onClose } = props;
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

     if (!link) {
      alert("Please provide a link");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { link, title, type },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      // close modal if callback provided
      if (onClose) onClose();
    } catch (err) {
      console.error("Add content failed", err);
      alert("Failed to add content");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 p-3 rounded fixed">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input reference={titleRef} placeholder={"Title"} />
                  <Input reference={linkRef} placeholder={"Link"} />
                </div>
                <div>
                  <div className="text-2xl m-3">Type:</div>
                  <div className="flex gap-4 justify-center pb-4">
                    <Button
                      text="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Youtube);
                      }}
                    ></Button>
                    <Button
                      text="Twitter"
                      variant={
                        type === ContentType.Twitter ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Twitter);
                      }}
                    ></Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      addContent();
                    }}
                    variant="primary"
                    text={loading ? "Submitting..." : "Submit"}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
//df