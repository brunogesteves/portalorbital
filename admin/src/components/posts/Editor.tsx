import { api } from "@/Utils/api";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS

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
    files: any[],
    info: object,
    uploadHandler: Function,
  ) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);

    api
      .post("/posts/upload-image", formData)
      .then((res) => {
        const response = {
          result: [
            {
              url: `${process.env.NEXT_PUBLIC_URL_SERVER}${res.data.url}`,
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
  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-gray-200">
        <SunEditor
          setContents={content}
          onChange={setContent}
          onImageUploadBefore={handleImageUploadBefore}
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
              ["table", "link"],
              ["fullScreen", "showBlocks"],
              ["preview"],
            ],
            height: "600px",
          }}
        />
      </div>
    </div>
  );
};
