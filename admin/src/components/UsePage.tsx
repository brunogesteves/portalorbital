import { useEffect, useState } from "react";
import { api } from "@/Utils/api";
import { useRouter } from "next/navigation";
import { PostProps, CategoryProps, UserProps } from "@/Utils/types";
import axios from "axios";

export const usePage = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedAuthor, setSelectedAuthor] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");
    const [showModalMessage, setShowModalMessage] = useState<boolean>(false);
    const [modalWarning, setModalWarning] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, catsRes, userRes] = await Promise.all([
                    api.get("/posts"),
                    api.get("/categories"),
                    api.get("/auth/me"),
                ]);
                setPosts(postsRes.data);
                setCategories(catsRes.data);
                setCurrentUser(userRes.data.user);
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    router.push("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const handleDelete = async () => {
        if (postToDelete === null) return;
        try {
            await api.delete(`/posts/${postToDelete}`);
            setPosts(posts.filter((p) => p.id !== postToDelete));
            setShowModal(false);
        } catch {
            setShowModalMessage(true);
            setModalWarning("Erro ao excluir post");
        }
    };

    const handleToggleStatus = async (id: number, currentStatus: boolean) => {
        if (currentUser?.role !== "ADM") return;
        try {
            await api.patch(`/posts/${id}/status`, { status: !currentStatus });
            setPosts(
                posts.map((p) => (p.id === id ? { ...p, status: !currentStatus } : p)),
            );
        } catch {
            setShowModalMessage(true);
            setModalWarning("Erro ao atualizar status");
        }
    };

    const handleToggleSlide = async (id: number, currentSlide: boolean) => {
        if (currentUser?.role !== "ADM") return;
        try {
            await api.patch(`/posts/${id}/slide`, { slide: !currentSlide });
            setPosts(
                posts.map((p) => (p.id === id ? { ...p, slide: !currentSlide } : p)),
            );
        } catch {
            setShowModalMessage(true);
            setModalWarning("Erro ao atualizar slide");
        }
    };

    const handleToggleHighlight = async (
        id: number,
        currentHighlight: boolean,
    ) => {
        if (currentUser?.role !== "ADM") return;
        try {
            await api.patch(`/posts/${id}/highlight`, {
                highlight: !currentHighlight,
            });
            setPosts(
                posts.map((p) =>
                    p.id === id ? { ...p, highlight: !currentHighlight } : p,
                ),
            );
        } catch {
            setShowModalMessage(true);
            setModalWarning("Erro ao atualizar destaque");
        }
    };

    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "" || post.categoryId === Number(selectedCategory);
        const matchesAuthor =
            selectedAuthor === "" || post.authorId === Number(selectedAuthor);
        const matchesType =
            selectedType === "" ||
            (selectedType === "slide" && post.slide) ||
            (selectedType === "status" && post.status) ||
            (selectedType === "destaque" && post.highlight);
        return matchesSearch && matchesCategory && matchesAuthor && matchesType;
    });

    const uniqueAuthors = Array.from(
        new Set(
            posts.map((p) =>
                JSON.stringify({ id: p.authorId, name: p.author?.name || "Redação" }),
            ),
        ),
    ).map((a) => JSON.parse(a));
    return {
        data: {
            posts,
            categories,
            loading,
            showModal,
            postToDelete,
            searchTerm,
            selectedCategory,
            selectedAuthor,
            selectedType,
            filteredPosts,
            uniqueAuthors,
            currentUser,
            showModalMessage,
            modalWarning

        },
        methods: {
            handleDelete,
            handleToggleStatus,
            handleToggleSlide,
            handleToggleHighlight,
            setPostToDelete,
            setSearchTerm,
            setSelectedCategory,
            setSelectedAuthor,
            setSelectedType,
            setShowModal,
            setShowModalMessage,
            setModalWarning
        },
    };
};
