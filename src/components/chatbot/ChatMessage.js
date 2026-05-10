import React from "react";
import styles from "./Chatbot.module.css";

function parseMarkdown(text) {
  const segments = text.split(/(```[\s\S]*?```)/g);

  return segments.flatMap((seg, si) => {
    if (seg.startsWith("```") && seg.endsWith("```")) {
      const inner = seg.slice(3, -3).replace(/^\w*\n/, "");
      return [
        <pre key={`pre-${si}`} className={styles.codeBlock}>
          <code>{inner}</code>
        </pre>
      ];
    }

    const inline = seg.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return inline.flatMap((part, pi) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return [<strong key={`b-${si}-${pi}`}>{part.slice(2, -2)}</strong>];
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return [
          <code key={`c-${si}-${pi}`} className={styles.inlineCode}>
            {part.slice(1, -1)}
          </code>
        ];
      }
      return part.split("\n").map((line, li, arr) => (
        <React.Fragment key={`l-${si}-${pi}-${li}`}>
          {line}
          {li < arr.length - 1 && <br />}
        </React.Fragment>
      ));
    });
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
