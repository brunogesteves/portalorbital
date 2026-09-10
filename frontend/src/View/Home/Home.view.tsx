"use client";

import Slider from "@/components/Header/Slider/Slider";
import { HomeLogic } from "./Home.logic";
import Header from "@/components/Header/Header";
import JsonLD from "@/components/jsonLd";

export default function Home() {
  const { data, methods } = HomeLogic();

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <JsonLD description={"Home"} />

      <Header slug="Home" />
      <div className="hidden md:block text-gray-800 min-h-screen bg-white">
        <main className="w-full min-h-screen">
          <Slider device="desktop" />
          <section className="bg-white py-12" data-purpose="main-content-body">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
              {methods.highlightDesktop()}
              {methods.moreHighlightDesktop()}
              {data.content.map((info, i) => {
                return methods.contentModelDesktop(info, i)
              })}
            </div>
          </section>
        </main>
      </div>
      <div className="block md:hidden text-gray-800 min-h-screen bg-white flex flex-col w-full">
        {/* Content Area */}
        <main
          className="p-4 bg-white overflow-y-auto flex-1"
          style={{ paddingBottom: "80px" }}
        >
          <Slider device="mobile" />

          {methods.highlightMobile()}

          {data.content.map((info, i) => {
            return methods.contentModelMobile(info, i)
          })}
        </main>
      </div>
    </div>
  );
}
