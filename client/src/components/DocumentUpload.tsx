import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentUploadProps {
  onComplete: (passportFile: File | null, boardingPassFile: File | null) => void;
  onBack?: () => void;
}

export default function DocumentUpload({ onComplete, onBack }: DocumentUploadProps) {
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [boardingPassFile, setBoardingPassFile] = useState<File | null>(null);
  const [boardingPassPreview, setBoardingPassPreview] = useState<string | null>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "passport" | "boarding-pass"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === "passport") {
          setPassportFile(file);
          setPassportPreview(result);
        } else {
          setBoardingPassFile(file);
          setBoardingPassPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    onComplete(passportFile, boardingPassFile);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-6 md:space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-semibold">Upload Your Documents</h2>
            <p className="text-base text-muted-foreground">
              Please upload clear images of your passport and boarding pass
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card data-testid="card-passport-upload">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5" />
                  Passport
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!passportPreview ? (
                  <label
                    htmlFor="passport-upload"
                    className={cn(
                      "min-h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors hover-elevate",
                      "border-border hover:border-primary"
                    )}
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <div className="text-center">
                      <p className="font-medium">Upload Passport</p>
                      <p className="text-sm text-muted-foreground">
                        Click to browse
                      </p>
                    </div>
                    <input
                      id="passport-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "passport")}
                      data-testid="input-passport-upload"
                    />
                  </label>
                ) : (
                  <div className="space-y-3">
                    <img
                      src={passportPreview}
                      alt="Passport preview"
                      className="w-full max-h-64 object-contain rounded-md border border-border"
                      data-testid="img-passport-preview"
                    />
                    <p className="text-sm text-muted-foreground truncate">
                      {passportFile?.name}
                    </p>
                    <label htmlFor="passport-reupload">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => document.getElementById("passport-reupload")?.click()}
                        data-testid="button-reupload-passport"
                      >
                        Re-upload
                      </Button>
                      <input
                        id="passport-reupload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "passport")}
                      />
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card data-testid="card-boarding-pass-upload">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Plane className="w-5 h-5" />
                  Boarding Pass
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!boardingPassPreview ? (
                  <label
                    htmlFor="boarding-pass-upload"
                    className={cn(
                      "min-h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors hover-elevate",
                      "border-border hover:border-primary"
                    )}
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <div className="text-center">
                      <p className="font-medium">Upload Boarding Pass</p>
                      <p className="text-sm text-muted-foreground">
                        Click to browse
                      </p>
                    </div>
                    <input
                      id="boarding-pass-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "boarding-pass")}
                      data-testid="input-boarding-pass-upload"
                    />
                  </label>
                ) : (
                  <div className="space-y-3">
                    <img
                      src={boardingPassPreview}
                      alt="Boarding pass preview"
                      className="w-full max-h-64 object-contain rounded-md border border-border"
                      data-testid="img-boarding-pass-preview"
                    />
                    <p className="text-sm text-muted-foreground truncate">
                      {boardingPassFile?.name}
                    </p>
                    <label htmlFor="boarding-pass-reupload">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => document.getElementById("boarding-pass-reupload")?.click()}
                        data-testid="button-reupload-boarding-pass"
                      >
                        Re-upload
                      </Button>
                      <input
                        id="boarding-pass-reupload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "boarding-pass")}
                      />
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 justify-between">
            {onBack && (
              <Button
                variant="outline"
                size="lg"
                onClick={onBack}
                data-testid="button-back"
              >
                Back
              </Button>
            )}
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!passportFile || !boardingPassFile}
              className="ml-auto px-8"
              data-testid="button-continue"
            >
              Continue to Selfie
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
