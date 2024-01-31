import { IoSend } from "react-icons/io5";

export default function Chat() {
  return (
    <div className="bg-gray-900 p-4 pt-4 md:w-[20%] hidden md:flex rounded-md m-3 h-[88%]">
      <div className="relative h-full w-full">
        <div className="bg-gray-950 rounded p-2">
          <div className="flex items-center text-pink-400 space-x-2">
            <span>Username</span>
            <span>09:15</span>
          </div>
          <div className="mt-5 text-sm text-white">
            <p>Message text to chat...</p>
          </div>
        </div>
        <form action="" className="absolute bottom-0 w-full">
          <div className="flex relative ">
            <input
              type="text"
              name=""
              id=""
              placeholder="Send message..."
              className="px-3 py-2 bg-gray-950 rounded-md w-full"
            />
            <IoSend
            	size="1.5rem"
              className="absolute right-2 top-2 cursor-pointer text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}