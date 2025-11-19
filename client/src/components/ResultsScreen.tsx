import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, FileText, Plane, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationData {
  passportVerified: boolean;
  boardingPassVerified: boolean;
  faceMatchScore: number;
  passportInfo: {
    name: string;
    passportNumber: string;
    nationality: string;
    expiry: string;
  };
}

interface ResultsScreenProps {
  data: VerificationData;
  onComplete: () => void;
  onRetry?: () => void;
}

export default function ResultsScreen({ data, onComplete, onRetry }: ResultsScreenProps) {
  const isVerified = data.faceMatchScore >= 80;
  const kycScore = Math.floor(
    (data.passportVerified ? 33 : 0) +
    (data.boardingPassVerified ? 33 : 0) +
    (isVerified ? 34 : 0)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-6 md:space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              {isVerified ? (
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600" data-testid="icon-verification-success" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-destructive" data-testid="icon-verification-failed" />
                </div>
              )}
            </div>
            <h2 className="text-2xl md:text-4xl font-semibold">
              {isVerified ? "Verification Successful" : "Verification Failed"}
            </h2>
            <p className="text-base text-muted-foreground">
              {isVerified
                ? "All checks passed. You are cleared for security check."
                : "Face verification did not meet the required threshold."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={cn(data.passportVerified && "border-green-500/50")}>
              <CardContent className="pt-6 text-center space-y-2">
                <FileText className={cn(
                  "w-8 h-8 mx-auto",
                  data.passportVerified ? "text-green-600" : "text-muted-foreground"
                )} />
                <p className="font-semibold">Passport</p>
                <p className={cn(
                  "text-sm flex items-center justify-center gap-1",
                  data.passportVerified ? "text-green-600" : "text-destructive"
                )}>
                  {data.passportVerified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Failed
                    </>
                  )}
                </p>
              </CardContent>
            </Card>

            <Card className={cn(data.boardingPassVerified && "border-green-500/50")}>
              <CardContent className="pt-6 text-center space-y-2">
                <Plane className={cn(
                  "w-8 h-8 mx-auto",
                  data.boardingPassVerified ? "text-green-600" : "text-muted-foreground"
                )} />
                <p className="font-semibold">Boarding Pass</p>
                <p className={cn(
                  "text-sm flex items-center justify-center gap-1",
                  data.boardingPassVerified ? "text-green-600" : "text-destructive"
                )}>
                  {data.boardingPassVerified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Failed
                    </>
                  )}
                </p>
              </CardContent>
            </Card>

            <Card className={cn(isVerified && "border-green-500/50")}>
              <CardContent className="pt-6 text-center space-y-2">
                <User className={cn(
                  "w-8 h-8 mx-auto",
                  isVerified ? "text-green-600" : "text-muted-foreground"
                )} />
                <p className="font-semibold">Face Match</p>
                <p className={cn(
                  "text-sm flex items-center justify-center gap-1",
                  isVerified ? "text-green-600" : "text-destructive"
                )}>
                  {isVerified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      {data.faceMatchScore}%
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      {data.faceMatchScore}%
                    </>
                  )}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Extracted Passport Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Name
                  </p>
                  <p className="text-base" data-testid="text-passport-name">
                    {data.passportInfo.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Passport Number
                  </p>
                  <p className="text-base" data-testid="text-passport-number">
                    {data.passportInfo.passportNumber}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Nationality
                  </p>
                  <p className="text-base" data-testid="text-passport-nationality">
                    {data.passportInfo.nationality}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Expiry Date
                  </p>
                  <p className="text-base" data-testid="text-passport-expiry">
                    {data.passportInfo.expiry}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "border-2",
            isVerified ? "border-green-500/50 bg-green-500/5" : "border-destructive/50 bg-destructive/5"
          )}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Shield className={cn(
                      "w-6 h-6",
                      isVerified ? "text-green-600" : "text-destructive"
                    )} />
                    <p className="font-semibold text-lg">KYC Score</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isVerified ? "CLEAR FOR SECURITY CHECK" : "SECURITY ALERT"}
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-5xl font-bold",
                    isVerified ? "text-green-600" : "text-destructive"
                  )} data-testid="text-kyc-score">
                    {kycScore}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            {!isVerified && onRetry && (
              <Button
                variant="outline"
                size="lg"
                onClick={onRetry}
                data-testid="button-retry-verification"
              >
                Retry Verification
              </Button>
            )}
            <Button
              size="lg"
              onClick={onComplete}
              className="px-8"
              data-testid="button-complete-checkin"
            >
              {isVerified ? "Complete Check-In" : "Contact Support"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
