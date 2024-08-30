"use client";

import { api } from "@/app/components/lib/api";
import CampaignInterface from "@/app/components/lib/interfaces/CampaignInterface";
import Button from "@/app/components/ui/Button";
import CampaignCard from "@/app/components/ui/CampaignCard";
import { playfair } from "@/app/components/ui/fonts";
import CampaignCardMock from "@/app/components/ui/Mocks/CampaignCardMock";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [campaigns, setCampaigns] = useState<CampaignInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    const getCampaigns = async () => {
      setLoading(true);
      try {
        const response = await api.get("/campaigns");
        console.log(response.data);
        setCampaigns(response.data.results);
        setNextUrl(response.data.next_page);
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

  const loadMore = async () => {
    if (!nextUrl) {
      toast.info("No more campaigns to load.");
      return;
    }
    setLoadingMore(true);

    try {
      const response = await api.get(nextUrl);
      setCampaigns([...campaigns, ...response.data.results]);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while getting more campaigns.");
    }

    setLoadingMore(false);
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <h1
          className={`text-5xl mb-5 select-none text-center ${playfair.className} text-red-900`}
        >
          Campaigns
        </h1>
        <Link
          href="/dashboard/campaigns/create"
          className="absolute top-0 right-0"
        >
          <Button type="button" color="primary" className="text-lg">
            <FontAwesomeIcon icon={faPlus} className="mr-2 w-[1rem]" /> Create a
            new campaign
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-5 select-none mt-10 text-black">
        Your Campaigns
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <>
            <CampaignCardMock />
            <CampaignCardMock />
          </>
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))
        )}
      </div>
      <div className="mx-auto">
        <Button
          type="button"
          color="primary"
          className="mt-10 w-fit-content"
          onClick={loadMore}
          disabled={!nextUrl}
          title={nextUrl ? "Load more campaigns" : "No more campaigns to load"}
          isLoading={loadingMore}
        >
          Load more
        </Button>
      </div>
    </div>
  );
}
