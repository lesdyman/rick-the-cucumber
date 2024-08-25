import planet from '../assets/photo_assets/world.webp';
import cluster from '../assets/photo_assets/cluster.jpeg';
import resort from '../assets/photo_assets/resort.webp';
import space_station from '../assets/photo_assets/space_station.jpeg';
import microverse from '../assets/photo_assets/microverse.webp';
import tv from '../assets/photo_assets/tv.jpeg';
import fantasy_town from '../assets/photo_assets/fantasy_town.jpeg';

import { StaticImageData } from 'next/image';


export const typeToImageMap: Record<string, StaticImageData> = {
  Planet: planet,
  Cluster: cluster,
  Resort: resort,
  "Space Station": space_station,
  Microverse: microverse,
  TV: tv,
  "Fantasy town":fantasy_town,
};
