import type { Photo, Photos, Video, Videos } from "pexels";
import { createClient } from "pexels";
import { shuffle } from "lodash";

const client = createClient(process.env.PEXELS_API_KEY as string);

type AppItem = {
  appId: string;
};

export type AppPhoto = Photo & AppItem;
export type AppVideo = Video & AppItem;
export type CuratedItems = Array<AppPhoto | AppVideo>;

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
    (item) => {
      const isVideo = Object.hasOwn(item, "video_files");
      return {
        ...item,
        appId: `${isVideo ? "v" : "i"}${item.id}`,
      };
    },
  );

  return curatedItems;
}

export default client;
