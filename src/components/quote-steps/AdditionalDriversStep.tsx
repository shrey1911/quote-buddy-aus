import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { QuoteData } from "../InsuranceQuote";

interface AdditionalDriversStepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AdditionalDriversStep({ data, updateData, onNext, onBack }: AdditionalDriversStepProps) {
  const [drivers, setDrivers] = useState(data.additionalDrivers || []);

  const addDriver = () => {
    const newDrivers = [...drivers, { name: "", age: 16, experience: 0 }];
    setDrivers(newDrivers);
    updateData({ additionalDrivers: newDrivers });
  };

  const removeDriver = (index: number) => {
    const newDrivers = drivers.filter((_, i) => i !== index);
    setDrivers(newDrivers);
    updateData({ additionalDrivers: newDrivers });
  };

  const updateDriver = (index: number, field: string, value: string | number) => {
    const newDrivers = [...drivers];
    newDrivers[index] = { ...newDrivers[index], [field]: value };
    setDrivers(newDrivers);
    updateData({ additionalDrivers: newDrivers });
  };

  const handleHasDriversChange = (hasDrivers: boolean) => {
    updateData({ hasAdditionalDrivers: hasDrivers });
    if (!hasDrivers) {
      setDrivers([]);
      updateData({ additionalDrivers: [] });
    }
  };

  const isValid = data.hasAdditionalDrivers !== undefined && 
    (!data.hasAdditionalDrivers || (drivers.length > 0 && drivers.every(d => d.name && d.age >= 16)));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Drivers</h3>
        
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Would you like to list additional drivers?</Label>
            <RadioGroup 
              value={data.hasAdditionalDrivers === true ? "yes" : data.hasAdditionalDrivers === false ? "no" : ""} 
              onValueChange={(value) => handleHasDriversChange(value === "yes")}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="drivers-yes" />
                <Label htmlFor="drivers-yes">Yes, add additional drivers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="drivers-no" />
                <Label htmlFor="drivers-no">No, just the main driver</Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-muted-foreground mt-2">
              Additional drivers are people who regularly drive this car
            </p>
          </div>

          {data.hasAdditionalDrivers && (
            <div className="space-y-4">
              {drivers.map((driver, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Driver {index + 1}</h4>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeDriver(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          placeholder="Enter full name"
                          value={driver.name}
                          onChange={(e) => updateDriver(index, "name", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label>Age</Label>
                        <Input
                          type="number"
                          min="16"
                          max="99"
                          placeholder="Age"
                          value={driver.age}
                          onChange={(e) => updateDriver(index, "age", parseInt(e.target.value) || 16)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label>Years of Experience</Label>
                        <Input
                          type="number"
                          min="0"
                          max="80"
                          placeholder="Years driving"
                          value={driver.experience}
                          onChange={(e) => updateDriver(index, "experience", parseInt(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button onClick={addDriver} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Another Driver
              </Button>
            </div>
          )}

          {data.hasAdditionalDrivers && drivers.some(d => d.age < 25) && (
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
              <h4 className="font-medium text-warning-foreground mb-2">Young Driver Notice</h4>
              <p className="text-sm text-warning-foreground/80">
                Additional excess applies for drivers under 25 years old.
              </p>
            </div>
          )}
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