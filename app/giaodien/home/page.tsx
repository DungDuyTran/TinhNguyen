"use client";

import { Header } from "@/app/components/ui/Header";
import { Modal } from "@/app/components/ui/Modal";
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Header />
      <Modal />
    </main>
  );
}
