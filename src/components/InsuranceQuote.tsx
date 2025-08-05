import React, { useState } from "react";
import { InsuranceChatbot } from "./InsuranceChatbot";
import { QuoteSummary } from "./quote-steps/QuoteSummary";

export type QuoteData = {
  // Car Details
  carYear?: string;
  carMake?: string;
  carModel?: string;
  bodyType?: string;
  registration?: string;
  useRegistration?: boolean;
  
  // Location & Usage
  address?: string;
  underFinance?: boolean;
  mainPurpose?: 'private' | 'business';
  businessRegistered?: boolean;
  
  // Cover Start
  coverStartDate?: Date;
  
  // Driver Details
  gender?: string;
  age?: number;
  licenseAge?: number;
  hasAccidents?: boolean;
  
  // Additional Drivers
  hasAdditionalDrivers?: boolean;
  additionalDrivers?: Array<{
    name: string;
    age: number;
    experience: number;
  }>;
  
  // Cover Type
  coverType?: 'comprehensive' | 'third-party' | 'third-party-fire' | 'complete-care';
};

export function InsuranceQuote() {
  const [quoteData, setQuoteData] = useState<QuoteData>({});
  const [showSummary, setShowSummary] = useState(false);

  const handleQuoteComplete = (data: QuoteData) => {
    setQuoteData(data);
    setShowSummary(true);
  };

  if (showSummary) {
    return <QuoteSummary quoteData={quoteData} onBack={() => setShowSummary(false)} />;
  }

  return <InsuranceChatbot onQuoteComplete={handleQuoteComplete} />;
}