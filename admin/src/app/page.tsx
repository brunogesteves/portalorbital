"use client";

import WelcomeSection from "../components/Dashboard/WelcomeSection";
import StatsGrid from "../components/Dashboard/StatsGrid";
import PostFilters from "../components/Dashboard/PostFilters";
import PostTable from "../components/Dashboard/PostTable";
import DeleteModal from "../components/Dashboard/DeleteModal";
import { usePage } from "@/components/UsePage";
import ModalMessage from "@/components/Dashboard/ModalMessage";
import { Suspense } from "react";

function Home() {
  const { data, methods } = usePage();

  return (
    <div className="space-y-6 md:space-y-12 pb-12 md:pb-20 px-2 md:px-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <WelcomeSection />

      <StatsGrid
        lenghtHighliht={
          new Set(data.posts.filter((p) => p.highlight == true)).size
        }
        lenghtActivePosts={
          new Set(data.posts.filter((p) => p.status == true)).size
        }
        lenghtSlides={new Set(data.posts.filter((p) => p.slide == true)).size}
      />

      <div className="bg-white rounded-2xl md:rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <PostFilters
          searchTerm={data.searchTerm}
          setSearchTerm={methods.setSearchTerm}
          selectedCategory={data.selectedCategory}
          setSelectedCategory={methods.setSelectedCategory}
          selectedAuthor={data.selectedAuthor}
          setSelectedAuthor={methods.setSelectedAuthor}
          selectedType={data.selectedType}
          setSelectedType={methods.setSelectedType}
          categories={data.categories}
          currentUser={data.currentUser}
          uniqueAuthors={data.uniqueAuthors}
        />

        <PostTable
          posts={data.filteredPosts}
          currentUser={data.currentUser}
          handleToggleStatus={methods.handleToggleStatus}
          handleToggleSlide={methods.handleToggleSlide}
          handleToggleHighlight={methods.handleToggleHighlight}
          setPostToDelete={(id) => methods.setPostToDelete(id)}
          setShowModal={methods.setShowModal}
        />
      </div>

      {data.showModal && (
        <DeleteModal
          postTitle={data.posts.find((p) => p.id === data.postToDelete)?.title}
          handleDelete={methods.handleDelete}
          setShowModal={methods.setShowModal}
        />
      )}
      {data.showModalMessage && (
        <ModalMessage text={data.modalWarning} setShowModal={(e: boolean) => methods.setShowModalMessage(e)} />
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-red-600/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-slate-400 font-bold tracking-[3px] uppercase text-[10px]">
        Sincronizando Sistema...
      </p>
    </div>}>
      <Home />
    </Suspense>
  );
}