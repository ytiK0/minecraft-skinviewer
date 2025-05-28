import {Canvas} from "@react-three/fiber";
import Player from "./components/Player.tsx";
import {OrbitControls} from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas style={{height: "100vh"}} camera={{position: [0, 12, 24], near:1, far: 80}}>
        <axesHelper args={[100]} />
        <OrbitControls enablePan={true} />
        <ambientLight intensity={1.5} />
        <Player/>
      </Canvas>
    </>
  )
}

export default App
