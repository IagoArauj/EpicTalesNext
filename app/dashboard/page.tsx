"use client";

import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Button from "../components/ui/Button";
import ChatLine from "../components/ui/ChatLine";
import { playfair } from "../components/ui/fonts";
import CampaignCard from "../components/ui/CampaignCard";
import { useEffect, useState } from "react";
import Chat from "../components/ui/Chat";
import ChatMessageInterface from "../components/lib/interfaces/ChatMessageInterface";
import { api } from "../components/lib/api";
import { toast } from "react-toastify";
import CampaignCardMock from "../components/ui/Mocks/CampaignCardMock";
import CampaignInterface from "../components/lib/interfaces/CampaignInterface";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [campaigns, setCampaigns] = useState<CampaignInterface[]>([]);
  const [messages, setMessages] = useState<ChatMessageInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCampaigns = async () => {
      setLoading(true);
      try {
        const response = await api.get("/campaigns/ongoing");
        setCampaigns(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    (async () =>
      await toast.promise(getCampaigns, {
        error: "An error occurred while getting your campaigns.",
      }))();
  }, []);

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
        {loading ? (
          <>
            <CampaignCardMock />
            <CampaignCardMock />
            <CampaignCardMock />
          </>
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
            />
          ))
        )}
      </div>

      <div className="mt-5 w-1/2 mx-auto flex justify-center">
        <Link href="/dashboard/campaigns">
          <Button type="button" color="primaryOutline">
            <FontAwesomeIcon icon={faEye} className="mr-2" /> See all campaigns
          </Button>
        </Link>

        <Link href="/dashboard/campaigns/create">
          <Button type="button" color="primaryOutline" className="ml-3">
           <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create a new campaign
          </Button>
        </Link>
      </div>

      <h1 className={`text-2xl font-bold select-none mt-7`}>
        Talk with Squire
      </h1>
      <div className="mt-5 w-fill rounded-lg p-3 bg-white/30">
        <Chat messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}
