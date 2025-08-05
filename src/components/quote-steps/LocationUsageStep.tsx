import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuoteData } from "../InsuranceQuote";

interface LocationUsageStepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LocationUsageStep({ data, updateData, onNext, onBack }: LocationUsageStepProps) {
  const isValid = data.address && data.underFinance !== undefined && data.mainPurpose && data.businessRegistered !== undefined;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Location & Usage</h3>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="address">Where is your car usually kept overnight?</Label>
            <Input
              id="address"
              placeholder="Enter your full address"
              value={data.address || ""}
              onChange={(e) => updateData({ address: e.target.value })}
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              This helps us calculate accurate pricing for your area
            </p>
          </div>

          <div>
            <Label className="text-base font-medium">Is this car currently under finance?</Label>
            <RadioGroup 
              value={data.underFinance === true ? "yes" : data.underFinance === false ? "no" : ""} 
              onValueChange={(value) => updateData({ underFinance: value === "yes" })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="finance-yes" />
                <Label htmlFor="finance-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="finance-no" />
                <Label htmlFor="finance-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base font-medium">What is the main purpose of the car?</Label>
            <RadioGroup 
              value={data.mainPurpose || ""} 
              onValueChange={(value) => updateData({ mainPurpose: value as 'private' | 'business' })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="purpose-private" />
                <Label htmlFor="purpose-private">
                  <div>
                    <div className="font-medium">Private use</div>
                    <div className="text-sm text-muted-foreground">Personal day-to-day use</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="purpose-business" />
                <Label htmlFor="purpose-business">
                  <div>
                    <div className="font-medium">Business use</div>
                    <div className="text-sm text-muted-foreground">Used for business purposes and Input Tax Credit claimed</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base font-medium">Is the car registered under a business name?</Label>
            <RadioGroup 
              value={data.businessRegistered === true ? "yes" : data.businessRegistered === false ? "no" : ""} 
              onValueChange={(value) => updateData({ businessRegistered: value === "yes" })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="business-yes" />
                <Label htmlFor="business-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="business-no" />
                <Label htmlFor="business-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Next Step
        </Button>
      </div>
    </div>
  );
}