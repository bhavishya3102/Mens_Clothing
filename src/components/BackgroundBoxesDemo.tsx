import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-6xl text-xl text-white relative z-20 font-bold uppercase")}>
        Elevate Your Style
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20 text-2xl">
        Discover premium fashion for modern men
      </p>
    </div>
  );
}
