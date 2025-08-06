import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Car, MapPin, Calendar, User, Shield, FileText, Sparkles } from "lucide-react";
import { format } from "date-fns";

export function QuoteSummary({ quoteData, onBack }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quoteGenerated, setQuoteGenerated] = useState(false);

  const generateQuote = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setQuoteGenerated(true);
  };

  const getCoverTypeName = (type) => {
    switch (type) {
      case "comprehensive": return "Comprehensive";
      case "third-party": return "Third Party Property";
      case "third-party-fire": return "Third Party Fire & Theft";
      case "complete-care": return "Complete Care®";
      default: return type;
    }
  };

  const getQuotePrice = (type) => {
    switch (type) {
      case "comprehensive": return { weekly: 89, annual: 4628 };
      case "third-party": return { weekly: 42, annual: 2184 };
      case "third-party-fire": return { weekly: 58, annual: 3016 };
      case "complete-care": return { weekly: 105, annual: 5460 };
      default: return { weekly: 89, annual: 4628 };
    }
  };

  const price = getQuotePrice(quoteData.coverType || "comprehensive");

  if (!quoteGenerated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/80">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary-foreground mb-2">Quote Summary</h1>
              <p className="text-primary-foreground/80 text-lg">Review your details before we generate your quote</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Car Details */}
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Vehicle Details</h4>
                    {quoteData.useRegistration ? (
                      <p className="text-sm text-muted-foreground">Registration: {quoteData.registration}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {quoteData.carYear} {quoteData.carMake} {quoteData.carModel} ({quoteData.bodyType})
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Location & Usage</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Address: {quoteData.address}</p>
                      <p>Purpose: {quoteData.mainPurpose === 'private' ? 'Private use' : 'Business use'}</p>
                      <p>Under finance: {quoteData.underFinance ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cover Start */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Cover Start Date</h4>
                    <p className="text-sm text-muted-foreground">
                      {quoteData.coverStartDate ? format(quoteData.coverStartDate, "PPP") : "Not specified"}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Driver Details */}
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Driver Information</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Age: {quoteData.age} years old</p>
                      <p>Licensed at age: {quoteData.licenseAge}</p>
                      <p>Recent accidents: {quoteData.hasAccidents ? 'Yes' : 'No'}</p>
                      {quoteData.hasAdditionalDrivers && quoteData.additionalDrivers && (
                        <p>Additional drivers: {quoteData.additionalDrivers.length}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cover Type */}
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Selected Cover</h4>
                    <p className="text-sm text-muted-foreground">
                      {getCoverTypeName(quoteData.coverType || "")}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={onBack}>
                    Back to Edit
                  </Button>
                  <Button onClick={generateQuote} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Generating Quote...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Generate My Quote
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Quote generated view
  return (
    <div className="min-h-screen bg-gradient-to-br from-success via-success to-success/80">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-success-foreground/20 p-4">
                <CheckCircle className="w-12 h-12 text-success-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-success-foreground mb-2">Your Quote is Ready!</h1>
            <p className="text-success-foreground/80 text-lg">Here's your personalized car insurance quote</p>
          </div>

          <div className="grid gap-6">
            {/* Main Quote Card */}
            <Card className="border-success shadow-xl">
              <CardHeader className="text-center bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-t-lg">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {getCoverTypeName(quoteData.coverType || "")}
                </CardTitle>
                <div className="text-4xl font-bold mt-2">${price.weekly}/week</div>
                <p className="text-primary-foreground/90">or ${price.annual} annually</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Quote valid for 30 days
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">What's Included:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>$500 Basic Excess</span>
                      </div>
                      {quoteData.coverType === "comprehensive" && (
                        <>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span>Windscreen cover (no excess)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span>Rental car included</span>
                          </div>
                        </>
                      )}
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>24/7 Claims support</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Your Vehicle:</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{quoteData.carYear} {quoteData.carMake} {quoteData.carModel}</p>
                      <p>Garaged at: {quoteData.address?.split(',')[0]}</p>
                      <p>Main driver: {quoteData.age} years old</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <FileText className="w-4 h-4 mr-2" />
                Buy This Policy Now
              </Button>
              <Button size="lg" variant="outline">
                Email This Quote
              </Button>
              <Button size="lg" variant="outline" onClick={onBack}>
                Modify Quote
              </Button>
            </div>

            {/* Additional Info */}
            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our friendly team is here to help you with your quote
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                  <span>📞 Call: 13 15 20</span>
                  <span>💬 Live Chat Available</span>
                  <span>📧 Email: quotes@insurance.com.au</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}