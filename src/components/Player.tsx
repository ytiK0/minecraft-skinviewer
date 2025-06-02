import {Arms, Body, Head, Legs} from "./SkinPartComponents";

export default function Player({ debug }: { debug?: boolean }) {
  return (
    <group name={"playerModel"}>
      <Head/>
      <Body/>
      <Arms/>
      <Legs/>
      { debug && <axesHelper args={[100]}/> }
    </group>
  );
}
