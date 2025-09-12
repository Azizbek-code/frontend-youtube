import { useEffect, useRef, useState } from "react";

interface VideoItemProps {
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
}

export const VIEW_FORMATER = new Intl.NumberFormat(undefined, { notation: "compact" });

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
}: VideoItemProps) => {
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
      className="flex flex-col gap-2"
      onMouseEnter={() => setVideoPlaying(true)}
      onMouseLeave={() => setVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnail}
          className="block w-full h-full object-cover rounded-xl"
          alt=""
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-5 rounded-xl">
          {duration}
              </div>
        <video src={videoUrl} className={`rounded-xl block h-full object-cover absolute inset-0 transition-opacity duration-200  ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`} ref={videoRef} muted playsInline></video>
      </a>
      <div className="flex gap-2">
        <a href={`/@${user.username}`} className="flex-shrink-0 ">
          <img src={user.avatar} alt="" className="w-12 h-12 rounded-full" />
        </a>
        <div className="flex flex-col">
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
          <div className="text-secondary-text  text-sm">
            {" "}
            {VIEW_FORMATER.format(viewsCount)} Views •{createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCards;
