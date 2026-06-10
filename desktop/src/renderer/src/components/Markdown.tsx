import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Self-contained markdown styling via component overrides (no typography
// plugin). Links open in the system browser via the main-process handler.
const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-4 mb-2 text-lg font-semibold tracking-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-4 mb-2 text-base font-semibold tracking-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-3 mb-1.5 text-sm font-semibold tracking-tight">{children}</h3>
  ),
  p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="my-2 ml-5 list-disc space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="my-2 ml-5 list-decimal space-y-1">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (href) window.founder.openExternal(href);
      }}
      className="cursor-pointer font-medium text-blue-700 underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-neutral-300 pl-3 text-neutral-500 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-4 border-neutral-200" />,
  code: ({ children }) => (
    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-3 overflow-x-auto rounded-md bg-neutral-100 p-3 font-mono text-xs">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-neutral-300">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-neutral-200 px-3 py-2 align-top">{children}</td>
  ),
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="text-sm text-neutral-900">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
