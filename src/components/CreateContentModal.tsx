import  { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
//@ts-expect-errorenum
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

type CreateContentModalProps = {
  open: boolean;
  onClose?: () => void;
};

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  // initialize refs with null and type them properly
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!link) {
      alert("Please enter a link");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link,
          title,
          type,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );

      // close modal after success
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
      <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60"></div>

      <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
        <div className="bg-white opacity-100 p-6 rounded shadow-lg w-full max-w-md">
          <div className="flex justify-end">
            <div onClick={onClose} className="cursor-pointer">
              <CrossIcon />
            </div>
          </div>

          <div>
            {/* If Input expects a ref prop named "reference" with a specific type,
                update the cast accordingly. For now we cast to any to avoid type mismatch. */}
            <Input reference={titleRef as any} placeholder={"Title"} />
            <Input reference={linkRef as any} placeholder={"Link"} />
          </div>

          <div className="mt-4">
            <div className="text-2xl mb-3 text-center">Type:</div>
            <div className="flex gap-4 justify-center pb-4">
              <Button
                text="Youtube"
                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Youtube)}
              />
              <Button
                text="Twitter"
                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Twitter)}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={addContent}
              variant="primary"
              text={loading ? "Submitting..." : "Submit"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useRef, useState } from "react";
// import { CrossIcon } from "../icons/CrossIcon";
// import { Button } from "./Button";
// import { Input } from "./Input";
// import { BACKEND_URL } from "../config";
// import axios from "axios";

// //@ts-expect-errorenum
// enum ContentType {
//   Youtube = "youtube",
//   Twitter = "twitter",
// }

// // controlled component
// export function CreateContentModal({ open, onClose }) {
//   const titleRef = useRef<HTMLInputElement>();
//   const linkRef = useRef<HTMLInputElement>();
//   const [type, setType] = useState(ContentType.Youtube);

//   async function addContent() {
//     const title = titleRef.current?.value;
//     const link = linkRef.current?.value;

//     await axios.post(
//       `${BACKEND_URL}/api/v1/content`,
//       {
//         link,
//         title,
//         type,
//       },
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }
//     );

//     onClose();
//   }

//   return (
//     <div>
//       {open && (
//         <div>
//           <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
//           <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
//             <div className="flex flex-col justify-center">
//               <span className="bg-white opacity-100 p-3 rounded fixed">
//                 <div className="flex justify-end">
//                   <div onClick={onClose} className="cursor-pointer">
//                     <CrossIcon />
//                   </div>
//                 </div>
//                 <div>
//                   <Input reference={titleRef} placeholder={"Title"} />
//                   <Input reference={linkRef} placeholder={"Link"} />
//                 </div>
//                 <div>
//                   <div className="text-2xl m-3">Type:</div>
//                   <div className="flex gap-4 justify-center pb-4">
//                     <Button
//                       text="Youtube"
//                       variant={
//                         type === ContentType.Youtube ? "primary" : "secondary"
//                       }
//                       onClick={() => {
//                         setType(ContentType.Youtube);
//                       }}
//                     ></Button>
//                     <Button
//                       text="Twitter"
//                       variant={
//                         type === ContentType.Twitter ? "primary" : "secondary"
//                       }
//                       onClick={() => {
//                         setType(ContentType.Twitter);
//                       }}
//                     ></Button>
//                   </div>
//                 </div>
//                 <div className="flex justify-center">
//                   <Button
//                     onClick={() => {
//                       addContent();
//                     }}
//                     variant="primary"
//                     text="Submit"
//                   />
//                 </div>
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }  