import { Character } from "@/types/Character";
import Card from "./card";

type Props = {
  itemsToShow: Character[];
}

const Grid: React.FC<Props> = ({itemsToShow}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {itemsToShow.map((person) => (
    <Card item={person} key={person.id}/>
  ))}
</div>
)

export default Grid;