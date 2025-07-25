import React from "react";
import Categories from "./Categories";
import Banner from "./Banner";
import CategoryProductCarouselList from "./CategoryProductCarouselList";
import CustomerFooter from "../footer/CustomerFooter";

export default function HomePage() {
  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <section className="mb-6">
        <Categories />
      </section>
      <section className="mb-6">
        <Banner />
      </section>
      <section className="mb-6">
        <CategoryProductCarouselList />
      </section>
      <footer className="mt-10">
        <CustomerFooter />
      </footer>
    </main>
  );
}
