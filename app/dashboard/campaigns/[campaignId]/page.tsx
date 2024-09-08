"use client";

import CampaignInterface from "@/app/components/lib/interfaces/CampaignInterface";
import Button from "@/app/components/ui/Button";
import Lottie from "react-lottie";
import { playfair } from "@/app/components/ui/fonts";
import animationData from "@/app/components/ui/lotties/BookSearch.json";
import {
  faArrowLeft,
  faCopy,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/app/components/lib/api";
import LoadingCampaign from "@/app/components/ui/Mocks/LoadingCampaign";
import NoteInterface from "@/app/components/lib/interfaces/NoteInterface";
import { toast } from "react-toastify";

export default function Page({ params }: { params: { campaignId: string } }) {
  const [campaign, setCampaign] = useState<CampaignInterface | undefined>();
  const [error, setError] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
    })();
  }, [params.campaignId]);

  const saveNote = async () => {
    try {
      setIsSaving(true);
      const response = await toast.promise(
        api.post(`/campaigns/${params.campaignId}/notes/create/`, {
          content: noteContent,
        }),
        {
          pending: "Saving...",
          success: "Note saved successfully",
          error: "An error occurred. Please try again",
        }
      );

      setCampaign((prev) => {
        if (!prev) return prev;

        const notes = prev.notes || [];
        notes.push(response.data);
        console.log(notes);

        return { ...prev, notes };
      });
      setNoteContent("");
    } catch (error) {
      console.error(error);
    }
    setIsSaving(false);
  };

  const deleteNote = useCallback(async (note: NoteInterface) => {
    try {
      const response = await toast.promise(
        api.delete(`/campaigns/${params.campaignId}/notes/${note.id}/`),
        {
          pending: "Deleting...",
          success: "Note deleted successfully",
          error: "An error occurred. Please try again",
        }
      );

      setCampaign((prev) => {
        if (!prev) return prev;
        const notes = prev.notes || [];
        const index = notes.findIndex((n) => n.id === note.id);
        notes.splice(index, 1);
        console.log(notes);
        return { ...prev, notes };
      });
    } catch (error) {
      console.error(error);
    }
  }, [params.campaignId]);

  return !campaign ? (
    <LoadingCampaign error={error} />
  ) : (
    <>
      <div className="flex flex-col">
        <div className="relative">
          <Link href="/dashboard/campaigns" className="absolute top-0 left-0">
            <Button type="button" color="primaryOutline" className="flex-none">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </Button>
          </Link>
          <h1
            className={`text-5xl mb-5 select-none text-center ${playfair.className} text-red-900 flex-1`}
          >
            {campaign?.title}
          </h1>
        </div>

        <div className="bg-white/40 p-5 rounded-lg w-fill overflow-y-auto mb-3">
          <h2 className={`text-2xl mb-5 text-center ${playfair.className}`}>
            Description
          </h2>
          <p className={`text-center`}>
            {campaign?.description || "No description available"}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="bg-white/40 p-5 rounded-lg w-8/12 overflow-y-auto">
          <h2 className={`text-2xl mb-5 text-center ${playfair.className}`}>
            Story
          </h2>
          <p className="text-justify">
            {campaign?.story || "No story available"}
          </p>
        </div>

        <div className="flex flex-col gap-3 w-4/12">
          <div className="bg-white/40 p-5 rounded-lg">
            <h2 className={`text-2xl mb-5 text-center ${playfair.className}`}>
              Actions
            </h2>
            <div className="flex gap-2">
              <Link className="flex-1" href={`/table/${params.campaignId}`}>
                <Button type="button" color="primary" className="w-full">
                  Go To Session
                </Button>
              </Link>
              <Link
                className="flex-1"
                href={`/dashboard/campaigns/${params.campaignId}/edit`}
              >
                <Button type="button" color="primary" className="w-full">
                  Edit Campaign
                </Button>
              </Link>
            </div>
            <p className="mt-3 mb-2">Invite Link</p>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={`https://epictales.com/i/${campaign?.invite_link}`}
                className="w-full p-3 bg-white/50 rounded-l-lg cursor-default"
              />
              <Button
                type="button"
                color="primary"
                className="flex-none rounded-l-none"
                title="Copy invite link"
              >
                <FontAwesomeIcon icon={faCopy} />
              </Button>
            </div>
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
            <div className="relative">
              <h2 className={`text-2xl mb-5 text-center ${playfair.className}`}>
                Notes
              </h2>
              <Button
                type="button"
                color={!addNote ? "primary" : "secondary"}
                className="absolute top-0 right-0 transition"
                onClick={() => setAddNote(!addNote)}
              >
                {addNote ? "× Cancel" : "+ Add"}
              </Button>
            </div>
            {addNote && (
              <div className="bg-white/30 rounded-lg mb-3">
                <textarea
                  className="w-full p-3 bg-transparent rounded-lg"
                  placeholder="Add a note..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                ></textarea>
                <Button
                  type="button"
                  color="primary"
                  className="w-full"
                  onClick={saveNote}
                  isLoading={isSaving}
                >
                  Save Note
                </Button>
              </div>
            )}
            {campaign?.notes && campaign?.notes?.length > 0 ? (
              campaign?.notes?.map((note) => (
                <div
                  key={note.id}
                  className="bg-white/30 p-3 rounded-lg mb-3 relative"
                >
                  <Button
                    type="button"
                    color="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => deleteNote(note)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
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
