import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState, type HtmlHTMLAttributes } from "react";
import { api } from "../config/axios";
import Button from "./ui/Button";
import { MdMoreVert } from "react-icons/md";

interface VideoItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  videoUrl: string;
  duration: string;
  createdAt: string;
  viewsCount: number;
  user: {
    username: string;
    avatar: string;
  };
  cardType: "Home" | "Playlist" | "WatchVideo";
}

export const VIEW_FORMATER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

const VideoCards = ({
  createdAt,
  duration,
  id,
  title,
  user,
  videoUrl,
  viewsCount,
  description,
  thumbnail,
  className,
  cardType,
}: VideoItemProps) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["/"],
    queryFn: async () => {
      const response = await api.get("/videos");
      return response.data;
    },
  });
  console.log(data);
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) return;
    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className={`flex ${
        cardType === "Home" ? "flex-col" : ""
      } gap-2 ${className}`}
      onMouseEnter={() => setVideoPlaying(true)}
      onMouseLeave={() => setVideoPlaying(false)}
    >
      <div className={`flex ${cardType === "Home" ? "flex-col" : ""} gap-2`}>
        <a href={`/watch?v=${id}&q=All`} className="relative aspect-video">
          <img
            src={thumbnail}
            className="block w-full h-full object-cover rounded-xl"
            alt=""
          />
          <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-5 rounded-xl">
            {duration}
          </div>
          <video
            src={videoUrl}
            className={`rounded-xl block h-full object-cover absolute inset-0 transition-opacity duration-200  ${
              isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
            }`}
            ref={videoRef}
            muted
            playsInline
          ></video>
        </a>
        <div className="flex gap-2 ">
            <a href={`/@${user.username}`} className="flex-shrink-0 ">
          {cardType === "Home" && (
              <img
                src={user.avatar}
                alt=""
                className="w-12 h-12 rounded-full"
              />
          )}
            </a>
          <div className={`flex flex-col ${cardType === "Home" ? "" : "gap-5"}`}>
            <a href={`watch?v=${id}`} className="font-bold">
              {title}
            </a>
            <a
              href={`/@${user.username}`}
              className="text-secondary-text text-sm"
            >
              {" "}
              {user.username}
            </a>
            {cardType === "Home" ? (
              <div className="text-secondary-text  text-sm">
                {" "}
                {VIEW_FORMATER.format(viewsCount)} Views •{createdAt}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {cardType !== "Home" ? (
          <Button className=" w-fit bg-transparent hover:bg-transparent items-end ml-9 mr-1">
            <MdMoreVert className="text-[30px]" />
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default VideoCards;
