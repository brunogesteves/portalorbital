"use client";
import { Suspense } from "react";

import WelcomeSection from "@/components/Dashboard/WelcomeSection";
import StatsGrid from "@/components/Dashboard/StatsGrid";
import PostFilters from "@/components/Dashboard/PostFilters";
import PostTable from "@/components/Dashboard/PostTable";
import DeleteModal from "@/components/Dashboard/DeleteModal";
import { HomeLogic } from "@/components/Home.Logic";
import ModalMessage from "@/components/ModalMessage";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";

function Home() {
  const { data, methods } = HomeLogic();

  return (
    <div className="space-y-6 md:space-y-12 pb-12 md:pb-20 px-2 md:px-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <WelcomeSection />

      <StatsGrid statistics={data.stats} />

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
          currentUser={data.userData.role}
          uniqueAuthors={data.uniqueAuthors}
        />

        <PostTable
          posts={data.posts}
          currentUser={data.userData.role}
          handleUpdateStatus={methods.handleUpdateStatus}
          setPostToDelete={(id) => methods.setPostToDelete(id)}
          setShowModal={methods.setShowModal}
          pagination={data.pagination}
          goToPage={methods.goToPage}
          setLimit={methods.setLimit}
          fetching={data.fetching}
          path={"edit"}
        />
      </div>

      {data.showModal && (
        <DeleteModal
          postTitle={data.posts.find((p) => p.id === data.postToDelete)?.title}
          handleDelete={methods.handleDelete}
          setShowModal={methods.setShowModal}
          isDeleting={data.isDeleting}
        />
      )}
      {data.showModalMessage && (
        <ModalMessage
          text={data.modalWarning}
          setShowModal={(e: boolean) => methods.setShowModalMessage(e)}
        />
      )}
      {data.showToast && (
        <Toast
          message={data.toastMessage}
          onClose={() => methods.setShowToast(false)}
        />
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
}
