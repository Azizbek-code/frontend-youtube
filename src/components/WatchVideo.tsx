import { data } from "../data/VideoCard";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { RxHome } from "react-icons/rx";
import { VIEW_FORMATER } from "./VideoCards";
import { BiCut, BiDislike, BiLike } from "react-icons/bi";
import { useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { IoMdMore } from "react-icons/io";

const WatchVideo = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const videoId = params.get("v");
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [dissLiked, setDissLiked] = useState(false);

  const video = data.find((item) => item.id.toString() === videoId);

  return (
    <div className="h-full flex flex-col w-full px-6 py-4">
      {video ? (
        <div className="w-full flex flex-col items-start gap-4">
          <video
            className="w-full max-w-[1328px] h-auto rounded-lg shadow-[3px_2px_40px_-7px_rgba(0,0,0,0.63)]"
            src={video.videoUrl}
            controls
          />
          <div className="w-full max-w-[1328px] flex flex-col gap-3">
            <span className="text-2xl font-sans font-semibold">
              {video.title}
            </span>
            <div className="flex justify-between items-start w-full flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img
                  className="rounded-full w-12 h-12 cursor-pointer"
                  src={video.user.avatar}
                  alt=""
                  onClick={() => navigate(`/@${video.user.username}`)}
                />
                <div className="flex flex-col">
                  <span className="text-lg font-medium">
                    {video.user.username}
                  </span>
                  <span className="text-sm text-gray-500">
                    {VIEW_FORMATER.format(1250000)} subscriber
                  </span>
                </div>
                <Button
                  variant="dark"
                  size="default"
                  className="text-white rounded-full px-5 py-2"
                >
                  Subscribe
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex rounded-full overflow-hidden border border-gray-200 shadow-sm">
                  <Button
                    variant="default"
                    size="default"
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 px-4 py-2 ${
                      liked
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {!liked ? (
                      <BiLike className="text-xl" />
                    ) : (
                      <AiFillLike className="text-xl" />
                    )}
                    {VIEW_FORMATER.format(85300000)}
                  </Button>
                  <Button
                    variant="default"
                    size="default"
                    onClick={() => setDissLiked(!dissLiked)}
                    className={`flex items-center justify-center px-4 py-2 ${
                      dissLiked
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {!dissLiked ? (
                      <BiDislike className="text-xl" />
                    ) : (
                      <AiFillDislike className="text-xl" />
                    )}
                  </Button>
                </div>
                <Button
                  variant="default"
                  size="default"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <RiShareForwardLine className="text-xl" />
                  Share
                </Button>
                <Button
                  variant="default"
                  size="default"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <BiCut className="text-xl" />
                  Cut
                </Button>
                <Button variant="default" size="icon" className="p-2">
                  <IoMdMore className="text-xl" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-[40px] text-white">
            This video isn't available
          </span>
          <Button
            variant={"default"}
            size={"default"}
            onClick={() => navigate("/")}
            className="text-2xl gap-2 flex justify-center text-blue-500"
          >
            Go to Home <RxHome />
          </Button>
        </div>
      )}
    </div>
  );
};

export default WatchVideo;
