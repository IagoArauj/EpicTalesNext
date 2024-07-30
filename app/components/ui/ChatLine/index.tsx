import Image from "next/image";
import ChatLineProps from "./ChatLineProps";

export default function ChatLine({ message }: ChatLineProps) {
  console.log(message);

  return (
    <div className="flex w-full bg-white/30 p-3 rounded">
      <div className="h-[50px] w-[50px] mr-3 flex-none">
        <Image
          src={message.user.avatar}
          alt={message.user.name}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div>
        <h3>
          {message.user.name}{" "}
          <span className="opacity-50">
            {message.timestamp
              ? new Date(message.timestamp).toLocaleString()
              : ""}
          </span>
        </h3>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
