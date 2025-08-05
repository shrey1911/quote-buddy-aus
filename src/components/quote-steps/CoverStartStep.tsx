import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { QuoteData } from "../InsuranceQuote";

interface CoverStartStepProps {
  data: QuoteData;
  updateData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CoverStartStep({ data, updateData, onNext, onBack }: CoverStartStepProps) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 42); // 42 days from today

  const isValid = !!data.coverStartDate;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">When would you like your cover to start?</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Cover Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1",
                    !data.coverStartDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.coverStartDate ? format(data.coverStartDate, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.coverStartDate}
                  onSelect={(date) => updateData({ coverStartDate: date })}
                  disabled={(date) => date < today || date > maxDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <p className="text-sm text-muted-foreground mt-2">
              You can select any date within the next 42 days
            </p>
          </div>

          {data.coverStartDate && (
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Important Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Your cover will start at 4:00 PM on the selected date</li>
                <li>• Make sure you have current registration and roadworthy certificate</li>
                <li>• Any existing insurance should be cancelled to avoid double coverage</li>
              </ul>
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