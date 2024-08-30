import CharacterInterface from "./CharacterInterface";
import NoteInterface from "./NoteInterface";

export default interface CampaignInterface {
  id: number;
  title: string;
  description?: string;
  status: "ONGOING" | "COMPLETED";
  dungeonMasterId?: number;
  characters?: CharacterInterface[];
  story?: string;
  notes?: NoteInterface[];
  invite_link?: string;
}