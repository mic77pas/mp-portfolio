"use client";

import { useState } from "react";
import { programs } from "../../data/hsPrograms";
import FileExplorer from "./FileExplorer";
import CodeViewer from "./CodeViewer";
import TerminalPane from "./TerminalPane";
import RestrictedNotice from "./RestrictedNotice";

const MOBILE_TABS = ["Files", "Code", "Terminal"] as const;

export default function TerminalShell() {
  const [activeProgramId, setActiveProgramId] = useState(programs[0].id);
  const [activeFileName, setActiveFileName] = useState(
    programs[0].files[0].name,
  );
  const [mobileTab, setMobileTab] =
    useState<(typeof MOBILE_TABS)[number]>("Code");

  const activeProgram =
    programs.find((p) => p.id === activeProgramId) ?? programs[0];
  const activeFile =
    activeProgram.files.find((f) => f.name === activeFileName) ??
    activeProgram.files[0];

  const handleSelectFile = (programId: string, fileName: string) => {
    setActiveProgramId(programId);
    setActiveFileName(fileName);
    setMobileTab("Code");
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="overflow-hidden rounded-xl border-2 border-border-subtle bg-surface-1 shadow-lg">
        {/* fake title bar */}
        <div className="flex items-center gap-1.5 border-b border-border-subtle bg-surface-2 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-muted/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="ml-3 font-minecraft text-xs text-text-secondary">
            hs-programs — {activeProgram.title}
          </span>
        </div>

        {/* mobile pane switcher */}
        <div className="flex border-b border-border-subtle md:hidden">
          {MOBILE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMobileTab(tab)}
              className={`flex-1 py-2 font-minecraft text-xs ${
                mobileTab === tab
                  ? "bg-accent text-accent-contrast"
                  : "text-text-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid h-[520px] md:grid-cols-[200px_1fr_1fr]">
          <div className={`${mobileTab === "Files" ? "block" : "hidden"} md:block md:border-r md:border-border-subtle`}>
            <FileExplorer
              activeProgramId={activeProgramId}
              activeFileName={activeFileName}
              onSelectFile={handleSelectFile}
            />
          </div>

          <div className={`${mobileTab === "Code" ? "block" : "hidden"} md:block`}>
            <CodeViewer
              fileName={activeFile.name}
              language={activeFile.language}
              content={activeFile.content}
            />
          </div>

          <div className={`${mobileTab === "Terminal" ? "block" : "hidden"} md:block`}>
            <TerminalPane
              programId={activeProgram.id}
              runnableFile={activeProgram.runnableFile}
            />
          </div>
        </div>
      </div>

      <RestrictedNotice />
    </div>
  );
}
