import type { FC } from "react";
import type { Photo, Video } from "pexels";
import Link from "next/link";
import Image from "next/image";
import { getImgDimensions } from "@util/ui";
import styles from "./style.module.css";

const PhotoImg: FC<{ photo: Photo }> = ({ photo }) => {
  const { width, height } = getImgDimensions(photo.src.medium);
  return (
    <Image
      src={photo.src.large}
      alt={photo.alt || ""}
      width={width}
      height={height}
    />
  );
};

const VideoImg: FC<{ video: Video }> = ({ video }) => {
  const imgUrl = new URL(video.image);
  imgUrl.searchParams.set("h", "350");
  imgUrl.searchParams.delete("w");
  return <Image src={imgUrl.toString()} alt={""} width={350} height={350} />;
};

const ItemList: FC<{ items: Array<Photo | Video> }> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map((item) => {
        const isVideo = Object.hasOwn(item, "video_files");
        const isPhoto = Object.hasOwn(item, "src");

        return (
          <Link className={styles.item} href={`/${item.id}`} key={item.id}>
            {isPhoto && <PhotoImg photo={item as Photo} />}
            {isVideo && <VideoImg video={item as Video} />}
          </Link>
        );
      })}
    </div>
  );
};

export default ItemList;
