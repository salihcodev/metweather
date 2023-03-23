export type ReportsRowTypes = {
  checked: boolean;
  cities: string[];
  dates: { startDate: number; endDate: number }[];
  coords: { longitude: number; latitude: number }[];
  id: string;
  issuedDate: string;
  settings: { temperature: boolean; humidity: boolean };
};
