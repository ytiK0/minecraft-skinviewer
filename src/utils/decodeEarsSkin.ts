import {MAGIC_PIXELS} from "../components/magicPixels.ts";
import type {AnchorMode, EarMode, EarsContextValue, MagicPixelsColor, ProtrusionMode, TailMode} from "../types";

const TAIL_MODE_BY_COLOR: Record<Exclude<MagicPixelsColor, "cyan">, TailMode> = {
  red: "none",
  blue: "down",
  green: "back",
  purple: "up",
  orange: "vertical",
  pink: "cross",
  purple2: "oCross",
  white: "star",
  gray: "oStar"
}

const EARS_MODE_BY_PIXEL: Record<Exclude<MagicPixelsColor, "purple">, EarMode> = {
  red: "none",
  blue: "above",
  green: "sides",
  purple2: "out",
  cyan: "around",
  orange: "floppy",
  pink: "cross",
  white: "tall",
  gray: "tallCross"
}

const ANCHOR_MODE_BY_PIXEL: Record<Extract<MagicPixelsColor, "blue" | "green" | "red">, AnchorMode>= {
  blue: "center",
  green: "front",
  red: "back",
}

const PROTRUSION_MODE_BY_COLOR: Record<Extract<MagicPixelsColor, "red" | "green" | "purple" | "cyan">, ProtrusionMode> = {
  red: "none",
  green: "claws",
  purple: "horn",
  cyan: "both",
}

function decodeDegrees(val: number) {
  if (val === 0) return 0;
  let deg = val-128;
  if (deg < 0) deg -= 1;
  if (deg >= 0) deg += 1;
  return (deg/128)*90 % 180;
}

function getModeByUint<T extends object>(mapObj: T, uint: number) {
  const pixel = MAGIC_PIXELS[uint] as keyof T;
  return mapObj[pixel]
}

function getSnoutConfig(snoutEtcData: number, snoutData: number) {
  let offset = ((snoutEtcData >> 16) & 0xFF);
  let width = ((snoutData >> 24) & 0xFF);
  let height = ((snoutData >> 16) & 0xFF);
  let length = ((snoutData >> 8) & 0xFF);

  if (offset > 8 - height) offset = 8 - height;
  if (width > 7) width = 7;
  if (height > 4) height = 4;
  if (length > 6) length = 6;

  if (width === 0 && height === 0 && length === 0) {
    return { mode: "none" } as const;
  }

  return {mode: "enable", offset, width, height, length} as const;
}

function getTailData(tailBendData: number) {
  debugger
  let tailBend0 = decodeDegrees(255 - (tailBendData & 0x000000FF));
  let tailBend1 = decodeDegrees((tailBendData & 0xFF000000) >> 24);
  let tailBend2 = decodeDegrees((tailBendData & 0x00FF0000) >> 16);
  let tailBend3 = decodeDegrees((tailBendData & 0x0000FF00) >> 8);

  let tailSegments = 1;
  if (tailBend1 != 0) {
    tailSegments++;
    if (tailBend2 != 0) {
      tailSegments++;
      if (tailBend3 != 0) {
        tailSegments++;
      }
    }
  }
  return { tailBends: [tailBend0, tailBend1, tailBend2, tailBend3], tailSegments};
}

export const defaultEarsContextValue= (["ear", "chest", "snout", "tail", "protrusions"] as const)
  .reduce((defValue, partName) => {
    defValue[partName] = {
      mode: "none"
    }
    return defValue
}, {} as EarsContextValue);

export function decodeEarsSkin(earsData: DataView): EarsContextValue {
  const earsContextValue: EarsContextValue = structuredClone(defaultEarsContextValue);

  if (MAGIC_PIXELS[earsData.getUint32(0)] !== "blue") {
    return earsContextValue;
  }

  const earsMode = getModeByUint(EARS_MODE_BY_PIXEL, earsData.getUint32(4));
  if (earsMode !== "none") {
    const earAnchorMode = getModeByUint(ANCHOR_MODE_BY_PIXEL, earsData.getUint32(2 * 4));
    earsContextValue.ear = {
      mode: earsMode,
      anchor: earAnchorMode
    }
  }

  const protrusionMode = getModeByUint(PROTRUSION_MODE_BY_COLOR, earsData.getUint32(3 * 4));
  if (protrusionMode !== "none") {
    earsContextValue.protrusions = {
      mode: protrusionMode
    }
  }

  const snoutData = earsData.getUint32(6 * 4);
  if (MAGIC_PIXELS[snoutData] !== "blue") {
    const snoutEtcData = earsData.getUint32(7 * 4);
    earsContextValue.snout = getSnoutConfig(snoutEtcData, snoutData);

    if (MAGIC_PIXELS[snoutEtcData] !== "blue") {
      let chestSize = ((snoutEtcData >> 24) & 0xFF) / 128;
      if (chestSize > 1) chestSize = 1;

      if (chestSize !== 0) {
        earsContextValue.chest = {
          mode: "enable",
          size: chestSize
        }
      }
    }
  }

  const tailMode = getModeByUint(TAIL_MODE_BY_COLOR, earsData.getUint32(4 * 4));
  if (tailMode !== "none") {
    const tailBendData = earsData.getUint32(5 * 4);
    let {tailBends, tailSegments} = getTailData(tailBendData);

    earsContextValue.tail = {
      mode: tailMode,
      segmentsCount: tailSegments,
      tailBends
    }
  }

  console.log(earsContextValue);

  return earsContextValue;
}