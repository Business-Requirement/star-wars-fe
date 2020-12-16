// this files will export all other untils

export const tokenizeString = (view: string, delim: string): string[] => {
  if (!view) return [];

  let result: string[] = view.replace(/\s/g, "").split(delim);

  return result;
};

export const detectMimeType = (ext: string | undefined) => {
  const MIME_TYPE: { [id: string]: string } = {
    "3gpp": "video",
    "3gp": "video",
    ts: "video",
    mp4: "video",
    mpeg: "video",
    mpg: "video",
    mov: "video",
    webm: "video",
    flv: "video",
    m4v: "video",
    mng: "video",
    asx: "video",
    asf: "video",
    wmv: "video",
    avi: "video",
    gif: "image",
    jpeg: "image",
    jpg: "image",
    png: "image",
    svg: "image",
    svgz: "image",
    tif: "image",
    tiff: "image",
    wbmp: "image",
    webp: "image",
    ico: "image",
    jng: "image",
    bmp: "image",
  };
  return ext ? MIME_TYPE[ext] : ext;
};
