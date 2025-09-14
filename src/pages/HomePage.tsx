import { useState } from "react";
import Category from "../components/Category";
import VideoCards from "../components/VideoCards";
import { data } from "../data/VideoCard";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="max-h-screen flex flex-col w-full">

        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
          <Category
            type="Home"
              onSelect={setSelectedCategory}
              selectedCtegory={selectedCategory}
            />
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 pt-4">
            {data.map((items) => (
              <VideoCards
                cardType="Home"
                key={items.id}
                createdAt={items.createdAt}
                duration={items.duration}
                id={items.id}
                title={items.title}
                user={items.user}
                videoUrl={items.videoUrl}
                viewsCount={items.viewsCount}
                thumbnail={items.thumbnail}
                className="flex-col"
              />
            ))}
          </div>
        </div>
      </div>
  );
};

export default HomePage;
