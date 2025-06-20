import {Arms, Body, Head, Legs} from "./SkinPartComponents";

export default function Player({ debug, isSlim }: { isSlim?: boolean, debug?: boolean }) {
  return (
    <group name={"playerModel"}>
      <Head debug={debug}/>
      <Body debug={debug}/>
      <Arms debug={debug} isSlim={isSlim} />
      <Legs debug={debug}/>
      { debug && <axesHelper args={[100]}/> }
    </group>
  );
}
