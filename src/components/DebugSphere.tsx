import {Sphere} from "@react-three/drei";

interface DebugSphereProps {
  sphereSize?: number,
  axesSize?: number
}

const DEFAULT_SPHERE_SIZE = 0.5;
const DEFAULT_AXES_SIZE = 5;

export default function DebugSphere({sphereSize, axesSize}: DebugSphereProps) {
  return (
    <group name={"debug-sphere"}>
      <axesHelper args={[axesSize || DEFAULT_AXES_SIZE]} />
      <Sphere args={[sphereSize || DEFAULT_SPHERE_SIZE]} />
    </group>
  );
}
