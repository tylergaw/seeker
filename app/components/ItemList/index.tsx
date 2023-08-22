import type { FC } from "react";
import type { Photo, Video } from "pexels";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.css";

interface ImgDimensions {
  height?: number;
  width?: number;
}

const getImgDimensions = (url: string): ImgDimensions => {
  const params = new URL(url).searchParams;

  // Note: The defaults here are magic numbers.
  const dimensions = {
    width: parseInt(params.get("w") as string, 10) || 350,
    height: parseInt(params.get("h") as string, 10) || 350,
  };

  return dimensions;
};

interface PhotoImgProps {
  photo: Photo;
}

const PhotoImg: FC<PhotoImgProps> = ({ photo }) => {
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

interface VideoImgProps {
  video: Video;
}

const VideoImg: FC<VideoImgProps> = ({ video }) => {
  const imgUrl = new URL(video.image);
  imgUrl.searchParams.set("h", "350");
  imgUrl.searchParams.delete("w");
  return <Image src={imgUrl.toString()} alt={""} width={350} height={350} />;
};

interface ItemListProps {
  items: Array<Photo | Video>;
}

const ItemList: FC<ItemListProps> = ({ items }) => {
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
