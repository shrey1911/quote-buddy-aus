import React, { useState } from "react";
import { InsuranceChatbot } from "./InsuranceChatbot";
import { QuoteSummary } from "./quote-steps/QuoteSummary";

export function InsuranceQuote() {
  const [quoteData, setQuoteData] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const handleQuoteComplete = (data) => {
    setQuoteData(data);
    setShowSummary(true);
  };

  if (showSummary) {
    return <QuoteSummary quoteData={quoteData} onBack={() => setShowSummary(false)} />;
  }

  return <InsuranceChatbot onQuoteComplete={handleQuoteComplete} />;
}