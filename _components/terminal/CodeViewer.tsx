const PY_KEYWORDS = new Set([
  "def",
  "import",
  "if",
  "elif",
  "else",
  "while",
  "for",
  "return",
  "print",
  "in",
  "and",
  "or",
  "not",
  "True",
  "False",
  "None",
  "with",
  "as",
  "break",
  "continue",
  "class",
  "from",
  "try",
  "except",
  "finally",
  "pass",
  "lambda",
  "yield",
]);

type Token = { text: string; type: "comment" | "string" | "keyword" | "plain" };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    const ch = line[i];

    if (ch === "#") {
      tokens.push({ text: line.slice(i), type: "comment" });
      break;
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) j += 1;
      j = Math.min(j + 1, line.length);
      tokens.push({ text: line.slice(i, j), type: "string" });
      i = j;
      continue;
    }

    const wordMatch = /^[A-Za-z_][A-Za-z0-9_]*/.exec(line.slice(i));
    if (wordMatch) {
      const word = wordMatch[0];
      tokens.push({
        text: word,
        type: PY_KEYWORDS.has(word) ? "keyword" : "plain",
      });
      i += word.length;
      continue;
    }

    tokens.push({ text: ch, type: "plain" });
    i += 1;
  }

  return tokens;
}

const TOKEN_CLASS: Record<Token["type"], string> = {
  comment: "text-text-muted italic",
  string: "text-accent",
  keyword: "text-accent font-semibold",
  plain: "text-text-primary",
};

export default function CodeViewer({
  fileName,
  language,
  content,
}: {
  fileName: string;
  language: string;
  content: string;
}) {
  const lines = content.replace(/\n$/, "").split("\n");

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-border-subtle bg-surface-2 px-3 py-1.5 font-minecraft text-xs text-text-secondary">
        {fileName}
      </div>
      <pre className="modal-scroll flex-1 overflow-auto bg-surface-0 p-3 text-xs leading-6">
        <code>
          {lines.map((line, index) => (
            <div key={index} className="flex gap-3">
              <span className="w-6 shrink-0 select-none text-right text-text-muted/60">
                {index + 1}
              </span>
              <span className="whitespace-pre-wrap break-words">
                {language === "python"
                  ? tokenizeLine(line).map((token, i) => (
                      <span key={i} className={TOKEN_CLASS[token.type]}>
                        {token.text}
                      </span>
                    ))
                  : line}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
