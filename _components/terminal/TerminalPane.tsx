"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { useTerminalSession, type Step } from "./useTerminalSession";
import { scripts } from "../../data/hsProgramScripts";

export default function TerminalPane({
  programId,
  runnableFile,
}: {
  programId: string;
  runnableFile: string;
}) {
  const script = (scripts[programId as keyof typeof scripts] ?? []) as Step[];
  const { log, status, run, submitInput, reset } = useTerminalSession(script);
  const [draft, setDraft] = useState("");
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reset();
    setDraft("");
    // Reset the simulated session whenever the visitor switches programs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programId]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ block: "end" });
  }, [log, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "awaitingInput") return;
    submitInput(draft);
    setDraft("");
  };

  return (
    <div className="flex h-full flex-col overflow-hidden border-t border-border-subtle md:border-l md:border-t-0">
      <div className="flex items-center justify-between border-b border-border-subtle bg-surface-2 px-3 py-1.5">
        <span className="font-minecraft text-xs text-text-secondary">
          Terminal
        </span>
        <div className="flex items-center gap-2">
          {status === "idle" || status === "done" ? (
            <button
              type="button"
              onClick={run}
              className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-minecraft text-[11px] text-accent-contrast hover:bg-accent-hover"
            >
              <Play size={12} /> Run {runnableFile}
            </button>
          ) : (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1 font-minecraft text-[11px] text-text-secondary hover:border-accent hover:text-accent"
            >
              <RotateCcw size={12} /> Stop
            </button>
          )}
        </div>
      </div>

      <div className="modal-scroll flex-1 overflow-auto bg-surface-0 p-3 font-mono text-xs leading-6 text-text-primary">
        {log.length === 0 && status === "idle" && (
          <p className="text-text-muted">
            Click &ldquo;Run {runnableFile}&rdquo; to simulate this program.
            This is a scripted playback, not a live interpreter.
          </p>
        )}

        {log.map((entry, index) => (
          <div key={index}>
            {entry.type === "output" && <p>{entry.text}</p>}
            {entry.type === "prompt" && (
              <span className="text-text-secondary">{entry.text}</span>
            )}
            {entry.type === "input" && (
              <span className="text-accent">{entry.text}</span>
            )}
          </div>
        ))}

        {status === "awaitingInput" && (
          <form onSubmit={handleSubmit} className="mt-1 flex items-center gap-1">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="flex-1 bg-transparent text-accent outline-none"
              aria-label="Simulated program input"
            />
          </form>
        )}

        <div ref={logEndRef} />
      </div>
    </div>
  );
}
