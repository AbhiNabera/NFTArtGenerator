//this file creates preview collage of images from our collection.
"use strict";

const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const buildDir = `${basePath}/build`;

const { preview } = require(path.join(basePath, "/src/config.js"));

//read JSON data.
const rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
const metadataList = JSON.parse(rawdata);

const saveProjectPreviewImage = async (_data) => {
  //extract from preview configuration.
  const { thumbWidth, thumbPerRow, imageRatio, imageName } = preview;
  const thumbHeight = thumbWidth * imageRatio;
  //prepare canvas.
  const previewCanvasWidth = thumbWidth * thumbPerRow;
  const previewCanvasHeight =
    thumbHeight * Math.trunc(_data.length / thumbPerRow);
  console.log(
    `Preparing a ${previewCanvasWidth} x ${previewCanvasHeight} project preview with ${_data.length} thumbnails.`
  );

  //initiate the canvas.
  const previewPath = `${buildDir}/${imageName}`;
  const previewCanvas = createCanvas(previewCanvasWidth, previewCanvasHeight);
  const previewCtx = previewCanvas.getContext("2d");

  //iterate all NFTs and insert thumbnail into preview image.
  for (let index = 0; index < _data.length; index++) {
    const nft = _data[index];
    await loadImage(`${buildDir}/images/${nft.edition}.png`).then((image) => {
      previewCtx.drawImage(
        image,
        thumbWidth * (index % thumbPerRow),
        thumbHeight * Math.trunc(index / thumbPerRow),
        thumbWidth,
        thumbHeight
      );
    });
  }

  //write preview to file.
  fs.writeFileSync(previewPath, previewCanvas.toBuffer("image/png"));
  console.log(`Project preview image can be found at: ${previewPath}`);
};

saveProjectPreviewImage(metadataList);
