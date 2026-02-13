import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import "highlight.js/styles/github-dark.min.css";

interface MarkdownMessageProps {
  content: string;
}

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeRaw];

export const MarkdownMessage = memo(function MarkdownMessage({
  content,
}: MarkdownMessageProps) {
  const components: Components = useMemo(() => ({
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !match;

      if (isInline) {
        return (
          <code
            className="bg-gray-200 dark:bg-gray-700 text-red-600 dark:text-red-400 rounded px-1.5 py-0.5 text-[0.9em] font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <div className="relative my-4 rounded-lg overflow-hidden bg-gray-900">
          {match && (
            <div className="absolute right-3 top-3 text-xs text-gray-400 font-mono uppercase">
              {match[1]}
            </div>
          )}
          <pre className="overflow-x-auto p-4">
            <code className={`${className} text-gray-100 text-sm`} {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    },
    pre({ children }) {
      return <>{children}</>;
    },
    a({ href, children, ...props }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
          {...props}
        >
          {children}
        </a>
      );
    },
    ul({ children, ...props }) {
      return (
        <ul className="list-disc list-outside ml-6 my-3 space-y-1.5" {...props}>
          {children}
        </ul>
      );
    },
    ol({ children, ...props }) {
      return (
        <ol
          className="list-decimal list-outside ml-6 my-3 space-y-1.5"
          {...props}
        >
          {children}
        </ol>
      );
    },
    li({ children, ...props }) {
      return (
        <li className="leading-relaxed" {...props}>
          {children}
        </li>
      );
    },
    h1({ children, ...props }) {
      return (
        <h1
          className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100"
          {...props}
        >
          {children}
        </h1>
      );
    },
    h2({ children, ...props }) {
      return (
        <h2
          className="text-xl font-bold mt-5 mb-2.5 text-gray-900 dark:text-gray-100"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3({ children, ...props }) {
      return (
        <h3
          className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100"
          {...props}
        >
          {children}
        </h3>
      );
    },
    h4({ children, ...props }) {
      return (
        <h4
          className="text-base font-semibold mt-3 mb-1.5 text-gray-900 dark:text-gray-100"
          {...props}
        >
          {children}
        </h4>
      );
    },
    p({ children, ...props }) {
      return (
        <p
          className="my-3 leading-relaxed text-gray-800 dark:text-gray-200"
          {...props}
        >
          {children}
        </p>
      );
    },
    blockquote({ children, ...props }) {
      return (
        <blockquote
          className="border-l-4 border-primary/30 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-r"
          {...props}
        >
          {children}
        </blockquote>
      );
    },
    table({ children, ...props }) {
      return (
        <div className="overflow-x-auto my-4 rounded-lg border border-gray-300 dark:border-gray-700">
          <table
            className="min-w-full divide-y divide-gray-300 dark:divide-gray-700"
            {...props}
          >
            {children}
          </table>
        </div>
      );
    },
    thead({ children, ...props }) {
      return (
        <thead className="bg-gray-100 dark:bg-gray-800" {...props}>
          {children}
        </thead>
      );
    },
    tbody({ children, ...props }) {
      return (
        <tbody
          className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900"
          {...props}
        >
          {children}
        </tbody>
      );
    },
    th({ children, ...props }) {
      return (
        <th
          className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
          {...props}
        >
          {children}
        </th>
      );
    },
    td({ children, ...props }) {
      return (
        <td
          className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"
          {...props}
        >
          {children}
        </td>
      );
    },
    hr({ ...props }) {
      return (
        <hr
          className="my-6 border-t border-gray-300 dark:border-gray-700"
          {...props}
        />
      );
    },
    strong({ children, ...props }) {
      return (
        <strong
          className="font-bold text-gray-900 dark:text-gray-100"
          {...props}
        >
          {children}
        </strong>
      );
    },
    em({ children, ...props }) {
      return (
        <em className="italic text-gray-800 dark:text-gray-200" {...props}>
          {children}
        </em>
      );
    },
  }), []);

  return (
    <div className="markdown-content text-sm">
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
