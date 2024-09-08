import Image from "next/image";

export default function ChatLineMock() {
  return (
    <div className="flex w-full bg-white/30 p-3 rounded">
      <div className="h-[50px] w-[50px] mr-3 flex-none">
        <Image
          src="/images/squire.jpeg"
          alt={"Squire photo"}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div>
        <h3>Squire, the squire </h3>
        <Image alt="Loading..." src="/svg/Loading_Dots.svg" className="h-[2rem] w-auto" />
      </div>
    </div>
  );
}
