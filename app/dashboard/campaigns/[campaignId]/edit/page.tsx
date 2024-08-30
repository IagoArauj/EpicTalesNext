"use client";

import CampaignInterface from "@/app/components/lib/interfaces/CampaignInterface";
import ChatMessageInterface from "@/app/components/lib/interfaces/ChatMessageInterface";
import Button from "@/app/components/ui/Button";
import Chat from "@/app/components/ui/Chat";
import { playfair } from "@/app/components/ui/fonts";
import Input from "@/app/components/ui/Input";
import Select from "@/app/components/ui/Select";
import TextBox from "@/app/components/ui/TextBox";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page({ params }: { params: { campaignId: string } }) {
  const [messages, setMessages] = useState<ChatMessageInterface[]>([]);
  const [campaign, setCampaign] = useState<CampaignInterface | undefined>();
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {}, []);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );
    await toast.promise(resolveAfter3Sec, {
      pending: "Saving changes...",
      success: "Changes saved successfully!",
      error: "An error occurred while saving changes.",
    });
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative">
        <Link
          href={`/dashboard/campaigns/${params.campaignId}`}
          className="h-fit absolute top-0 left-0"
        >
          <Button type="button" color="primaryOutline">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
          </Button>
        </Link>
        <h1
          className={`text-center text-4xl ${playfair.className} text-red-900 select-none`}
        >
          Edit Campaign
        </h1>
      </div>

      <div className="flex gap-3">
        <div className="bg-white/30 flex flex-col rounded-lg w-8/12">
          <div className="bg-white/60 p-4 flex items-center justify-between rounded-t-lg">
            <h2 className="text-xl font-bold">Campaign Details</h2>
          </div>

          <div className="p-4">
            <div className="flex flex-col space-y-4">
              <Input value={campaign?.title} type="text" label="Title" />
              <Input
                value={campaign?.description}
                type="text"
                label="Description"
              />
              <Select
                value={campaign?.status}
                options={[
                  { value: "ongoing", label: "Ongoing" },
                  { value: "completed", label: "Completed" },
                ]}
                label="Campaign Status"
              />
              <Input
                value={`https://epictales.com/i/${campaign?.inviteHash}`}
                type="text"
                label="Invite Hash"
                readOnly
                title="This is the invite hash for your campaign and it's generated automatically. Share this with your players to invite them to your campaign."
              />
            </div>
          </div>
        </div>

        <div className="bg-white/30 flex flex-col rounded-lg w-4/12">
          <div className="bg-white/60 p-4 flex items-center justify-between rounded-t-lg">
            <h2 className="text-xl font-bold">Squire</h2>
          </div>

          <div className="p-2 flex-1">
            <Chat messages={messages} setMessages={setMessages} />
          </div>
        </div>
      </div>

      <div className="bg-white/30 flex flex-col rounded-lg">
        <div className="bg-white/60 p-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold">Campaign Story</h2>
        </div>
        <TextBox
          value={campaign?.story}
          rows={20}
          className="rounded-none rounded-b-lg bg-white text-justify"
        />
      </div>

      <div className="flex">
        <Button
          onClick={handleSaveChanges}
          className="w-[100%]"
          type="button"
          color="primary"
          isLoading={isSaving}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
