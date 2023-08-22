import type { Photo, Photos, Video, Videos } from "pexels";
import { createClient } from "pexels";
import { shuffle } from "lodash";

const client = createClient(process.env.PEXELS_API_KEY as string);

type AppItem = {
  appId: string;
  itemType: "photo" | "video";
};

export type AppPhoto = Photo & AppItem;
export type AppVideo = Video & AppItem;
export type CuratedItems = Array<AppPhoto | AppVideo>;

function getExtendedItem(item: Photo | Video): AppPhoto | AppVideo {
  const isVideo = Object.hasOwn(item, "video_files");

  return {
    ...item,
    appId: `${isVideo ? "v" : "i"}${item.id}`,
    itemType: isVideo ? "video" : "photo",
  };
}

export async function getCurated(
  numPhotos: number = 30,
  numVideos: number = 20,
): Promise<CuratedItems> {
  const { photos } = (await client.photos.curated({
    per_page: numPhotos,
  })) as Photos;
  const { videos } = (await client.videos.popular({
    per_page: numVideos,
  })) as Videos;
  // @ts-ignore - Because it's OK to concat two arrays
  const curatedItems: CuratedItems = shuffle(photos.concat(videos)).map(
    (item) => getExtendedItem(item),
  );

  return curatedItems;
}

export async function getItem(id: string): Promise<AppPhoto | AppVideo> {
  const itemType = id.slice(0, 1);
  const itemId = id.slice(1, id.length);
  const clientFunc = itemType === "v" ? "videos" : "photos";
  const item = await client[clientFunc].show({ id: itemId });
  // @ts-ignore - TODO: Handle the ErrorResponse case
  return getExtendedItem(item);
}

export default client;
