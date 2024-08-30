import Link from "next/link";
import CampaignInterface from "../../lib/interfaces/CampaignInterface";
import { useEffect } from "react";

export default function CampaignCard({
  campaign,
}: {
  campaign: CampaignInterface;
}) {
  const style = campaign.status === "ONGOING" ? "text-slate-100 bg-red-900 hover:bg-red-700" : "bg-slate-400 text-slate-900 hover:bg-slate-300";

  return (
    <Link href={`/dashboard/campaigns/${campaign.id}`}>
      <div
        className={`flex flex-col justify-center h-full w-full items-center text-center ${style} rounded transition cursor-pointer py-7 px-5 hover:shadow-[0px_3px_10px_1px_rgba(0,0,0,0.3)]`}
      >
        <h2 className="text-2xl pb-4">{campaign.title}</h2>
        <p>
          {campaign.description || (
            <span className="italic text-slate-200">
              No description available
            </span>
          )}
        </p>
        <p className="mt-3 font-bold italic">
          Status: {campaign.status === "ONGOING" ? "Ongoing" : "Completed"}
        </p>
      </div>
    </Link>
  );
}
