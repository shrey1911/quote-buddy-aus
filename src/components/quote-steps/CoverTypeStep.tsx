import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, Car, Flame, Star, Check } from "lucide-react";
import { QuoteData } from "../InsuranceQuote";

interface CoverTypeStepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const coverOptions = [
  {
    id: "comprehensive",
    name: "Comprehensive",
    icon: Shield,
    price: "$85-120",
    color: "primary",
    popular: true,
    features: [
      "Covers damage to your car and others",
      "Theft and attempted theft",
      "Weather damage (storm, hail, flood)",
      "Fire and vandalism",
      "Windscreen cover with no excess",
      "Rental car while yours is being repaired",
      "Personal items cover up to $1,000",
      "Emergency accommodation and transport"
    ]
  },
  {
    id: "third-party-fire",
    name: "Third Party Fire & Theft",
    icon: Flame,
    price: "$45-65",
    color: "warning",
    features: [
      "Covers damage to other people's property",
      "Fire damage to your car",
      "Theft of your car",
      "Attempted theft damage",
      "Third party property damage",
      "Legal liability cover"
    ]
  },
  {
    id: "third-party",
    name: "Third Party Property",
    icon: Car,
    price: "$35-50",
    color: "secondary",
    features: [
      "Covers damage to other people's property",
      "Legal liability cover",
      "Court costs and legal expenses",
      "Uninsured motorist extension"
    ]
  },
  {
    id: "complete-care",
    name: "Complete Care®",
    icon: Star,
    price: "$95-140",
    color: "accent",
    premium: true,
    features: [
      "Everything in Comprehensive PLUS:",
      "New car replacement (cars under 2 years)",
      "Choice of repairer guarantee",
      "Lifetime guarantee on repairs",
      "No claim bonus protection",
      "Keys and locks cover up to $2,000",
      "Enhanced rental car benefits",
      "Guaranteed agreed value option"
    ]
  }
];

export function CoverTypeStep({ data, updateData, onNext, onBack }: CoverTypeStepProps) {
  const isValid = !!data.coverType;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Your Cover Level</h3>
        <p className="text-muted-foreground mb-6">
          Select the level of protection that's right for you. Prices shown are weekly estimates.
        </p>
        
        <RadioGroup 
          value={data.coverType || ""} 
          onValueChange={(value) => updateData({ coverType: value as any })}
          className="space-y-4"
        >
          {coverOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = data.coverType === option.id;
            
            return (
              <div key={option.id} className="relative">
                <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                <Label htmlFor={option.id} className="cursor-pointer">
                  <Card className={`transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-6 h-6 text-${option.color}`} />
                          <div>
                            <CardTitle className="text-lg">{option.name}</CardTitle>
                            {option.popular && (
                              <Badge variant="default" className="mt-1">Most Popular</Badge>
                            )}
                            {option.premium && (
                              <Badge variant="secondary" className="mt-1">Premium</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{option.price}</div>
                          <div className="text-sm text-muted-foreground">per week</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        {option.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span className={`text-sm ${
                              feature.includes('PLUS:') ? 'font-medium' : ''
                            }`}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {data.coverType && (
          <Card className="mt-6 bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">What happens next?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We'll calculate your personalized quote</li>
                <li>• You can review and adjust your cover options</li>
                <li>• Complete your application online in minutes</li>
                <li>• Your policy documents will be emailed to you</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Get My Quote
        </Button>
      </div>
    </div>
  );
}