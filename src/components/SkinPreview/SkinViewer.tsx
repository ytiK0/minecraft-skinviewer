import {OrbitControls, Plane} from "@react-three/drei";
import Player from "../Player.tsx";
import {Canvas} from "@react-three/fiber";
import {useMemo, useState} from "react";
import {defaultLayersConfig, LayersContext} from "../../context/LayersContext.tsx";
import {clsx} from "clsx";

import style from "./skinViewer.module.css";
import {MeshLambertMaterial} from "three";

interface SkinViewerProps {
  className?: string
}

export function SkinViewer({ className }: SkinViewerProps) {
  const [layers, setLayers] = useState(defaultLayersConfig);

  const floorMatherial = useMemo(() => new MeshLambertMaterial({
    color: "#379112"
  }), [])

  return (
    <div className={clsx(style.skinViewerWrapper, className)}>
      <Canvas style={{}} camera={{position: [0, 16, 40], near: 1, far: 80}}>
        <ambientLight intensity={1.5} />
        <OrbitControls target={[0, 16, 0]} enablePan={false}
                       minDistance={10} maxDistance={50}
                       maxPolarAngle={Math.PI / 1.6} makeDefault
        />

        <LayersContext.Provider value={layers}>
          <Player pathToSkin={'/skin.png'}/>
        </LayersContext.Provider>

        <Plane args={[100, 100]} position={[0,-0.001,0]} rotation={[-Math.PI / 2, 0, 0]} material={floorMatherial} />
      </Canvas>
    </div>
  )
}