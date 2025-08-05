import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Car, MapPin, Calendar, User, Users, Shield, FileText } from "lucide-react";
import { CarDetailsStep } from "./quote-steps/CarDetailsStep";
import { LocationUsageStep } from "./quote-steps/LocationUsageStep";
import { CoverStartStep } from "./quote-steps/CoverStartStep";
import { DriverDetailsStep } from "./quote-steps/DriverDetailsStep";
import { AdditionalDriversStep } from "./quote-steps/AdditionalDriversStep";
import { ExcessInfoStep } from "./quote-steps/ExcessInfoStep";
import { CoverTypeStep } from "./quote-steps/CoverTypeStep";
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

const steps = [
  { id: 1, title: "Car Details", icon: Car },
  { id: 2, title: "Location & Usage", icon: MapPin },
  { id: 3, title: "Cover Start", icon: Calendar },
  { id: 4, title: "Driver Details", icon: User },
  { id: 5, title: "Additional Drivers", icon: Users },
  { id: 6, title: "Excess Options", icon: Shield },
  { id: 7, title: "Choose Cover", icon: FileText },
];

export function InsuranceQuote() {
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteData, setQuoteData] = useState<QuoteData>({});
  const [showSummary, setShowSummary] = useState(false);

  const updateQuoteData = (data: Partial<QuoteData>) => {
    setQuoteData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  if (showSummary) {
    return <QuoteSummary quoteData={quoteData} onBack={() => setShowSummary(false)} />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CarDetailsStep data={quoteData} updateData={updateQuoteData} onNext={nextStep} />;
      case 2:
        return <LocationUsageStep data={quoteData} updateData={updateQuoteData} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <CoverStartStep data={quoteData} updateData={updateQuoteData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <DriverDetailsStep data={quoteData} updateData={updateQuoteData} onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <AdditionalDriversStep data={quoteData} updateData={updateQuoteData} onNext={nextStep} onBack={prevStep} />;
      case 6:
        return <ExcessInfoStep data={quoteData} updateData={updateQuoteData} onNext={nextStep} onBack={prevStep} />;
      case 7:
        return <CoverTypeStep data={quoteData} updateData={updateQuoteData} onNext={nextStep} onBack={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/80">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">Car Insurance Quote</h1>
          <p className="text-primary-foreground/80 text-lg">Get your personalized quote in just a few minutes</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Step {currentStep} of {steps.length}</h3>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="mb-4" />
              
              {/* Step indicators */}
              <div className="flex justify-between">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = step.id < currentStep;
                  const isCurrent = step.id === currentStep;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
                        ${isCompleted ? 'bg-success text-success-foreground' : 
                          isCurrent ? 'bg-primary text-primary-foreground' : 
                          'bg-muted text-muted-foreground'}
                      `}>
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span className={`text-xs text-center max-w-16 ${
                        isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Current Step */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6" })}
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStep()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}