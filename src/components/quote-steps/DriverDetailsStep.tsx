import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuoteData } from "../InsuranceQuote";

interface DriverDetailsStepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DriverDetailsStep({ data, updateData, onNext, onBack }: DriverDetailsStepProps) {
  const ages = Array.from({ length: 84 }, (_, i) => i + 16); // 16-99
  const licenseAges = Array.from({ length: 84 }, (_, i) => i + 16);

  const isValid = data.gender && data.age && data.licenseAge && data.hasAccidents !== undefined;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tell us about the main driver</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Gender</Label>
            <Select value={data.gender || ""} onValueChange={(value) => updateData({ gender: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Age</Label>
            <Select 
              value={data.age?.toString() || ""} 
              onValueChange={(value) => updateData({ age: parseInt(value) })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                {ages.map((age) => (
                  <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label>At what age did you get your driver's license?</Label>
            <Select 
              value={data.licenseAge?.toString() || ""} 
              onValueChange={(value) => updateData({ licenseAge: parseInt(value) })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select age when licensed" />
              </SelectTrigger>
              <SelectContent>
                {licenseAges.map((age) => (
                  <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label className="text-base font-medium">Have you had any accidents or incidents in the past 5 years?</Label>
            <RadioGroup 
              value={data.hasAccidents === true ? "yes" : data.hasAccidents === false ? "no" : ""} 
              onValueChange={(value) => updateData({ hasAccidents: value === "yes" })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="accidents-yes" />
                <Label htmlFor="accidents-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="accidents-no" />
                <Label htmlFor="accidents-no">No</Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-muted-foreground mt-2">
              This includes at-fault accidents, claims, and traffic violations
            </p>
          </div>
        </div>

        {data.age && data.licenseAge && data.age >= 16 && data.licenseAge >= 16 && (
          <div className="mt-4 bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Driving Experience</h4>
            <p className="text-sm text-muted-foreground">
              You have approximately {Math.max(0, data.age - data.licenseAge)} years of driving experience.
              {data.age - data.licenseAge < 2 && (
                <span className="text-warning"> Note: Inexperienced driver excess may apply.</span>
              )}
            </p>
          </div>
        )}
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