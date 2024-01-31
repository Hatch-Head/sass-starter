"use client";

import { useEffect, useState } from "react";

type Props = {
  message?: string;
};

const Error = ({ message }: Props) => {
  const [showContent, setShowContent] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | undefined>(
    message,
  );

  useEffect(() => {
    if (message) {
      setShowContent(true);
      setCurrentMessage(message);
    } else {
      // Start collapse transition, but keep content visible
      setShowContent(false);
      // After transition, clear content
      const timer = setTimeout(() => setCurrentMessage(""), 300); // match this duration with your transition
      return () => clearTimeout(timer);
    }
  }, [message]);

  const baseStyle = "transition-all duration-300 overflow-visible";
  const errorMessageStyle = showContent
    ? "max-h-12 opacity-100"
    : "max-h-0 opacity-0";

  return (
    <div className={`${baseStyle} ${errorMessageStyle}`}>
      {currentMessage && (
        <div className="animate-fade-in-up text-error-500 inline-flex grow-0 items-center space-x-1 text-xs">
          <span>{currentMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Error;
