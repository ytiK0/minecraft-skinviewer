import {Sphere} from "@react-three/drei";
import {MeshBasicMaterial} from "three";

interface DebugSphereProps {
  sphereSize?: number,
  axesSize?: number
}

const DEFAULT_SPHERE_SIZE = 0.5;
const DEFAULT_AXES_SIZE = 5;

const sphereMaterial = new MeshBasicMaterial({
  color: "#2aeeff",
  wireframe: true,
  depthTest: false,
  depthWrite: false,
  transparent: true,
  opacity: 1.0
});

export default function DebugSphere({sphereSize, axesSize}: DebugSphereProps) {
  return (
    <group name={"debug-sphere"}>
      <axesHelper args={[axesSize || DEFAULT_AXES_SIZE]} />
      <Sphere args={[sphereSize || DEFAULT_SPHERE_SIZE]} renderOrder={999} material={sphereMaterial} />
    </group>
  );
}
