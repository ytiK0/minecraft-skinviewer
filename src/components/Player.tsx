import {CanvasTexture, MeshStandardMaterial, NearestFilter, SRGBColorSpace} from "three";
import {useEffect, useMemo, useState} from "react";
import {Arms, Body, Head, Legs} from "./SkinPartComponents";
import {EarsContext} from "../context/EarsContext.tsx";
import {decodeEarsSkin, defaultEarsContextValue} from "../utils/decodeEarsSkin.ts";
import type {EarsContextValue} from "../types";
import {SkinMaterialContext} from "../context/SkinContext.tsx";
import {defaultLayersConfig, LayersContext} from "../context/LayersContext.tsx";

export default function Player({pathToSkin}: {pathToSkin: string}) {
  // TODO: add slim support
  const [ears, setEars] = useState<EarsContextValue>(defaultEarsContextValue);

  const skinCanvas = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.height = 64;
    canvas.width = 64;

    return canvas;
  }, [])

  const skin = useMemo(() => {
    const skinTexture = new CanvasTexture(skinCanvas);
    skinTexture.magFilter = NearestFilter;
    skinTexture.minFilter = NearestFilter;
    skinTexture.colorSpace = SRGBColorSpace;

    return skinTexture;
  }, [skinCanvas]);

  const skinMaterial = useMemo(() => new MeshStandardMaterial({
    map: skin,
    transparent: true,
  }), [skin]);


  useEffect(() => {
    const skinImg = new Image();
    const ctx = skinCanvas.getContext("2d")!;

    skinImg.onload = () => {
      skinCanvas.width = skinImg.width;
      skinCanvas.height = skinImg.height;
      ctx.drawImage(skinImg, 0, 0);
      skin.needsUpdate = true;

      const earsData = new DataView(ctx.getImageData(0, 32, 4, 4).data.buffer);
      setEars(decodeEarsSkin(earsData));
    }

    skinImg.src = pathToSkin;
  }, [skin, pathToSkin]);

  return (
    <>
      <LayersContext.Provider value={defaultLayersConfig}>
        <SkinMaterialContext.Provider value={skinMaterial}>
          <EarsContext.Provider value={ears}>
            <Head />
            <Body />
            <Arms />
            <Legs />
          </EarsContext.Provider>
        </SkinMaterialContext.Provider>
      </LayersContext.Provider>
    </>
  );
}
