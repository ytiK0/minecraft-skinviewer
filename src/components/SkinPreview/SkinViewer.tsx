import {defaultLayersConfig, LayersContext, type LayersContextValue} from "../../context/LayersContext.tsx";
import {CanvasTexture, MeshLambertMaterial, NearestFilter, SRGBColorSpace} from "three";
import {decodeEarsSkin, defaultEarsContextValue} from "../../utils/decodeEarsSkin.ts";
import { SkinMaterialContext } from "../../context/SkinContext.tsx";
import { EarsContext } from "../../context/EarsContext.tsx";
import {OrbitControls, Plane} from "@react-three/drei";
import {useEffect, useMemo, useState} from "react";
import {Canvas} from "@react-three/fiber";
import Player from "../Player.tsx";
import {clsx} from "clsx";

import style from "./skinViewer.module.css";

interface SkinViewerProps  {
  skinSrc: string
  layers?: LayersContextValue
  className?: string
}

export function SkinViewer({ className, skinSrc, layers=defaultLayersConfig }: SkinViewerProps)  {
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
      map: skin,
      transparent: true,
  }), [skin]);


  useEffect(() => {
    const skinImg = new Image();
    const ctx = skinCanvas.getContext("2d")!;
    ctx.clearRect(0, 0, 64, 64);

    skinImg.onload = () => {
      if (skinImg.width !== 64 || skinImg.height !== 64) {
        throw new Error("Loaded image should be 64x64 png image")
      }

      ctx.drawImage(skinImg, 0, 0);
      skin.needsUpdate = true;

      const earsData = new DataView(ctx.getImageData(0, 32, 4, 4).data.buffer);
      setEars(decodeEarsSkin(earsData));
    }

    skinImg.src = skinSrc;
  }, [skinSrc]);

  const floorMaterial = useMemo(() => new MeshLambertMaterial({
    color: "#379112"
  }), []);

  return (
    <div className={clsx(style.skinViewerWrapper, className)}>
      <Canvas camera={{position: [0, 16, 40], near: 1, far: 80}}>
        <ambientLight intensity={1.5} />
        <OrbitControls target={[0, 16, 0]} enablePan={false}
                       minDistance={10} maxDistance={50}
                       maxPolarAngle={Math.PI / 1.65} makeDefault
        />

        <SkinMaterialContext.Provider value={skinMaterial}>
          <LayersContext.Provider value={layers}>
            <EarsContext.Provider value={ears}>
              <Player />
            </EarsContext.Provider>
          </LayersContext.Provider>
        </SkinMaterialContext.Provider>

        <Plane args={[100, 100]} position={[0,-0.001,0]} rotation={[-Math.PI / 2, 0, 0]} material={floorMaterial} />
      </Canvas>
    </div>
  );
}