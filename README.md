# mc-skin-viewer
Simple component which let you render any minecraft skin in your React web applications.
This component also parse [Ears mod](https://modrinth.com/mod/ears) skins and show additional 
skin elements.

## Installation
```bash
npm install mc-skin-viewer
```

## Usage
Just put a link like `<img />` tag and 3D model will appear in your app
```tsx
function App() {
  const [pathToSkin, setPathToSkin] = useState("/skin.png");
  
  return (
    <>
      <SkinViewer skinSrc={pathToSkin} />
    </>
  );
}
```

### Layer managing
You can choose which part render, on or off overlay rendering. Just put a config into component

### Build your own model, set any pose
You have access to completed skin part mesh components, and you can place it anywhere in your
three js scene