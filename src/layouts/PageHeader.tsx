import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import YoutubeIcon from "../assets/icons/image copy.png";
import Button from "../components/ui/Button";
import { RiVideoUploadLine } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { GrSearch } from "react-icons/gr";
import { HiOutlineMicrophone } from "react-icons/hi";
import { useState, useRef } from "react";
import { TiArrowLeft } from "react-icons/ti";
import { useSidebarStore } from "../store/useSidebarStore"; // ✅ zustand store
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axios";
import ENDPOINTS from "../config/endpoints";
import { handleGoogleLogin } from "../utils/oatuhFunction";

export const defaultIconStyle = "text-2xl";

interface SpeechRecognition extends EventTarget {
  start(): void;
  stop(): void;
  abort(): void;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onerror: ((this: SpeechRecognition, ev: any) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface Window {
  SpeechRecognition: {
    new (): SpeechRecognition;
  };
  webkitSpeechRecognition: {
    new (): SpeechRecognition;
  };
}

const PageHeader = () => {
  const { data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get(ENDPOINTS.user.me());
      console.log(res);
      return res;
    },
  });
  console.log(data?.data?.picture);

  const navigate = useNavigate();
  const [showSearchInput, setSerchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const { toggle } = useSidebarStore();

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Brauzeringiz ovozli qidiruvni qo‘llab-quvvatlamaydi 😔");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-EN";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setSearchValue(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };
  console.log(searchValue);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <div
        className={`gap-4 items-center flex-shrink-0 ${
          showSearchInput ? "hidden" : "flex"
        }`}
      >
        <Button variant={"ghost"} size={"icon"} onClick={toggle}>
          <RxHamburgerMenu />
        </Button>
        <a href="/">
          <img src={YoutubeIcon} alt="YouTube" className="h-6 cursor-pointer" />
        </a>
      </div>

      <form
        className={`md:flex gap-4 flex-grow justify-center items-center ${
          showSearchInput ? "flex" : "hidden md:flex"
        }`}
      >
        {showSearchInput && (
          <Button
            onClick={() => setSerchInput(false)}
            variant={"ghost"}
            size={"default"}
          >
            <TiArrowLeft className={defaultIconStyle} />
          </Button>
        )}

        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 p-4 w-full text-lg focus:border-blue-500 outline-none"
          />
          <Button
            variant={"default"}
            size={"default"}
            className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0"
          >
            <GrSearch className={defaultIconStyle} />
          </Button>
        </div>

        <Button
          type="button"
          size={"icon"}
          className="flex-shrink-0"
          onClick={startListening}
        >
          <HiOutlineMicrophone className={`${defaultIconStyle} !bg-none`} />
        </Button>
      </form>

      <div
        className={`flex-shrink-0 md:gap-2 text-[16px] ${
          showSearchInput ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setSerchInput(true)}
          variant={"ghost"}
          size={"icon"}
          className="md:hidden"
        >
          <GrSearch className={defaultIconStyle} />
        </Button>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <HiOutlineMicrophone className={defaultIconStyle} />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => navigate("/upload/videos")}
        >
          <RiVideoUploadLine className={defaultIconStyle} />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => navigate("/get/notifications")}
        >
          <IoIosNotifications className={defaultIconStyle} />
        </Button>
        {isError ? (
          <Button
            variant="default"
            size="default"
            className="flex gap-2 items-center !h-8 rounded-[16px] mt-2 text-[16px]"
            onClick={() => handleGoogleLogin()}
          >
            <RxAvatar />
            Sign In
          </Button>
        ) : (
          <Button
            variant="default"
            size="icon"
            className="!p-0 !h-8 w-8 rounded-full overflow-hidden"
            onClick={() => navigate("/profile")}
          >
            {data?.data?.data.picture ? (
              <img
                src={data.data.data.picture}
                alt="Profile"
                  className="h-full w-full object-cover"
                  onClick={() => navigate('/profile')}
              />
            ) : (
              <RxAvatar className="h-6 w-6" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
