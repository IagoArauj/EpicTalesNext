export default function CampaignCardMock() {
  return (
    <div className="h-[150px] w-full  bg-red-700 rounded py-7 px-5">
      <div className="flex flex-col justify-center items-center animate-pulse">
        <div className="bg-slate-300 h-[2rem] rounded w-full mb-4" />
        <div className="bg-slate-300 h-[1.2rem] w-full rounded mb-2" />
        <div className="bg-slate-300 h-[1.2rem] w-full rounded" />
      </div>
    </div>
  );
}
