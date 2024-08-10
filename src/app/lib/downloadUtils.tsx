import { FileData } from "@/app/lib/fileUtils";
import JSZip from "jszip";

export async function downloadFile(file: FileData) {
  const f = await showSaveFilePicker({
    types: [
      {
        description: "TypeScript Files",
        accept: {
          "text/typescript": [".tsx"],
        },
      },
    ],
    suggestedName: `${convertToFilename(file.prettyFilename)}`,
  });

  const writable = await f.createWritable();
  await writable.write(file.content);
  await writable.close();
}

export async function downloadAllFiles(files: FileData[]) {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(convertToFilename(file.prettyFilename), file.content);
  });

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "svg2react.zip";
  a.click();
  URL.revokeObjectURL(url);
}

function convertToFilename(filename: string) {
  return filename.charAt(0).toLowerCase() + filename.slice(1) + ".tsx";
}
