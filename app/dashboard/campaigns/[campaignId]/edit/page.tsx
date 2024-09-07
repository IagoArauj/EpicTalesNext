"use client";

import { api } from "@/app/components/lib/api";
import ChatMessageInterface from "@/app/components/lib/interfaces/ChatMessageInterface";
import Button from "@/app/components/ui/Button";
import Chat from "@/app/components/ui/Chat";
import { playfair } from "@/app/components/ui/fonts";
import Input from "@/app/components/ui/Input";
import Select from "@/app/components/ui/Select";
import TextBox from "@/app/components/ui/TextBox";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import CampaignInterface from "@/app/components/lib/interfaces/CampaignInterface";
import LoadingCampaign from "@/app/components/ui/Mocks/LoadingCampaign";

export default function Page({ params }: { params: { campaignId: string } }) {
  const [messages, setMessages] = useState<ChatMessageInterface[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [chatHeight, setChatHeight] = useState<string | undefined>(undefined);
  const [campaign, setCampaign] = useState<CampaignInterface | undefined>();
  const [error, setError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (chatRef.current) setChatHeight(`${chatRef.current?.clientHeight}px`);
  }, [chatRef.current?.clientHeight]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/campaigns/${params.campaignId}`);
        if (response.status !== 200) {
          setError(true);
          return;
        }
        setCampaign(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    )();
  }, [params.campaignId]);

  const campaignSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
    story: Yup.string().required("Story is required"),
  });

  const handleSubmit = async (values: any) => {
    setIsSaving(true);
    const response = await toast.promise(
      api.put(`campaigns/${campaign?.id}/`, values),
      {
        pending: "Saving changes...",
        success: "Changes saved successfully!\nRedirecting...",
        error: "An error occurred while saving changes.",
      }
    );

    if (response?.status === 200) {
      console.log(response.data);
      router.push(`/dashboard/campaigns/${response.data.id}`);
    }
    setIsSaving(false);
  };

  return !campaign ? (
    <LoadingCampaign error={error} />
  ) : (
    <div className="flex flex-col space-y-4">
      <div className="relative">
        <Link
          href={`/dashboard/campaigns`}
          className="h-fit absolute top-0 left-0"
        >
          <Button type="button" color="primaryOutline">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
          </Button>
        </Link>
        <h1
          className={`text-center text-4xl ${playfair.className} text-red-900 select-none`}
        >
          Editing Campaign #{campaign?.id}
        </h1>
      </div>

      <Formik
        initialValues={campaign}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await handleSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={campaignSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          isSubmitting,
          touched,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="bg-white/30 flex flex-col rounded-lg w-8/12">
                <div className="bg-white/60 p-4 flex items-center justify-between rounded-t-lg">
                  <h2 className="text-xl font-bold">Campaign Details</h2>
                </div>

                <div className="p-4">
                  <Input
                    id="title"
                    type="text"
                    label="Title"
                    value={values.title}
                    onChange={handleChange}
                    errors={errors.title && touched.title ? errors.title : ""}
                  />
                  <TextBox
                    id="description"
                    label="Description"
                    value={values.description}
                    onChange={handleChange}
                    errors={
                      errors.description && touched.description
                        ? errors.description
                        : ""
                    }
                  />
                  <Select
                    id="status"
                    options={[
                      { value: "ONGOING", label: "Ongoing" },
                      { value: "COMPLETED", label: "Completed" },
                    ]}
                    label="Campaign Status"
                    value={values.status}
                    onChange={handleChange}
                    errors={
                      errors.status && touched.status ? errors.status : ""
                    }
                  />
                  <Input
                    value={`This field will be automatically generated once you create your campaign.`}
                    type="text"
                    label="Invite Hash"
                    readOnly
                    title="This is the invite hash for your campaign and it's generated automatically. Share this with your players to invite them to your campaign."
                  />
                </div>
              </div>

              <div className={`bg-white/30 flex flex-col rounded-lg w-4/12`}>
                <div className="bg-white/60 p-4 flex items-center justify-between rounded-t-lg">
                  <h2 className="text-xl font-bold">Squire</h2>
                </div>

                <div ref={chatRef} className="flex-1">
                  <Chat messages={messages} setMessages={setMessages} />
                </div>
              </div>
            </div>

            <div className="bg-white/30 flex flex-col rounded-lg">
              <div className="bg-white/60 p-4 flex items-center justify-between rounded-t-lg">
                <h2 className="text-xl font-bold">Campaign Story</h2>
              </div>
              <TextBox
                id="story"
                rows={10}
                className="rounded-none rounded-b-lg bg-white text-justify"
                value={values.story}
                onChange={handleChange}
                errors={errors.story && touched.story ? errors.story : ""}
              />
            </div>

            <div className="flex">
              <Button
                className="w-[100%]"
                type="submit"
                color="primary"
                isLoading={isSaving}
              >
                Save Campaign
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
