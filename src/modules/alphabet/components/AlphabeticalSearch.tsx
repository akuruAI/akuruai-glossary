"use client";

import { Button } from "@modules/shared/components/ui/button";
import { Separator } from "@modules/shared/components/ui/separator";
import { useState } from "react";

export function AlphabeticalSearch() {
  const [currentScript, setCurrentScript] = useState<"en" | "si" | "ta">("en");

  // Define alphabets for each script with unique letters
  const alphabets = {
    en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    si: "අආඇඈඉඊඋඌඍඎඏඐඑඒඓඔඕඖකඛගඝඞඟචඡජඣඤඥටඨඩඪණඬතථදධනඳපඵබභමඹයරලවශෂසහළෆ".split(""),
    ta: "அஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரலவழளறஸஷஹ".split(""), // Removed duplicate letters
  };

  return (
    <div className="mt-8 border-t border-b px-5 py-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">Search Alphabetically</span>
        <div className="flex gap-2">
          <Button
            variant={currentScript === "en" ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentScript("en")}
          >
            A-Z
          </Button>
          <Button
            variant={currentScript === "si" ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentScript("si")}
          >
            අ-ෆ
          </Button>
          <Button
            variant={currentScript === "ta" ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentScript("ta")}
          >
            அ-ஹ
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 items-center">
        {alphabets[currentScript].map((letter, index) => (
          <div key={`${letter}-${index}`} className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="min-w-8 h-8 px-2 font-medium"
            >
              {letter}
            </Button>
            {index < alphabets[currentScript].length - 1 && (
              <Separator
                orientation="vertical"
                className="h-4 mx-0.5"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
