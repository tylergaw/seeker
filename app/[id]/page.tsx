import { FC } from "react";
import type { AppPhoto, AppVideo } from "@api/client";

import Image from "next/image";
import { getCurated, getItem } from "@api/client";
import { getImgDimensionsFromUrl } from "@util/ui";
import styles from "./style.module.css";

export async function generateStaticParams() {
  const curatedItems = await getCurated();
  return curatedItems.map((item) => ({
    id: `${item.appId}`,
  }));
}

const PhotoDisplay: FC<{ photo: AppPhoto }> = ({ photo }) => {
  const src = photo.src.portrait;
  const { width = 1200, height = 800 } = getImgDimensionsFromUrl(src);

  return (
    <Image src={src} alt={photo.alt || ""} width={width} height={height} />
  );
};

const VideoDisplay: FC<{ video: AppVideo }> = ({ video }) => {
  const hdVideos = video.video_files
    .filter((video) => video.quality === "hd")
    .sort((a, b) => (b.width || 2) - (a.width || 1));
  const { width, height, link, file_type } = hdVideos[0];
  return (
    <video width={width || 1000} height={height || 650} controls>
      <source src={link} type={file_type} />
    </video>
  );
};

export default async function ItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const item = await getItem(id);
  const { itemType } = item;

  return (
    <main>
      <h1 className="title-mega">{id}</h1>
      <div className={styles.container}>
        {itemType === "photo" && <PhotoDisplay photo={item as AppPhoto} />}
        {itemType === "video" && <VideoDisplay video={item as AppVideo} />}
      </div>
    </main>
  );
}
