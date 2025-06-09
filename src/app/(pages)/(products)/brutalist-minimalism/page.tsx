import { BrutalistMinimalismDemo } from "@/components/BrutalistMinimalismDemo";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brutalist Minimalism",
  description: "Explore the fusion of structural honesty and refined simplicity in digital design.",
  authors: [{ name: "Nabin Khair", url: "https://www.nabinkhair.com.np" }],
};

const page = () => {
  return (
    <>
    <BrutalistMinimalismDemo />
    </>
  );
};

export default page;
