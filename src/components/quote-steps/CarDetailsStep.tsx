import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuoteData } from "../InsuranceQuote";

interface CarDetailsStepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
}

const carYears = Array.from({ length: 26 }, (_, i) => (2025 - i).toString());
const carMakes = [
  "Toyota", "Ford", "Hyundai", "Mazda", "Nissan", "Subaru", "BMW", "Mercedes-Benz", 
  "Audi", "Volkswagen", "Kia", "Mitsubishi", "Honda", "Jeep", "Isuzu", "Other"
];
const bodyTypes = ["Hatchback", "Sedan", "Station Wagon", "SUV", "Ute", "Coupe", "Convertible", "Van"];

export function CarDetailsStep({ data, updateData, onNext }: CarDetailsStepProps) {
  const [useRegistration, setUseRegistration] = useState(data.useRegistration || false);

  const handleNext = () => {
    if (useRegistration && data.registration) {
      updateData({ useRegistration: true });
      onNext();
    } else if (!useRegistration && data.carYear && data.carMake && data.carModel && data.bodyType) {
      updateData({ useRegistration: false });
      onNext();
    }
  };

  const isValid = useRegistration 
    ? !!data.registration 
    : !!(data.carYear && data.carMake && data.carModel && data.bodyType);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tell us about your car</h3>
        
        <RadioGroup 
          value={useRegistration ? "registration" : "manual"} 
          onValueChange={(value) => setUseRegistration(value === "registration")}
          className="mb-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="manual" id="manual" />
            <Label htmlFor="manual">Enter car details manually</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="registration" id="registration" />
            <Label htmlFor="registration">Search by registration number</Label>
          </div>
        </RadioGroup>

        {useRegistration ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                placeholder="e.g. ABC123"
                value={data.registration || ""}
                onChange={(e) => updateData({ registration: e.target.value.toUpperCase() })}
                className="mt-1"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Year of Manufacture</Label>
              <Select value={data.carYear || ""} onValueChange={(value) => updateData({ carYear: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {carYears.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="make">Make</Label>
              <Select value={data.carMake || ""} onValueChange={(value) => updateData({ carMake: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {carMakes.map((make) => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                placeholder="e.g. Camry, Focus"
                value={data.carModel || ""}
                onChange={(e) => updateData({ carModel: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bodyType">Body Type</Label>
              <Select value={data.bodyType || ""} onValueChange={(value) => updateData({ bodyType: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  {bodyTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={!isValid}>
          Next Step
        </Button>
      </div>
    </div>
  );
}