import Lottie from "react-lottie";
import animationLoading from "@/app/components/ui/lotties/BookSearch.json";
import animationError from "@/app/components/ui/lotties/Error.json";
import Link from "next/link";
import Button from "../../Button";

export default function LoadingCampaign({error}: {error: boolean}) {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      className: "cursor-default",
    },
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-white/50 overflow-hidden rounded-lg text-center p-10">
        {error ? (
          <>
            <Lottie
              options={{
                animationData: animationError,
                ...lottieOptions,
              }}
              isClickToPauseDisabled={true}
              height={200}
              width={200}
            />
            <p className="mt-5 text-red-900 font-bold">The squire couldn't find this campaign</p>
            <Link href="/dashboard/campaigns">
              <Button color="primary" type="button" className="w-[100%] mt-3">Go back</Button>
            </Link>
          </>
        ) : (
          <>
            <p className="mt-[-100px]"></p>
            <Lottie
              options={{
                animationData: animationLoading,
                ...lottieOptions,
              }}
              isClickToPauseDisabled={true}
            />
            <p className="mt-[-100px] mb-5">Finding your campaign...</p>
          </>
        )}
      </div>
    </div>
  );
}
