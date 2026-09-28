import { api } from "@/Utils/api";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS
import type {
  UploadBeforeHandler,
  UploadBeforeReturn,
} from "suneditor-react/dist/types/upload";

// Import SunEditor dynamically to avoid SSR issues
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
  // handleImageUploadBefore: (files: any[], info: object, uploadHandler: Function) => void,
}

export const Editor = ({ content, setContent }: EditorProps) => {
  const handleImageUploadBefore = (
    files: File[],
    info: object,
    uploadHandler: UploadBeforeHandler,
  ): UploadBeforeReturn => {
    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);

    api
      .post("/posts/upload-image", formData)
      .then((res) => {
        const response = {
          result: [
            {
              url: res.data.url,
              name: file.name,
              size: file.size,
            },
          ],
        };
        uploadHandler(response);
      })
      .catch((err) => {
        console.error("Erro ao fazer upload da imagem no editor:", err);
        uploadHandler(err.message);
      });

    return undefined;
  };

  const handleAudioUploadBefore = (
    files: File[],
    info: object,
    uploadHandler: UploadBeforeHandler,
  ): UploadBeforeReturn => {
    const file = files[0];
    const formData = new FormData();
    formData.append("audio", file);

    api
      .post("/posts/upload-audio", formData)
      .then((res) => {
        const response = {
          result: [
            {
              url: res.data.url,
              name: file.name,
              size: file.size,
            },
          ],
        };
        uploadHandler(response);
      })
      .catch((err) => {
        console.error("Erro ao fazer upload do áudio no editor:", err);
        uploadHandler(err.message);
      });

    return undefined;
  };

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-gray-200">
        <SunEditor
          setContents={content}
          onChange={setContent}
          onImageUploadBefore={handleImageUploadBefore}
          onAudioUploadBefore={handleAudioUploadBefore}
          height="300px"
          setOptions={{
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["paragraphStyle", "blockquote"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["fontColor", "hiliteColor", "textStyle"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],
              ["table", "link", "image", "audio"],
              ["fullScreen", "showBlocks"],
              ["preview"],
            ],
            height: "600px",
            audioFileInput: true,
            audioUrlInput: true,
            audioAccept: "audio/*",
          }}
        />
      </div>
    </div>
  );
};
