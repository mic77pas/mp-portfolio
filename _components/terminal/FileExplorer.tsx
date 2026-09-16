"use client";

import { FileCode, FileText, Folder } from "lucide-react";
import { programs } from "../../data/hsPrograms";

export default function FileExplorer({
  activeProgramId,
  activeFileName,
  onSelectFile,
}: {
  activeProgramId: string;
  activeFileName: string;
  onSelectFile: (programId: string, fileName: string) => void;
}) {
  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto p-2 text-sm">
      {programs.map((program) => (
        <div key={program.id}>
          <div className="flex items-center gap-1.5 px-1 py-1 text-text-secondary">
            <Folder size={14} />
            <span className="font-minecraft text-xs">{program.title}</span>
          </div>
          <div className="ml-4 flex flex-col gap-0.5">
            {program.files.map((file) => {
              const isActive =
                program.id === activeProgramId && file.name === activeFileName;
              const Icon = file.language === "python" ? FileCode : FileText;
              return (
                <button
                  key={file.name}
                  type="button"
                  onClick={() => onSelectFile(program.id, file.name)}
                  className={`flex items-center gap-1.5 rounded px-2 py-1 text-left text-xs transition-colors ${
                    isActive
                      ? "bg-accent text-accent-contrast"
                      : "text-text-secondary hover:bg-surface-2"
                  }`}
                >
                  <Icon size={13} />
                  {file.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
