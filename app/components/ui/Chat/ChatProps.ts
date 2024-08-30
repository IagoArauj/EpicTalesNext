import { Dispatch, SetStateAction } from "react";
import ChatMessageInterface from "../../lib/interfaces/ChatMessageInterface";

export default interface ChatProps {
  messages: ChatMessageInterface[];
  setMessages: Dispatch<SetStateAction<ChatMessageInterface[]>>;
  maxHeight?: string;
}