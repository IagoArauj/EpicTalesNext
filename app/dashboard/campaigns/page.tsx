"use client";

import CampaignCard from "@/app/components/ui/CampaignCard";
import { playfair } from "@/app/components/ui/fonts";
import { useState } from "react";

export default function Page() {
  const campaignsMock = [
    {
      id: 1,
      title: "The Lost Mines of Phandelver",
      description:
        "A group of adventurers has been tasked with finding the lost mines of Phandelver.",
      status: "ongoing",
    },
    {
      id: 2,
      title: "The Curse of Strahd",
      status: "ongoing",
    },
    {
      id: 3,
      title: "The Rise of Tiamat",
      description:
        "A group of adventurers has been tasked with stopping the dragon queen Tiamat.",
      status: "ongoing",
    },
    {
      id: 4,
      title: "The Shadows of Eldoria",
      description:
        "A dark and mysterious campaign set in the ancient city of Eldoria.",
      status: "completed",
    },
  ];

  const [campaigns, setCampaigns] = useState(campaignsMock);

  return (
    <div className="flex flex-col">
      <h1
        className={`text-5xl mb-5 select-none text-center ${playfair.className} text-red-900`}
      >
        Campaigns
      </h1>

      <h1 className="text-2xl font-bold mb-5 select-none mt-10 text-black">
        Your Ongoing Campaigns
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {campaigns
          .filter((campaign) => campaign.status === "ongoing")
          .map((campaign) => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              title={campaign.title}
              description={campaign.description}
            />
          ))}
      </div>

      <h1 className="text-2xl font-bold mb-5 select-none mt-10 text-black">
        Your Completed Campaigns
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {campaigns
          .filter((campaign) => campaign.status === "completed")
          .map((campaign) => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              title={campaign.title}
              description={campaign.description}
            />
          ))}
      </div>
    </div>
  );
}
