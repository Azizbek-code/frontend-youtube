import { buttonStyles } from "./ui/Button";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const categories = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Live",
  "Sports",
  "Movies",
  "Fashion",
  "Beauty",
  "Learning",
  "Technology",
  "Comedy",
  "Travel",
  "Food",
  "Drink",
];

interface categoryProps {
  onSelect: (categories: string) => void;
  selectedCtegory: string;
  type: "Home" | "Watch";
}

const Category = ({ onSelect, selectedCtegory, type }: categoryProps) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const v = query.get("v");
  const q = query.get("q");

  return (
    <div className="overflow-x-hidden relative">
      <div className="flex whitespace-nowrap gap-4 transition-transform w-[max-content]">
        {categories.map((categories) => (
          <Link
            to={
              type === "Home"
                ? `/?q=${categories}`
                : `/watch?v=${v}&q=${categories}`
            }
            key={categories}
            className={twMerge(
              buttonStyles({
                variant: q === categories ? "dark" : "default",
                size: "default",
              }),
              "rounded-[8px] pl-4 pr-4"
            )}
            type="submit"
            onClick={() => onSelect(categories)}
          >
            {categories}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
`
variant={selectedCtegory === categories ? "dark" : "default"}

`;
