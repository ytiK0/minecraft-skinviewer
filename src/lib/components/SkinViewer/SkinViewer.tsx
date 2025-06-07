import {getLayersDefaultConfig, LayersContext, type LayersContextValue} from "../../context/LayersContext.tsx";
import {
  CanvasTexture,
  type ColorRepresentation,
  MeshLambertMaterial,
  NearestFilter,
  SRGBColorSpace
} from "three";
import {decodeEarsSkin, defaultEarsContextValue} from "../../utils/decodeEarsSkin.ts";
import { SkinMaterialContext } from "../../context/SkinContext.tsx";
import { EarsContext } from "../../context/EarsContext.tsx";
import {OrbitControls, Plane} from "@react-three/drei";
import {useEffect, useMemo, useState} from "react";
import {Canvas, type GLProps} from "@react-three/fiber";
import Player from "../Player.tsx";
import {clsx} from "clsx";

import "./skinViewer.css";

interface SkinViewerProps  {
  skinSrc: string
  isSlim?: boolean
  layers?: LayersContextValue
  className?: string
  florColor?: ColorRepresentation
  backgroundColor?: ColorRepresentation
}

const DEFAULT_FLOOR_COLOR = "#5fb35f";
const DEFAULT_BACKGROUND_COLOR = "lightblue";
const RENDERER_PROPS: GLProps = {
  powerPreference:"low-power",
  antialias: false,
  failIfMajorPerformanceCaveat: false
};


export function SkinViewer({ className, skinSrc, florColor, isSlim, backgroundColor, layers=getLayersDefaultConfig() }: SkinViewerProps)  {
  const [ears, setEars] = useState(defaultEarsContextValue);

  const skinCanvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.height = 64;
    canvas.width = 64;

    return canvas;
  }, []);

  const skin = useMemo(() => {
    const skinTexture = new CanvasTexture(skinCanvas);
    skinTexture.magFilter = NearestFilter;
    skinTexture.minFilter = NearestFilter;
    skinTexture.colorSpace = SRGBColorSpace;

    return skinTexture;
  }, [skinCanvas]);

  const skinMaterial = useMemo(() => new MeshLambertMaterial({
    flatShading: true,
    fog: false,
    color: 0xFFFFFF,
    map: skin,
    transparent: true,
    alphaTest: 0.1,
  }), [skin]);


  useEffect(() => {
    const skinImg = new Image();
    const ctx = skinCanvas.getContext("2d", {willReadFrequently: true})!;
    ctx.clearRect(0, 0, 64, 64);

    skinImg.onload = () => {
      if (skinImg.width !== 64 || skinImg.height !== 64) {
        console.error("Loaded image should be 64x64 png image, this component does not support legacy skins");
        return;
      }

      ctx.drawImage(skinImg, 0, 0);
      skin.needsUpdate = true;

      try {
        const earsData = new DataView(ctx.getImageData(0, 32, 4, 4).data.buffer);
        setEars(decodeEarsSkin(earsData));
      } catch (e) {
        console.warn("If skin has Ears mode elements, they will not displayed on the 3D model because it is impossible to get image data, use sources which allow CORS requests (by default, Image.crossOrigin = 'anonymous' is used)");
      }
    }

    skinImg.onerror = () => {
      console.warn("Failed to load skin. Don't forget to use skin sources which allow CORS request (by default, Image.crossOrigin = 'anonymous' is used)");
    }

    skinImg.crossOrigin = "anonymous"
    skinImg.src = skinSrc;
  }, [skinSrc]);

  const floorMaterial = useMemo(() => new MeshLambertMaterial({
    color: florColor || DEFAULT_FLOOR_COLOR
  }), [florColor]);

  return (
    <div className={clsx("skin-viewer-wrapper", className)}>
      <Canvas camera={{position: [0, 26, 40], near: 1, far: 150}} gl={RENDERER_PROPS}>
        <ambientLight intensity={1.2} />
        <color attach={"background"} args={[backgroundColor || DEFAULT_BACKGROUND_COLOR]}/>
        <OrbitControls target={[0, 16, 0]} enablePan={false}
                       minDistance={10} maxDistance={50}
                       maxPolarAngle={Math.PI / 1.65} makeDefault
        />

        <SkinMaterialContext.Provider value={skinMaterial}>
          <LayersContext.Provider value={layers}>
            <EarsContext.Provider value={ears}>
              <Player isSlim={isSlim} />
            </EarsContext.Provider>
          </LayersContext.Provider>
        </SkinMaterialContext.Provider>

        <Plane args={[100, 100]} position={[0,-0.001,0]} rotation={[-Math.PI / 2, 0, 0]} material={floorMaterial} />
      </Canvas>
    </div>
  );
}