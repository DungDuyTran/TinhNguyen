// app/page.tsx
import React from "react";

import ThemeWrapper from "@/app/components/ThemeWrapper";
import { ThemeToggle } from "./components/ThemeToggler";

export default function HomePage() {
  return (
    <ThemeWrapper>
      <div className="container mx-auto p-8 flex justify-center items-center text-5xl ">
        hellooooooooo !
      </div>
    </ThemeWrapper>
  );
}
