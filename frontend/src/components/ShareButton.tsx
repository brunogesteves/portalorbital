import { FaFacebookF, FaWhatsapp } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export const ShareButton = ({ url }: { url: string }) => {
    function shareOnX() {
        const shareUrl = encodeURIComponent(`https://orbitaltv.net/${url}`);

        window.open(
            `https://x.com/intent/post?url=${shareUrl}`,
            "_blank",
            "noopener,noreferrer"
        );
    }

    const shareOnFacebook = () => {
        const url = encodeURIComponent(window.location.href); // ou seu link

        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=https://orbitaltv.net/${url}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    const shareOnWhatsApp = () => {
        const texto = encodeURIComponent(
            `Confira este conteúdo! https://orbitaltv.net/${url}`
        );

        window.open(
            `https://wa.me/?text=${texto}`,
            "_blank",
            "noopener,noreferrer"
        );
    };


    return (
        <><button
            aria-label="WhatsApp"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#25D366] text-white cursor-pointer"
            onClick={shareOnWhatsApp}
        >
            <FaWhatsapp className="text-sm" />
        </button><button
            aria-label="Facebook"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1877F2] text-white cursor-pointer"
            onClick={shareOnFacebook}
        >
                <FaFacebookF className="text-sm" />
            </button><button
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white cursor-pointer"
            >
                <FaXTwitter className="text-sm" onClick={shareOnX} />
            </button></>
    )
}