import { CopyButton } from "@/app/components/copyButton";
import { FileData } from "@/app/lib/appUtils";
import { downloadFile } from "@/app/lib/downloadUtils";

export function FilePreview({
  file,
  updateContent,
}: {
  file: FileData;
  updateContent: (content: string) => void;
}) {
  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex">
        <i>{file.filename}</i>
        <ExportFileButton file={file} />
      </div>

      <div className="collapse-content">
        <div className="mockup-code bg-base-100 text-base-content pr-4 pb-2">
          <pre className="relative">
            <code>
              <textarea
                className="textarea textarea-bordered w-full h-96"
                name="react-comp"
                value={file.content}
                onChange={(e) => updateContent(e.target.value)}
              />
              <CopyButton
                className="px-1 btn btn-sm btn-ghost opacity-35 hover:opacity-100"
                positionClasses="absolute top-2 right-6"
                toClipboard={file.content}
              />
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function ExportFileButton({ file }: { file: FileData }) {
  return (
    <div className="tooltip tooltip-left ml-auto" data-tip="Export">
      <button
        className="btn btn-ghost btn-sm z-[1] relative"
        onClick={async () => await downloadFile(file)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
