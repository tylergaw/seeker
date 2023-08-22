import type { FC } from "react";
import type { Photo, Video } from "pexels";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { random } from "lodash";

import { getImgDimensionsFromUrl } from "@util/ui";
import styles from "./style.module.css";

const PhotoGraphic: FC<{ photo: Photo }> = ({ photo }) => {
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

const VideoGraphic: FC<{ video: Video }> = ({ video }) => {
  const sdVideos = video.video_files
    .filter((video) => video.quality === "sd")
    .sort((a, b) => (a.width || 1) - (b.width || 2));
  const thumb = sdVideos[0];
  const width = (thumb.width || 350) + random(10, 90);
  const height = (thumb.height || 200) - random(7, 45);
  const poster = new URL(video.image);
  // NOTE: We wrap width and height in string literal to convert to to string
  // because it's needed fro searchParams.set
  poster.searchParams.set("w", `${width}`);
  poster.searchParams.set("h", `${height}`);

  return (
    <video
      autoPlay
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

const ItemList: FC<{ items: Array<Photo | Video> }> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map((item) => {
        const isVideo = Object.hasOwn(item, "video_files");
        const isPhoto = Object.hasOwn(item, "src");

        return (
          <Link
            className={styles.item}
            href={`/${item.id}`}
            key={item.id}
            aria-label={`View item ${item.id}`}
          >
            {isPhoto && <PhotoGraphic photo={item as Photo} />}
            {isVideo && <VideoGraphic video={item as Video} />}
          </Link>
        );
      })}
    </div>
  );
};

export default memo(ItemList);
