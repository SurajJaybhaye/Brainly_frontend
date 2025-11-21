import axios from "axios";
import { BACKEND_URL } from "../config";
// import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";

interface CardProps {
    id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube";
    onDelete?: ()=> void;
}
export function Card({id,title,link,type, onDelete}: CardProps){

    async function handleDelete() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
       
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });

      if (onDelete) onDelete();
    } catch (error) {
      console.error("Failed to delete content:", error);
      alert("Error deleting content");
    }
  }

    return <div>
    <div className="p-4 shadow-2xl bg-white rounded-md shadow-md border-gray-200 w-72 max-h-72 overflow-y-auto overflow-x-hidden border">
        <div className="justify-between flex ">
            <div className="flex items-center text-sm">
                <div className="text-gray-500 pr-2">
                    {type == "youtube" && <YoutubeIcon />}
                    {type == "twitter" && <TwitterIcon />}
                </div>
                <div> 
                    {title}
                </div>
                
            </div>
            <div className="flex items-center">
                
                <div className=" pr-2 text-gray-500 cursor-pointer" onClick={handleDelete}>
                    <TrashIcon />
                </div>
                
            </div>
        </div>
        <div className="pt-4">

        {type == "youtube" &&<iframe className = "w-full h-48" src= {link.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
          
        {type =="twitter" &&  <blockquote className="twitter-tweet">
            <a href={link.replace("x.com","twitter.com")}></a>
            </blockquote> }
    </div>
    </div>
    </div>
}