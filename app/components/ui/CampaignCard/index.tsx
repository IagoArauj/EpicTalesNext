import Link from "next/link";

export default function CampaignCard({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description?: string;
}) {
  return (
    <Link href={`/dashboard/campaigns/${id}`}>
      <div className="flex flex-col justify-center h-full w-full items-center text-center text-slate-100 bg-red-900 rounded transition cursor-pointer hover:bg-red-700 hover:shadow-[0px_3px_10px_1px_rgba(0,0,0,0.3)] py-7 px-5">
        <h2 className="text-2xl pb-4">{title}</h2>
        <p>
          {description || (
            <span className="italic text-slate-200">
              No description available
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
