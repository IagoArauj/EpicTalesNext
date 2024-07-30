export default interface EquipmentInterface {
  id: number;
  name: string;
  category: string;
  cost: string;
  weight?: string;
  armorClass?: string;
  damage?: string;
  strength?: string;
  stealth?: string;
  properties?: string;
  description?: string;
  vanilla: boolean;
}