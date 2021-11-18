"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { blendMode } = require(path.join(basePath, "constants/blendMode.js"));

const network = "eth"; //specify the blockchain of our project.

const namePrefix = "Your Collection"; //update name of our collection.
const description = "Description of our project."; //update description based on the project.
const baseUri = "ipfs://NewUriToReplace"; //server URI of the server.

//order of layers to create images and the total number of images needed.
//allows to create different layer configurations based on the number of images needed for each configuration.
//just create a copy of the inside object and edit.
//also allows to specify the blending mode and opacity for our image from the different styles in available in blendMode.js.
//example: {name: "Name", blend: blendMode.blendType, opacity: someNumberBetween0And1}.
const layerConfigurations = [
  {
    growEditionSizeTo: 5, //the total number of images would increase by this size. 
    layersOrder: [
      { name: "2-suit" },
      { name: "3-shoulder" },
      { name: "4-pin" },
      { name: "5-skin" },
      { name: "6-facial-hair" },
      { name: "7-mask" },
      { name: "8-hair" },
      { name: "9-accessories" },
      { name: "10-headwear" },
    ],
  },
];

const shuffleLayerConfigurations = false; //shuffle layer configurations order.

const debugLogs = false; //print all details while generating images.

//image pixel size.
const format = {
  width: 512,
  height: 512,
};

//creates GIF images.
const gif = {
  export: true,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 1 / 128,
};

//add random background color to the image. 
const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

//features of our preview collage.
const preview = {
  thumbPerRow: 5,
  thumbWidth: 200,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

//some extra metadata fields if we want to add.
const extraMetadata = {}; 

const uniqueDNATolerance = 100; //if two many IDs (DNAs) match, fail the program.

const rarityDelimiter = "#"; //specify the delimiter used for the rarities in the file name.

//export variables for the main.js file.
module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDNATolerance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  gif,
};
