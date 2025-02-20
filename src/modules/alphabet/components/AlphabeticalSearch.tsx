"use client";

import { Button } from "@modules/shared/components/ui/button";
import { Separator } from "@modules/shared/components/ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function AlphabeticalSearch() {
  const [currentScript] = useState<"en">("en");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Define alphabets for each script with unique letters
  const alphabets = {
    en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    // si: "අආඇඈඉඊඋඌඍඎඏඐඑඒඓඔඕඖකඛගඝඞඟචඡජඣඤඥටඨඩඪණඬතථදධනඳපඵබභමඹයරලවශෂසහළෆ".split(""),
    // ta: "அஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரலவழளறஸஷஹ".split(""), // Removed duplicate letters
  };

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          current.delete(key);
        }
        else {
          current.set(key, String(value));
        }
      }

      return current.toString();
    },
    [searchParams],
  );

  const handleLetterClick = useCallback(
    (letter: string) => {
      router.push(
        `${pathname}?${createQueryString({
          search: letter,
          script: currentScript,
          page: 1,
        })}`,
        { scroll: false },
      );
    },
    [router, pathname, createQueryString, currentScript],
  );

  // const handleScriptChange = useCallback(
  //   (script: "en" | "si" | "ta") => {
  //     setCurrentScript(script);
  //     // Clear the search when changing scripts
  //     router.push(
  //       `${pathname}?${createQueryString({
  //         search: null,
  //         script,
  //         page: 1,
  //       })}`,
  //       { scroll: false },
  //     );
  //   },
  //   [router, pathname, createQueryString],
  // );

  return (
    <div className="mt-8 border-t border-b px-5 py-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">Search Alphabetically</span>
        <div className="flex gap-2">
          {/* <Button */}
          {/*  variant={currentScript === "en" ? "default" : "outline"} */}
          {/*  size="sm" */}
          {/*  onClick={() => handleScriptChange("en")} */}
          {/* > */}
          {/*  A-Z */}
          {/* </Button> */}
          {/* <Button */}
          {/*  variant={currentScript === "si" ? "default" : "outline"} */}
          {/*  size="sm" */}
          {/*  onClick={() => handleScriptChange("si")} */}
          {/* > */}
          {/*  අ-ෆ */}
          {/* </Button> */}
          {/* <Button */}
          {/*  variant={currentScript === "ta" ? "default" : "outline"} */}
          {/*  size="sm" */}
          {/*  onClick={() => handleScriptChange("ta")} */}
          {/* > */}
          {/*  அ-ஹ */}
          {/* </Button> */}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 items-center">
        {alphabets[currentScript].map((letter, index) => (
          <div key={`${letter}-${index}`} className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="min-w-8 h-8 px-2 font-medium hover:bg-muted"
              onClick={() => handleLetterClick(letter)}
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
