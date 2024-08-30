import Image from "next/image";
import ChatLineProps from "./ChatLineProps";
import ChatMessageInterface from "../../lib/interfaces/ChatMessageInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Markdown from 'react-markdown'

export default function ChatLine({
  message,
}: {
  message: ChatMessageInterface;
}) {

  return (
    <div className="flex w-full bg-white/30 p-3 rounded">
      <div className="h-[50px] w-[50px] mr-3 flex-none">
        {message.isSquire ? (
          <Image
            src="/images/squire.jpeg"
            alt={"Squire photo"}
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUserCircle}
            className="h-[50px] text-gray-700"
          />
        )}
      </div>
      <div>
        <h3>
          {message.isSquire ? "Squire, the squire" : "You"}{" "}
          <span className="opacity-50">
            {message.timestamp
              ? new Date(message.timestamp).toLocaleString()
              : ""}
          </span>
        </h3>
        <Markdown>{message.text}</Markdown>
      </div>
    </div>
  );
}
