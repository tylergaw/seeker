import type { Photo, Photos, Video, Videos } from "pexels";
import client from "@api/client";
import ItemList from "@components/ItemList";
import { shuffle } from "lodash";

export default async function Curated() {
  const { photos } = (await client.photos.curated({ per_page: 30 })) as Photos;
  const { videos } = (await client.videos.popular({ per_page: 20 })) as Videos;
  // @ts-ignore - Because it's OK to concat two arrays
  const curatedItems: Array<Photo | Video> = shuffle(photos.concat(videos));

  return (
    <main>
      <h1>Curated</h1>
      <ItemList items={curatedItems} />
    </main>
  );
}
