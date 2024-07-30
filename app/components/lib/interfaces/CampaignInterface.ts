import CharacterInterface from "./CharacterInterface";
import NoteInterface from "./NoteInterface";

export default interface CampaignInterface {
  id: number;
  title: string;
  description?: string;
  status: "ongoing" | "completed";
  dungeonMasterId?: number;
  characters?: CharacterInterface[];
  story?: string;
  notes?: NoteInterface[];
}