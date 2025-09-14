import { AiFillHome } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { FiHeart, FiSettings } from "react-icons/fi";
import { HiOutlineClock } from "react-icons/hi";
import { IoMdVideocam } from "react-icons/io";
import { MdSubscriptions } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";

interface DataProps {
  id: string;
  label: string;
  icon: React.ElementType;
  route: string;
}

export const sidebarItems: DataProps[] = [
  { id: "s-1", label: "Home", icon: AiFillHome, route: "/" },
  { id: "s-2", label: "Shorts", icon: SiYoutubeshorts, route: "/shorts" },
  {
    id: "s-3",
    label: "Subscriptions",
    icon: MdSubscriptions,
    route: "/subscriptions",
  },
  { id: "s-4", label: "Library", icon: BiLibrary, route: "/library" },
  { id: "s-5", label: "History", icon: HiOutlineClock, route: "/history" },
  { id: "s-6", label: "Your videos", icon: RiVideoLine, route: "/your-videos" },
  {
    id: "s-7",
    label: "Watch later",
    icon: IoMdVideocam,
    route: "/watch-later",
  },
  { id: "s-8", label: "Liked videos", icon: FiHeart, route: "/liked" },
  {
    id: "s-9",
    label: "Playlists",
    icon: BsCollectionPlay,
    route: "/playlists",
  },
  { id: "s-10", label: "Settings", icon: FiSettings, route: "/settings" },
];
