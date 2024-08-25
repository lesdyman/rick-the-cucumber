'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Character } from '@/types/Character';

type Props = {
  item: Character;
};

const Card: React.FC<Props> = ({ item }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/heroes/${item.id}`);
  };

  return (
    <div
      className="card bg-base-100 w-full max-w-sm sm:max-w-xs md:max-w-md lg:max-w-lg shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <figure>
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={300}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>Status: {item.status}</p>
        <p>Location: {item.location.name}</p>
      </div>
    </div>
  );
};

export default Card;
