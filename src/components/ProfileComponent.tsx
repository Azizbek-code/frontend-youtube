import React from "react";
import ENDPOINTS from "../config/endpoints";
import { api } from "../config/axios";
import { useQuery } from "@tanstack/react-query";

const ProfileComponent = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get(ENDPOINTS.user.me());
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        Loading profile...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Error loading profile
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center text-white bg-black">
      <div className="w-full h-48 bg-gray-700">
        {data.channelBanner ? (
          <img
            src={data.channelBanner}
            alt="Channel banner"
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center text-gray-400">
            No Banner
          </div>
        )}
      </div>

      <div className="flex flex-col items-center -mt-12">
        <img
          src={
            data.avatar ||
            "https://www.gravatar.com/avatar/?d=mp&f=y" /* fallback avatar */
          }
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-black"
        />
        <h2 className="text-xl font-bold mt-2">
          {data.firstName} {data.lastName}
        </h2>
        <p className="text-gray-400">@{data.username || "no-username"}</p>
        <p className="text-gray-400 text-sm">
          {data.subscribersCount} subscribers • {data.totalViews} views
        </p>
      </div>

      <div className="max-w-2xl text-center mt-4 px-4">
        <p className="text-gray-300">
          {data.channelDescription || "No description available"}
        </p>
      </div>

      <div className="w-full max-w-4xl mt-6 px-4">
        <h3 className="text-lg font-semibold mb-4">Uploads</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.videos && data.videos.length > 0 ? (
            data.videos.map((video: any) => (
              <div
                key={video.id}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-600 flex items-center justify-center text-gray-400">
                    No Thumbnail
                  </div>
                )}
                <div className="p-2">
                  <h4 className="text-sm font-bold">{video.title}</h4>
                  <p className="text-xs text-gray-400">
                    {video.viewsCount} views
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No videos uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
