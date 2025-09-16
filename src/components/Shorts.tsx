import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentDots,
  FaShare,
} from "react-icons/fa";
import { api } from "../config/axios";
import ENDPOINTS from "../config/endpoints";

export default function ShortsFeed() {
  const { data, isError } = useQuery({
    queryKey: ["getAllVideo"],
    queryFn: async () => {
      const res = await api.get(ENDPOINTS.video.getAllVideos());
      return res.data; // faqat data qaytaramiz
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60,
  });

  const shorts =
    data?.map((item: any) => ({
      id: item.id,
      videoUrl: item.videoUrl,
      author: item.author?.firstName + " " + item.author?.lastName,
      description: item.description,
      likes: item.likesCount,
      dislikes: item.dislikesCount,
      comments: item.commentsCount,
    })) || [];

  const [isLiked, setLiked] = useState(false);
  const [isDisLiked, setDisliked] = useState(false);
  const [share, setShare] = useState(false);
  const [getComments, setGetComments] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [disLikesCount, setDisLikesCount] = useState(0);

  if (isError) return <p className="text-white">Xatolik yuz berdi...</p>;

  return (
    <div className="h-[850px] w-[500px] overflow-y-scroll snap-y snap-mandatory bg-black mx-auto">
      {shorts.map((video: any) => (
        <div
          key={video.id}
          className="relative h-[840px] w-full flex items-center justify-center snap-start"
        >
          <iframe
            src={video.videoUrl}
            className="h-[850px] w-full rounded-2xl shadow-lg"
          />

          <div className="absolute bottom-10 left-5 text-white">
            <h2 className="font-bold">@{video.author}</h2>
            <p className="max-w-xs text-sm opacity-90">{video.description}</p>
          </div>

          <div className="absolute right-5 bottom-20 flex flex-col items-center gap-6 text-white text-xl">
            <div className="flex flex-col items-center">
              <FaThumbsUp
                className={`cursor-pointer ${isLiked ? "text-red-500" : ""}`}
                onClick={() => {
                  setLiked(!isLiked);
                  if (!isLiked) {
                    if (isDisLiked) {
                      setDisliked(false);
                      setDisLikesCount(disLikesCount - 1);
                    }

                    setLikesCount(likesCount + 1);
                  } else {
                    setLikesCount(likesCount - 1);
                  }
                }}
              />
              <span className="text-sm">{likesCount}</span>
            </div>
            <div className="flex flex-col items-center">
              <FaThumbsDown
                className={`cursor-pointer ${isDisLiked ? "text-red-500" : ""}`}
                onClick={() => {
                  setDisliked(!isDisLiked);
                  if (!isDisLiked) {
                    if (isLiked) {
                      setLiked(false);
                      setLikesCount(likesCount - 1);
                    }
                    setDisLikesCount(disLikesCount + 1);
                  } else {
                    setDisLikesCount(disLikesCount - 1);
                  }
                }}
              />
              <span className="text-sm">{disLikesCount}</span>
            </div>
            <div className="flex flex-col items-center">
              <FaCommentDots className="cursor-pointer" />
              <span className="text-sm">{video.comments}</span>
            </div>
            <div className="flex flex-col items-center">
              <FaShare className="cursor-pointer" />
              <span className="text-sm">Share</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
