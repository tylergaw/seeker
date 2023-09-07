import type { FC } from "react";
import type { AppPhoto, AppVideo, CuratedItems } from "@api/client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { random } from "lodash";

import { getImgDimensionsFromUrl } from "@util/ui";
import styles from "./style.module.css";

const PhotoGraphic: FC<{ photo: AppPhoto }> = ({ photo }) => {
  const src = photo.src.large;
  const { width = 300, height = 250 } = getImgDimensionsFromUrl(src);
  return (
    <Image
      src={src}
      alt={photo.alt || ""}
      width={width - random(15, 75)}
      height={height + random(5, 85)}
    />
  );
};

const VideoGraphic: FC<{ video: AppVideo }> = ({ video }) => {
  const sdVideos = video.video_files
    .filter((video) => video.quality === "sd")
    .sort((a, b) => (a.width || 1) - (b.width || 2));
  const thumb = sdVideos[0];
  const width = (thumb.width || 350) + random(10, 90);
  const height = (thumb.height || 200) - random(7, 45);
  const poster = new URL(video.image);
  // NOTE: We wrap width and height in string literal to convert to to string
  // because it's needed for searchParams.set
  poster.searchParams.set("w", `${width}`);
  poster.searchParams.set("h", `${height}`);

  return (
    <video
      autoPlay={true}
      muted
      loop
      playsInline
      width={width}
      height={height}
      poster={poster.toString()}
    >
      <source src={thumb.link} type={thumb.file_type} />
    </video>
  );
};

const ItemList: FC<{ items: CuratedItems }> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map((item) => {
        const { appId, itemType } = item;
        return (
          <Link
            className={styles.item}
            href={`/${appId}`}
            key={appId}
            aria-label={`View item ${appId}`}
          >
            {itemType === "photo" && <PhotoGraphic photo={item as AppPhoto} />}
            {itemType === "video" && <VideoGraphic video={item as AppVideo} />}
          </Link>
        );
      })}
    </div>
  );
};

export default memo(ItemList);
