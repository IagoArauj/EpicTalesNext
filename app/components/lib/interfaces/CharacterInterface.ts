import EquipmentInterface from "./EquipmentInterface";
import SpellInterface from "./SpellInterface";

export default interface CharacterInterface {
  id: number;
  name: string;
  race: string;
  class: string;
  summary?: string;
  xp: number;
  hp: number;
  ac: number;
  alignment: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  inspiration: number;
  proficiencyBonus: number;
  proficientSkills: string[];
  passiveWisdom: number;
  languagesAndOtherProficiencies: string;
  gold: number;
  silver: number;
  copper: number;
  electrum: number;
  platinum: number;
  equipment: EquipmentInterface[];
  spells: SpellInterface[];
  featuresAndTraits?: string;
  campaignId: number;
  userId: number;
}
