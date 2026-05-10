import React, {useState, useRef, useEffect, useContext, useCallback} from "react";
import Lottie from "lottie-react";
import chatbotAnimation from "../../assets/lottie/chatbot.json";
import profilePhoto from "../../assets/images/profile.jpg";
import ChatMessage from "./ChatMessage";
import styles from "./Chatbot.module.css";
import StyleContext from "../../contexts/StyleContext";

const API_URL = "http://localhost:8080/api/chat/stream";
const WELCOME =
  "Hi! I'm Tao's AI assistant 👋 Ask me anything about his background, skills, projects, or experience.";

export default function Chatbot() {
  const {isDark} = useContext(StyleContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasGreeted = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  const open = useCallback(() => {
    setIsOpen(true);
    if (!hasGreeted.current) {
      hasGreeted.current = true;
      setMessages([{role: "assistant", text: WELCOME}]);
    }
    setTimeout(() => inputRef.current?.focus(), 150);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const finishStreaming = useCallback(() => {
    setIsStreaming(false);
    setMessages(prev => {
      const next = [...prev];
      const last = next[next.length - 1];
      return [...next.slice(0, -1), {...last, streaming: false}];
    });
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const send = async () => {
    const q = input.trim();
    if (!q || isStreaming) return;

    setMessages(prev => [
      ...prev,
      {role: "user", text: q},
      {role: "assistant", text: "", streaming: true}
    ]);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({question: q})
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let currentEvent = "";

      while (true) {
        const {done, value} = await reader.read();
        if (done) break;

        buf += decoder.decode(value, {stream: true});
        const lines = buf.split("\n");
        buf = lines.pop();

        for (const line of lines) {
          if (line.startsWith("event:")) {
            currentEvent = line.slice(6).trim();
          } else if (line.startsWith("data:")) {
            const raw = line.slice(5);
            if (currentEvent === "done" || raw.trim() === "[DONE]") {
              finishStreaming();
              return;
            }
            if (currentEvent === "message") {
              setMessages(prev => {
                const next = [...prev];
                const last = next[next.length - 1];
                return [...next.slice(0, -1), {...last, text: last.text + raw}];
              });
            }
          }
        }
      }
      finishStreaming();
    } catch (err) {
      setIsStreaming(false);
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          text: `Sorry, I'm having trouble connecting. Please try again. (${err.message})`,
          error: true
        }
      ]);
    }
  };

  const onKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const onInputChange = e => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const showTyping =
    isStreaming && messages[messages.length - 1]?.text === "";

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={close} />}

      <div
        className={[
          styles.panel,
          isOpen ? styles.panelOpen : "",
          isDark ? styles.panelDark : ""
        ].join(" ")}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <img src={profilePhoto} alt="Tao" className={styles.headerAvatar} />
            <div>
              <div className={styles.headerTitle}>Ask Tao's AI</div>
              <div className={styles.headerSub}>
                <span className={styles.statusDot} />
                Ready to chat
              </div>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={close}
            aria-label="Close chat"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Messages */}
        <div className={`${styles.messages} ${isDark ? styles.messagesDark : ""}`}>
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} isDark={isDark} />
          ))}
          {showTyping && (
            <div className={`${styles.typing} ${isDark ? styles.typingDark : ""}`}>
              <span />
              <span />
              <span />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`${styles.footer} ${isDark ? styles.footerDark : ""}`}>
          <div className={styles.inputRow}>
            <textarea
              ref={inputRef}
              className={`${styles.textarea} ${isDark ? styles.textareaDark : ""}`}
              value={input}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
              placeholder="Ask about skills, projects, experience…"
              disabled={isStreaming}
              rows={1}
            />
            <button
              className={styles.sendBtn}
              onClick={send}
              disabled={!input.trim() || isStreaming}
              aria-label="Send message"
            >
              <i className="fas fa-paper-plane" />
            </button>
          </div>
          <p className={styles.hint}>Enter to send · Shift+Enter for new line</p>
        </div>
      </div>

      {/* FAB */}
      <button
        className={`${styles.fab} ${isOpen ? styles.fabActive : ""}`}
        onClick={isOpen ? close : open}
        aria-label="Toggle AI chat"
      >
        <Lottie
          animationData={chatbotAnimation}
          loop={true}
          style={{width: 100, height: 100}}
        />
      </button>
    </>
  );
}
