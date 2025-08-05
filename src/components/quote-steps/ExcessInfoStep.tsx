import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Info } from "lucide-react";
import { QuoteData } from "../InsuranceQuote";

interface ExcessInfoStepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ExcessInfoStep({ data, updateData, onNext, onBack }: ExcessInfoStepProps) {
  const mainDriverAge = data.age || 25;
  const drivingExperience = data.age && data.licenseAge ? data.age - data.licenseAge : 5;
  const hasYoungDrivers = data.additionalDrivers?.some(d => d.age < 25) || false;
  const hasInexperiencedDrivers = data.additionalDrivers?.some(d => d.experience < 2) || drivingExperience < 2;

  const basicExcess = 500;
  const youngDriverExcess = 400;
  const inexperiencedDriverExcess = 400;
  const unlistedDriverExcess = 1600;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Understanding Your Excess</h3>
        <p className="text-muted-foreground mb-6">
          Your excess is the amount you pay towards any claim. Here's how it applies to your policy:
        </p>
        
        <div className="grid gap-4">
          {/* Basic Excess */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-primary" />
                Basic Excess
                <Badge variant="outline">${basicExcess}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This applies to all claims and is included in your premium calculation.
              </p>
            </CardContent>
          </Card>

          {/* Age-based Excess */}
          {(mainDriverAge < 25 || hasYoungDrivers) && (
            <Card className="border-warning/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Young Driver Excess
                  <Badge variant="secondary">${youngDriverExcess}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Additional excess for drivers under 25 years old:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• ${youngDriverExcess} if the driver is listed on your policy</li>
                  <li>• ${unlistedDriverExcess} if the driver is NOT listed on your policy</li>
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Inexperienced Driver Excess */}
          {hasInexperiencedDrivers && (
            <Card className="border-warning/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Inexperienced Driver Excess
                  <Badge variant="secondary">${inexperiencedDriverExcess}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Additional ${inexperiencedDriverExcess} excess applies to drivers with less than 2 years of driving experience.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Important Information */}
          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="w-5 h-5 text-muted-foreground" />
                Important to Know
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Multiple Excess Types</h4>
                <p className="text-sm text-muted-foreground">
                  If multiple excess types apply to a claim, they will be added together.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Unlisted Drivers</h4>
                <p className="text-sm text-muted-foreground">
                  If someone not listed on your policy has an accident, a higher excess of ${unlistedDriverExcess} applies.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Not At Fault Claims</h4>
                <p className="text-sm text-muted-foreground">
                  If you're not at fault and we can recover costs from the other party, you won't pay any excess.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Total Excess */}
          <Card className="border-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Your Estimated Excess</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Basic Excess:</span>
                  <span>${basicExcess}</span>
                </div>
                {mainDriverAge < 25 && (
                  <div className="flex justify-between text-sm">
                    <span>Young Driver (if listed):</span>
                    <span>+${youngDriverExcess}</span>
                  </div>
                )}
                {drivingExperience < 2 && (
                  <div className="flex justify-between text-sm">
                    <span>Inexperienced Driver:</span>
                    <span>+${inexperiencedDriverExcess}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between font-medium">
                  <span>Total Excess (main driver):</span>
                  <span>
                    ${basicExcess + 
                      (mainDriverAge < 25 ? youngDriverExcess : 0) + 
                      (drivingExperience < 2 ? inexperiencedDriverExcess : 0)
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Choose Your Cover
        </Button>
      </div>
    </div>
  );
}