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

    const lines = seg.split("\n");
    const result = [];
    let bulletItems = [];

    const flushBullets = key => {
      if (bulletItems.length === 0) return;
      result.push(
        <ul key={`ul-${key}`} className={styles.bulletList}>
          {bulletItems.map((item, i) => (
            <li key={i}>{parseInline(item, `${key}-${i}`)}</li>
          ))}
        </ul>
      );
      bulletItems = [];
    };

    lines.forEach((line, li) => {
      if (line.startsWith("- ") || line.startsWith("* ")) {
        bulletItems.push(line.slice(2));
      } else {
        flushBullets(`${si}-${li}`);
        result.push(
          <React.Fragment key={`l-${si}-${li}`}>
            {parseInline(line, `${si}-${li}`)}
            {li < lines.length - 1 && <br />}
          </React.Fragment>
        );
      }
    });
    flushBullets(`${si}-end`);

    return result;
  });
}

export default function ChatMessage({message, isDark}) {
  const isUser = message.role === "user";

  return (
    <div className={`${styles.msg} ${isUser ? styles.msgUser : styles.msgAssistant}`}>
      {!isUser && <img src="/robot.svg" alt="AI" className={styles.msgAvatar} />}
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
    </div>
  );
}
