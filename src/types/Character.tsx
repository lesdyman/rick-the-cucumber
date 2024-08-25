import { Location } from "./Location";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: 'Human' | 'Alien' | string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
