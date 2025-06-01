import {Canvas} from "@react-three/fiber";
import Player from "./components/Player.tsx";
import {OrbitControls} from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas style={{height: "100vh"}} camera={{position: [0, 16, 40], near: 1, far: 80}}>
        <ambientLight intensity={1.5}/>
        <OrbitControls target={[0, 16, 0]} enablePan={false} minDistance={10} maxDistance={50}/>
        <Player pathToSkin={'/skin.png'}/>
      </Canvas>
    </>
  )
}

export default App
