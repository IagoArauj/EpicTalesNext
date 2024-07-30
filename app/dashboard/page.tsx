"use client";

import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Button from "../components/ui/Button";
import ChatLine from "../components/ui/ChatLine";
import { playfair } from "../components/ui/fonts";
import CampaignCard from "../components/ui/CampaignCard";
import { useState } from "react";

export default function Page() {
  const campaignsMock = [
    {
      id: 1,
      title: "The Lost Mines of Phandelver",
      description:
        "A group of adventurers has been tasked with finding the lost mines of Phandelver.",
    },
    {
      id: 2,
      title: "The Curse of Strahd"
    },
    {
      id: 3,
      title: "The Rise of Tiamat",
      description:
        "A group of adventurers has been tasked with stopping the dragon queen Tiamat.",
    },
  ];

  const squireWelcomeMessage = {
    user: {
      name: "Squire, the squire",
      avatar: "/images/squire.jpeg",
    },
    text: "Hi! I'm Squire, your AI companion. I can help you create parts of your campaign, NPCs and more! Do you need help with something?",
    timestamp: 1722118344339,
  };

  const [campaigns, setCampaigns] = useState(campaignsMock);
  const [messages, setMessages] = useState([squireWelcomeMessage]);

  return (
    <div className="flex flex-col">
      <h1
        className={`text-5xl mb-5 select-none text-center ${playfair.className} text-red-900`}
      >
        Welcome back to EpicTales!
      </h1>

      <h1 className="text-2xl font-bold mb-5 select-none mt-10 text-black">
        Your Last Ongoing Campaigns
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            title={campaign.title}
            description={campaign.description}
          />
        ))}
      </div>

      <div className="mt-5 w-1/2 mx-auto flex justify-center">
        <Button type="button" color="primary">
          See all campaigns
        </Button>
      </div>

      <h1 className={`text-2xl font-bold select-none mt-7`}>Talk with Squire</h1>
      <div className="mt-5 w-fill rounded-lg p-3 bg-white/30">
        {messages.map((message) => (
          <>
            <ChatLine key={message.timestamp} message={message} />
          </>
        ))}

        <div className="mt-5 flex">
          <input
            type="text"
            className="w-full p-3 bg-white flex-1 rounded-l"
            placeholder="Type your message..."
          />
          <Button type="button" color="primary" className="rounded-l-none rounded-r flex items-center" title="Send Message">
            <PaperAirplaneIcon className="w-5 mr" />
          </Button>
        </div>
      </div>
    </div>
  );
}
