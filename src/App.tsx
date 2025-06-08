import {SkinViewer} from "./lib/components/SkinViewer/SkinViewer.tsx";
import {type ChangeEventHandler, type FormEventHandler, Fragment, useCallback, useState} from "react";
import {getLayersDefaultConfig, type LayersContextValue} from "./lib/context/LayersContext";

function App() {
  const [pathToSkin, setPathToSkin] = useState("https://mc-heads.net/skin/c0rqi");
  const [isSlim, setIsSlim] = useState(true);
  const [layers, setLayers] = useState(getLayersDefaultConfig());

  const handleChange: ChangeEventHandler = useCallback((ev) => {
    const target = ev.target as HTMLInputElement;
    setPathToSkin(target.value);
  }, []);

  const handleIsSlimChange: ChangeEventHandler = useCallback((ev) => {
    const target = ev.target as HTMLInputElement;
    setIsSlim(target.checked);
  }, []);

  const handleLayerChange: FormEventHandler<HTMLFormElement> = useCallback((event) => {
    const target = event.target as HTMLInputElement;

    if (target.type !== "checkbox") {
      return;
    }

    const partName = target.dataset["part"] as keyof LayersContextValue;

    if (!partName) {
      console.warn("Checkbox dose not have part name data attribute");
      return;
    }

    if (!(partName in layers)) {
      console.warn("Checkbox does not have valid part name", partName);
      return;
    }

    const layerName = target.dataset["layer"];

    if (layerName === "base") {
      setLayers((prev) => ({...prev, [partName]: { ...prev[partName], isBaseVisible: target.checked }}))
    }
    else if (layerName === "overlay") {
      setLayers((prev) => ({...prev, [partName]: { ...prev[partName], isOverlayVisible: target.checked }}))
    }
    else {
      console.warn("Checkbox does not provide layer data attribute")
    }
  }, []);

  return (
    <>
      <SkinViewer skinSrc={pathToSkin} isSlim={isSlim} layers={layers} />
      <br />
      <input style={{width: 200}} onChange={handleChange} value={pathToSkin}/>
      <br />
      <label htmlFor={"is-slim"}>
        <input id={"is-slim"} onChange={handleIsSlimChange} type={"checkbox"} defaultChecked />
        is slim
      </label>
      <form onChange={handleLayerChange} style={{display: "grid", gridTemplateColumns: "repeat(3, 80px)"}}>
        {
          (Object.keys(layers) as (keyof LayersContextValue)[]).map((skinPartName) => (
            <Fragment key={skinPartName}>
              <span>{skinPartName[0].toLowerCase() + skinPartName.slice(1)}</span>
              <label htmlFor={`${skinPartName}-base`}>
                <input id={`${skinPartName}-base`} type={"checkbox"} defaultChecked data-part={skinPartName} data-layer={"base"}/>
                Base
              </label>
              <label htmlFor={`${skinPartName}-overlay`}>
                <input id={`${skinPartName}-overlay`} type={"checkbox"} defaultChecked data-part={skinPartName} data-layer={"overlay"}/>
                Overlay
              </label>
            </Fragment>
          ))
        }
      </form>
    </>
  )
}

export default App
