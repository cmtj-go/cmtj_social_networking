import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";
import { useCallback } from "react";

import useLoginModal from "@/hooks/useLoginModal";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const handleClick = useCallback(() =>{
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={handleClick}>
      <div
        className="
          mt-6
          lg:hidden
          rounded-full
          h-14
          w-14
          p-4
          flex
          items-center
          justify-center
          bg-sky-500
          hover:bg-opacity-80
          transition
          cursor-pointer
        "
      >
        <FaFeather size={24} color="white" />
      </div>

      <div
        className="
          hidden
          lg:block
          mt-6
          px-4
          py-2
          rounded-full
          bg-sky-500
          hover:bg-opacity-90
        ">
          <p className="
            hidden
            lg:block
            text-center
            font-semibold
            text-white
            text-[20px]
          ">
            Tweet
          </p>
      </div>
    </div>
  );
}

export default SidebarTweetButton;