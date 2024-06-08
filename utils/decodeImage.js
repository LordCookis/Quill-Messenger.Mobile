const bufferFromDataUrl = (dataUrl) => {
  // decode dataUrl to blob
  const regex = /^data:image\/(\w+);base64,([0-9A-Za-z+/]+)/i;
  if (!dataUrl) return null
  const match = dataUrl?.match(regex);
  if (!match) return null;
  const [_, type, dataString] = match;
  const arrayBuffer = Buffer.from(dataString, 'base64');
  const array = new Uint8Array(arrayBuffer);
  // decode array to blob
  const blob = new Blob([new DataView(array.buffer, array.byteOffset, array.byteLength)], {type});
  return blob;
}

export const decodeImage = (code) => {
  const decodedBlob = bufferFromDataUrl(code);
  if(!decodedBlob) return null
  const doneurl = URL.createObjectURL(decodedBlob);
  return doneurl
  }