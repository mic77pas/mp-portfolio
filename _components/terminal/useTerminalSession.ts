"use client";

import { useCallback, useRef, useState } from "react";

export type LogEntry =
  | { type: "output"; text: string }
  | { type: "prompt"; text: string }
  | { type: "input"; text: string };

export type Step =
  | { type: "output"; text: string }
  | { type: "input"; prompt: string; key: string };

export type TerminalStatus = "idle" | "running" | "awaitingInput" | "done";

function interpolate(text: string, inputs: Record<string, string>) {
  return text.replace(/\{\{(\w+)\}\}/g, (_match, key) => inputs[key] ?? "");
}

// Plays back a fixed script step by step — there is no interpreter here, so
// this is structurally incapable of executing arbitrary code. Typed input is
// only ever echoed back or substituted into later canned output.
export function useTerminalSession(script: Step[]) {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<TerminalStatus>("idle");
  const stepIndexRef = useRef(0);
  const inputsRef = useRef<Record<string, string>>({});

  const runFrom = useCallback(
    (index: number) => {
      let i = index;
      const newEntries: LogEntry[] = [];

      while (i < script.length) {
        const step = script[i];
        if (step.type === "output") {
          newEntries.push({
            type: "output",
            text: interpolate(step.text, inputsRef.current),
          });
          i += 1;
          continue;
        }

        newEntries.push({ type: "prompt", text: step.prompt });
        stepIndexRef.current = i;
        setLog((prev) => [...prev, ...newEntries]);
        setStatus("awaitingInput");
        return;
      }

      stepIndexRef.current = i;
      setLog((prev) => [...prev, ...newEntries]);
      setStatus("done");
    },
    [script],
  );

  const run = useCallback(() => {
    setLog([]);
    inputsRef.current = {};
    stepIndexRef.current = 0;
    setStatus("running");
    runFrom(0);
  }, [runFrom]);

  const submitInput = useCallback(
    (value: string) => {
      const step = script[stepIndexRef.current];
      if (!step || step.type !== "input") return;

      inputsRef.current[step.key] = value;
      setLog((prev) => [...prev, { type: "input", text: value }]);
      runFrom(stepIndexRef.current + 1);
    },
    [runFrom, script],
  );

  const reset = useCallback(() => {
    setLog([]);
    setStatus("idle");
    stepIndexRef.current = 0;
    inputsRef.current = {};
  }, []);

  return { log, status, run, submitInput, reset };
}
