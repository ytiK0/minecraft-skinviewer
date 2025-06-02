import {SkinViewer} from "./components/SkinPreview/SkinViewer.tsx";
import {type ChangeEventHandler, useCallback, useState} from "react";

function App() {
  const [pathToSkin, setPathToSkin] = useState("/skin.png");

  const handleChange: ChangeEventHandler = useCallback((ev) => {
    const target = ev.target as HTMLInputElement;
    setPathToSkin(target.value);
  }, [])

  return (
    <>
      <SkinViewer pathToSkin={pathToSkin} />
      <input onChange={handleChange} value={pathToSkin}/>
    </>
  )
}

export default App
