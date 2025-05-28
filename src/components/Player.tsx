import {useTexture} from "@react-three/drei";
import {MeshStandardMaterial, NearestFilter, SRGBColorSpace} from "three";
import {useMemo} from "react";
import {Arms, Body, Head, Legs} from "./SkinPartComponents";

export default function Player() {
  // TODO: add slim support

  const skin = useTexture("/skin.png", (skin) => {
    skin.magFilter = NearestFilter;
    skin.colorSpace = SRGBColorSpace
  });

  const skinMaterial = useMemo(() => new MeshStandardMaterial({
    map: skin,
    transparent: true,
  }), [skin]);

  return (
    <>
      <Head skinMaterial={skinMaterial} />
      <Body skinMaterial={skinMaterial} />
      <Arms skinMaterial={skinMaterial}  />
      <Legs skinMaterial={skinMaterial} />
    </>
  );
}
