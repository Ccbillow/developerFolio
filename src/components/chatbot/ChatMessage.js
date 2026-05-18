import React from "react";
import styles from "./Chatbot.module.css";

function parseInline(text, keyPrefix) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, pi) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={`b-${keyPrefix}-${pi}`}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={`c-${keyPrefix}-${pi}`} className={styles.inlineCode}>{part.slice(1, -1)}</code>;
    return part || null;
  });
}

function parseMarkdown(text) {
  const segments = text.split(/(```[\s\S]*?```)/g);

  return segments.flatMap((seg, si) => {
    if (seg.startsWith("```") && seg.endsWith("```")) {
      const inner = seg.slice(3, -3).replace(/^\w*\n/, "");
      return [<pre key={`pre-${si}`} className={styles.codeBlock}><code>{inner}</code></pre>];
    }

    // Split on double newlines to get paragraph blocks; filter blanks
    const blocks = seg.split(/\n\n+/).filter(b => b.trim() !== "");
    const multiBlock = blocks.length > 1;

    return blocks.flatMap((block, pi) => {
      const lines = block.split("\n");
      const result = [];
      let listItems = [];
      let listType = null; // "ul" | "ol"

      const flushList = key => {
        if (listItems.length === 0) return;
        const Tag = listType === "ol" ? "ol" : "ul";
        const cls = listType === "ol" ? styles.orderedList : styles.bulletList;
        result.push(
          <Tag key={`list-${key}`} className={cls}>
            {listItems.map((item, i) => (
              <li key={i}>{parseInline(item, `${key}-${i}`)}</li>
            ))}
          </Tag>
        );
        listItems = [];
        listType = null;
      };

      lines.forEach((line, li) => {
        if (line.startsWith("- ") || line.startsWith("* ")) {
          if (listType === "ol") flushList(`${si}-${pi}-${li}`);
          listType = "ul";
          listItems.push(line.slice(2));
        } else if (/^\d+\. /.test(line)) {
          if (listType === "ul") flushList(`${si}-${pi}-${li}`);
          listType = "ol";
          listItems.push(line.replace(/^\d+\. /, ""));
        } else {
          flushList(`${si}-${pi}-${li}`);
          result.push(
            <React.Fragment key={`l-${si}-${pi}-${li}`}>
              {parseInline(line, `${si}-${pi}-${li}`)}
              {li < lines.length - 1 && <br />}
            </React.Fragment>
          );
        }
      });
      flushList(`${si}-${pi}-end`);

      if (result.length === 0) return [];
      if (!multiBlock) return result;
      return [<div key={`p-${si}-${pi}`} className={styles.para}>{result}</div>];
    });
  });
}

export default function ChatMessage({message, isDark, onRetry}) {
  const isUser = message.role === "user";

  return (
    <div className={`${styles.msg} ${isUser ? styles.msgUser : styles.msgAssistant}`}>
      {!isUser && <img src="/robot.svg" alt="AI" className={styles.msgAvatar} />}
      <div className={styles.bubbleWrapper}>
        <div
          className={[
            styles.bubble,
            isUser ? styles.bubbleUser : styles.bubbleAI,
            isDark && !isUser ? styles.bubbleAIDark : "",
            message.error ? styles.bubbleError : ""
          ].join(" ")}
        >
          {parseMarkdown(message.text)}
          {message.streaming && message.text.length > 0 && (
            <span className={styles.cursor}>▋</span>
          )}
        </div>
        {message.error && onRetry && (
          <button
            className={`${styles.retryBtn} ${isDark ? styles.retryBtnDark : ""}`}
            onClick={onRetry}
          >
            ↩ Retry
          </button>
        )}
      </div>
    </div>
  );
}
