"use client";

import CampaignInterface from "@/app/components/lib/interfaces/CampaignInterface";
import Button from "@/app/components/ui/Button";
import ChatLine from "@/app/components/ui/ChatLine";
import { playfair } from "@/app/components/ui/fonts";
import { faArrowLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { campaignId: string } }) {
  const campaignsMock: CampaignInterface[] = [
    {
      id: 1,
      title: "The Lost Mines of Phandelver",
      description:
        "A group of adventurers has been tasked with finding the lost mines of Phandelver.",
      status: "ongoing",
      story: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at molestie eros, ultricies convallis turpis. Curabitur dictum sapien vel pretium ullamcorper. Donec aliquam nec sapien ut molestie. Cras rutrum ante venenatis nisi molestie scelerisque. Mauris porta nisi orci, in congue nulla tempor ut. Integer commodo diam ex, at posuere nisi aliquet at. Vivamus ac purus vel metus molestie facilisis. Donec posuere, dui eu egestas feugiat, tortor velit semper dui, semper lobortis tortor tellus et lacus. Mauris mattis aliquet elit eu consequat. In nec tortor quam. In fringilla ipsum sit amet ante tempor vestibulum. Suspendisse potenti. Ut sagittis dui non elit faucibus mattis. Praesent nunc lectus, viverra vel nulla id, maximus sollicitudin lectus.

Nunc pellentesque sit amet nulla vitae ultrices. Sed ultricies leo at elit volutpat, nec consectetur tellus laoreet. In porta iaculis eros eu vestibulum. Mauris quis dignissim elit. Proin lectus sapien, hendrerit id imperdiet in, efficitur vel erat. Aliquam erat volutpat. Suspendisse et interdum libero. Maecenas metus neque, aliquam sagittis efficitur non, fringilla id elit. Integer dapibus consequat diam nec convallis. Proin tempor turpis quis cursus placerat. Etiam et nisi viverra, laoreet nibh ac, porta leo. Cras orci risus, convallis in vehicula sit amet, volutpat et nulla. Ut maximus quis neque ac sagittis. Quisque semper condimentum tempor.

Maecenas vitae metus enim. Suspendisse eu diam libero. Aliquam in nulla nulla. Sed vel maximus nulla, sit amet dignissim urna. Donec arcu elit, porta non pretium in, semper tempus odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce at eros vel sapien aliquet sagittis. Ut porta, elit eget euismod tempus, velit orci bibendum velit, sed volutpat arcu lorem at neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia, sem nec aliquam molestie, felis felis iaculis urna, bibendum accumsan lacus nunc ut nibh. Ut ultricies et augue ac placerat. Curabitur magna dui, ultrices eget fringilla quis, blandit ut lorem. Vivamus at tellus placerat, tempor nisi in, laoreet mi. Ut quis ligula fermentum, porta dolor eu, auctor lacus. In tincidunt nibh et sapien blandit, sit amet mattis dui eleifend.

In hac habitasse platea dictumst. Morbi ut elementum neque, at porta orci. Duis facilisis id enim sed rhoncus. Quisque velit est, bibendum sed imperdiet in, rhoncus sit amet ex. Ut iaculis orci vitae fermentum pulvinar. Donec mauris justo, pretium ac condimentum quis, ornare sed nisl. Donec tempus magna imperdiet, facilisis erat ac, pharetra orci. Suspendisse a est sem. Donec a lectus et ante imperdiet viverra non ac dui. Praesent ultrices tortor sed est dictum lobortis. Sed at neque a sem consectetur porta in a nisi.

Quisque mattis id lorem a lobortis. Duis eget gravida felis. Sed tincidunt quis arcu quis commodo. Proin auctor bibendum elit, eget dignissim nibh euismod at. Suspendisse sit amet ullamcorper arcu. Integer sodales efficitur ipsum vitae maximus. Nunc et ex justo. Aenean in quam felis. Etiam placerat diam nec varius interdum. Proin vitae libero semper, rhoncus nulla non, blandit dolor. Curabitur at pellentesque quam, sed faucibus orci. Cras ullamcorper turpis ac sem molestie semper.`,
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
      story:
        "A group of adventurers has been tasked with stopping the dragon queen Tiamat.",
    },
    {
      id: 4,
      title: "The Shadows of Eldoria",
      description:
        "A dark and mysterious campaign set in the ancient city of Eldoria.",
      status: "completed",
      story:
        "A dark and mysterious campaign set in the ancient city of Eldoria.",
    },
  ];

  const squireWelcomeMessage = {
    user: {
      name: "Squire",
      avatar: "/images/squire.jpeg",
    },
    text: "Hi! I'm Squire, your AI companion. I can help you create parts of your campaign, NPCs and more! Do you need help with something?",
    timestamp: 1722118344339,
  };

  const [messages, setMessages] = useState([squireWelcomeMessage]);
  const [campaign, setCampaign] = useState<CampaignInterface | undefined>();

  useEffect(() => {
    const _campaign = campaignsMock.find(
      (campaign) => campaign.id === Number(params.campaignId)
    );

    setCampaign(_campaign);
  }, [params.campaignId]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex">
          <Link href="/dashboard/campaigns" className="h-fit">
            <Button type="button" color="primaryOutline" className="flex-none">
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Button>
          </Link>
          <h1
            className={`text-5xl mb-5 select-none text-center ${playfair.className} text-red-900 flex-1`}
          >
            {campaign?.title}
          </h1>
          <Link
            href={`/dashboard/campaigns/${params.campaignId}/edit`}
            className="h-fit"
          >
            <Button type="button" color="secondary" className="flex-none">
              <FontAwesomeIcon icon={faPencil} /> Edit
            </Button>
          </Link>
        </div>

        <p
          className={`text-xl mb-5 select-none text-center ${playfair.className} text-red-900`}
        >
          {campaign?.description || "No description available"}
        </p>
      </div>

      <div className="flex gap-3">
        <div className="bg-white/40 p-5 rounded-lg w-8/12 overflow-y-auto">
          <h2 className={`text-2xl mb-5 text-center ${playfair.className}`}>
            Story
          </h2>
          <p className="text-justify">{campaign?.story || "No story available"}</p>
        </div>

        <div className="flex flex-col gap-3 w-4/12">
          <div className="bg-white/40 p-5 rounded-lg">
            <h2 className={`text-2xl mb-5 text-center ${playfair.className}`}>
              Talk with Squire
            </h2>
            <p>
              If you need help with something, feel free to ask Squire. He's
              always here to help you out!
            </p>
            <Button type="button" color="primary" className="mt-5 w-[100%]">
              Start Chatting with Squire
            </Button>
          </div>
          <div className="bg-white/40 p-5 rounded-lg">
            <h2 className={`text-2xl mb-5 text-center ${playfair.className}`}>
              Characters
            </h2>
            <div className="bg-white/30 p-3 items-center rounded-lg mb-3 flex transition cursor-pointer hover:bg-red-900 hover:text-white">
              <div className={`w-4/12 ${playfair.className}`}>
                Aldric Blackthorn
              </div>
              <div className="flex-1 text-center">Druid</div>
              <div className="text-right">LV 10</div>
            </div>

            <div className="bg-white/30 p-3 items-center rounded-lg mb-3 flex transition cursor-pointer hover:bg-red-900 hover:text-white">
              <div className={`w-4/12 ${playfair.className}`}>
                Brynn Duskwalker
              </div>
              <div className="flex-1 text-center">Rogue</div>
              <div className="text-right">LV 12</div>
            </div>

            <div className="bg-white/30 p-3 items-center rounded-lg mb-3 flex transition cursor-pointer hover:bg-red-900 hover:text-white">
              <div className={`w-4/12 ${playfair.className}`}>
                Caelan Fireforge
              </div>
              <div className="flex-1 text-center">Cleric</div>
              <div className="text-right">LV 9</div>
            </div>
          </div>
          <div className="bg-white/40 p-5 rounded-lg">
            <h2 className={`text-2xl mb-5 text-center ${playfair.className}`}>
              Notes
            </h2>
            {campaign?.notes ? (
              campaign?.notes?.map((note) => (
                <div key={note.id} className="bg-white/30 p-3 rounded-lg mb-3">
                  <p>{note.content}</p>
                </div>
              ))
            ) : (
              <p>No notes available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
