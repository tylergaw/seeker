interface ImgDimensions {
  height?: number;
  width?: number;
}

// Note: The defaults here are magic numbers.
export const getImgDimensions = (
  url: string,
  widthDefault: number = 350,
  heightDefault: number = 350,
): ImgDimensions => {
  const params = new URL(url).searchParams;

  const dimensions = {
    width: parseInt(params.get("w") as string, 10) || widthDefault,
    height: parseInt(params.get("h") as string, 10) || heightDefault,
  };

  return dimensions;
};
