import { getCurated } from "@api/client";
import ItemList from "@components/ItemList";

export default async function Curated() {
  const curatedItems = await getCurated();

  return (
    <main>
      <h1 className="title-mega">Curated</h1>
      <ItemList items={curatedItems} />
    </main>
  );
}
