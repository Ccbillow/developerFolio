import React, {useState, useRef, useEffect, useContext, useCallback} from "react";
import Lottie from "lottie-react";
import chatbotAnimation from "../../assets/lottie/chatbot.json";
import ChatMessage from "./ChatMessage";
import styles from "./Chatbot.module.css";
import StyleContext from "../../contexts/StyleContext";

const API_URL =
  (process.env.REACT_APP_API_URL || "http://localhost:8080") + "/api/chat/stream";
const WELCOME =
  "Hi! I'm TBot, Tao's personal assistant 👋 I know Tao's story inside out — let's talk.";
const QUICK_REPLIES = [
  "What's your tech stack?",
  "How does the AI Project work?",
  "What are your main strengths as a software engineer?",
  "What was the biggest technical challenge at Alipay?"
];

export default function Chatbot() {
  const {isDark} = useContext(StyleContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [panelBottom, setPanelBottom] = useState(0);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const wasAtBottomRef = useRef(true);
  const inputRef = useRef(null);
  const hasGreeted = useRef(false);
  const sessionIdRef = useRef(crypto.randomUUID());

  useEffect(() => {
    if (isStreaming || wasAtBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }
  }, [messages, isStreaming]);

  const handleMessagesScroll = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
    wasAtBottomRef.current = dist < 80;
    setShowScrollBtn(dist > 80);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    setShowScrollBtn(false);
    wasAtBottomRef.current = true;
  }, []);

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

  useEffect(() => {
    const id = setInterval(() => setShowPulse(true), 10000);
    return () => clearInterval(id);
  }, []);

  // Auto-hide pulse after 3 rings (~2.4s)
  useEffect(() => {
    if (!showPulse) return;
    const t = setTimeout(() => setShowPulse(false), 4800);
    return () => clearTimeout(t);
  }, [showPulse]);

  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv || !isOpen) { setPanelBottom(0); return; }
    const update = () => {
      setPanelBottom(Math.max(0, window.innerHeight - vv.height - vv.offsetTop));
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      setPanelBottom(0);
    };
  }, [isOpen]);

  const finishStreaming = useCallback(() => {
    setIsStreaming(false);
    setMessages(prev => {
      const next = [...prev];
      const last = next[next.length - 1];
      return [...next.slice(0, -1), {...last, streaming: false}];
    });
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const sendMessage = async q => {
    if (!q || isStreaming) return;

    setMessages(prev => [
      ...prev,
      {role: "user", text: q},
      {role: "assistant", text: "", streaming: true}
    ]);
    setInput("");
    setIsStreaming(true);
    wasAtBottomRef.current = true;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    const finish = () => { clearTimeout(timeoutId); finishStreaming(); };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({question: q, sessionId: sessionIdRef.current}),
        signal: controller.signal
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let currentEvent = "";
      let dataLines = [];

      while (true) {
        const {done, value} = await reader.read();
        if (done) break;

        buf += decoder.decode(value, {stream: true});
        const lines = buf.split("\n");
        buf = lines.pop();

        for (const line of lines) {
          if (line.startsWith("event:")) {
            currentEvent = line.slice(6).trim();
            dataLines = [];
          } else if (line.startsWith("data:")) {
            // slice(5) preserves token-leading spaces (e.g. " Alipay" token → "data: Alipay")
            dataLines.push(line.slice(5));
          } else if (line === "") {
            // Blank line = end of SSE event — dispatch accumulated data
            if (dataLines.length === 0) continue;
            const raw = dataLines.join("\n");
            dataLines = [];

            if (currentEvent === "done" || raw.trim() === "[DONE]") {
              finish();
              return;
            }
            if (currentEvent === "error") {
              setMessages(prev => [
                ...prev.slice(0, -1),
                {role: "assistant", text: raw.trim()}
              ]);
              finish();
              return;
            }
            if (currentEvent === "message") {
              // Decode \\n back to real newlines (backend encodes \n to avoid SSE line conflicts)
              const decoded = raw.replace(/\\n/g, "\n");
              setMessages(prev => {
                const next = [...prev];
                const last = next[next.length - 1];
                return [...next.slice(0, -1), {...last, text: last.text + decoded}];
              });
            }
          }
        }
      }
      finish();
    } catch (err) {
      clearTimeout(timeoutId);
      setIsStreaming(false);
      const isTimeout = err.name === "AbortError";
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          text: isTimeout
            ? "The request timed out after 30s. Please check your connection and try again."
            : `Sorry, I'm having trouble connecting. Please try again. (${err.message})`,
          error: true
        }
      ]);
    }
  };

  const send = () => sendMessage(input.trim());
  const sendQuickReply = q => sendMessage(q);

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
  const showChips = messages.length === 1 && !isStreaming;

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={close} />}

      <div
        className={[
          styles.panel,
          isOpen ? styles.panelOpen : "",
          isDark ? styles.panelDark : ""
        ].join(" ")}
        style={panelBottom > 0 ? {bottom: panelBottom} : undefined}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerAvatarWrap}>
              <img src="/robot-header.jpg" alt="TBot" className={styles.headerAvatar} />
            </div>
            <div>
              <div className={styles.headerTitle}>Chat with TBot</div>
              <div className={styles.headerSub}>
                <span
                  className={[
                    styles.statusDot,
                    isStreaming ? styles.statusDotStreaming : ""
                  ].join(" ")}
                />
                {isStreaming ? (
                  <>
                    Typing
                    <span className={styles.dot1}>.</span>
                    <span className={styles.dot2}>.</span>
                    <span className={styles.dot3}>.</span>
                  </>
                ) : "TBot is online"}
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
        <div
          ref={messagesContainerRef}
          onScroll={handleMessagesScroll}
          className={`${styles.messages} ${isDark ? styles.messagesDark : ""}`}
        >
          {messages.map((msg, i) => (
            <ChatMessage
                key={i}
                message={msg}
                isDark={isDark}
                onRetry={msg.error ? () => {
                  const prev = messages.slice(0, i).reverse().find(m => m.role === "user");
                  if (prev) sendMessage(prev.text);
                } : undefined}
              />
          ))}
          {showChips && (
            <div className={styles.chipsContainer}>
              {QUICK_REPLIES.map((q, i) => (
                <button
                  key={q}
                  className={`${styles.chip} ${isDark ? styles.chipDark : ""}`}
                  style={{animationDelay: `${i * 0.07}s`}}
                  onClick={() => sendQuickReply(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          {showTyping && (
            <div className={`${styles.typing} ${isDark ? styles.typingDark : ""}`}>
              <span />
              <span />
              <span />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll-to-bottom */}
        {showScrollBtn && (
          <button
            className={`${styles.scrollToBottomBtn} ${isDark ? styles.scrollToBottomBtnDark : ""}`}
            onClick={scrollToBottom}
            aria-label="Scroll to latest message"
          >
            {isStreaming ? "↓ 新消息" : "↓"}
          </button>
        )}

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
        className={[
          styles.fab,
          isOpen ? styles.fabActive : "",
          isDark ? styles.fabDark : ""
        ].join(" ")}
        onClick={isOpen ? close : open}
        onMouseEnter={() => setShowPulse(false)}
        aria-label="Toggle AI chat"
      >
        <span className={styles.fabTooltip}>Chat with TBot</span>
        {showPulse && !isOpen && (
          <span className={styles.fabPulseRing} />
        )}
        <Lottie
          animationData={chatbotAnimation}
          loop={true}
          style={{width: 100, height: 100}}
        />
      </button>
    </>
  );
}
