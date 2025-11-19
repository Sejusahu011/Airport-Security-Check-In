import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import ProgressIndicator from "@/components/ProgressIndicator";
import DocumentUpload from "@/components/DocumentUpload";
import CameraCapture from "@/components/CameraCapture";
import ResultsScreen from "@/components/ResultsScreen";

type CheckInMode = "automatic" | "manual" | null;
type Step = "welcome" | "documents" | "selfie" | "verification" | "results";

export default function CheckInFlow() {
  const [mode, setMode] = useState<CheckInMode>(null);
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [boardingPassFile, setBoardingPassFile] = useState<File | null>(null);
  const [selfieData, setSelfieData] = useState<string | null>(null);
  const [verificationData, setVerificationData] = useState<any>(null);

  const handleStartAutomatic = () => {
    setMode("automatic");
    setCurrentStep("documents");
  };

  const handleStartManual = () => {
    setMode("manual");
    setCurrentStep("documents");
  };

  const handleDocumentsComplete = (passport: File | null, boardingPass: File | null) => {
    setPassportFile(passport);
    setBoardingPassFile(boardingPass);
    setCurrentStep("selfie");
  };

  const handleSelfieCapture = (imageData: string) => {
    setSelfieData(imageData);
    setCurrentStep("verification");
    
    // Simulate verification process
    setTimeout(() => {
      // Simulate OCR and face matching
      const faceMatchScore = Math.floor(Math.random() * (98 - 85 + 1)) + 85;
      
      setVerificationData({
        passportVerified: true,
        boardingPassVerified: true,
        faceMatchScore,
        passportInfo: {
          name: "JOHN DOE",
          passportNumber: "H1234567",
          nationality: "INDIA",
          expiry: "15-08-2032"
        }
      });
      setCurrentStep("results");
    }, 2000);
  };

  const handleComplete = () => {
    // Reset to welcome screen
    setMode(null);
    setCurrentStep("welcome");
    setPassportFile(null);
    setBoardingPassFile(null);
    setSelfieData(null);
    setVerificationData(null);
  };

  const handleRetry = () => {
    setCurrentStep("documents");
    setPassportFile(null);
    setBoardingPassFile(null);
    setSelfieData(null);
    setVerificationData(null);
  };

  const handleBack = () => {
    if (currentStep === "documents") {
      setCurrentStep("welcome");
      setMode(null);
    } else if (currentStep === "selfie") {
      setCurrentStep("documents");
    }
  };

  const getStepNumber = (): number => {
    switch (currentStep) {
      case "welcome":
        return 0;
      case "documents":
        return 1;
      case "selfie":
        return 2;
      case "verification":
        return 3;
      case "results":
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen">
      {currentStep !== "welcome" && <ProgressIndicator currentStep={getStepNumber()} />}
      
      {currentStep === "welcome" && (
        <WelcomeScreen
          onStartAutomatic={handleStartAutomatic}
          onStartManual={handleStartManual}
        />
      )}

      {currentStep === "documents" && (
        <DocumentUpload
          onComplete={handleDocumentsComplete}
          onBack={handleBack}
        />
      )}

      {currentStep === "selfie" && (
        <CameraCapture
          onCapture={handleSelfieCapture}
          onBack={handleBack}
        />
      )}

      {currentStep === "verification" && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xl font-semibold">Verifying Your Information...</p>
            <p className="text-muted-foreground">Please wait while we process your documents</p>
          </div>
        </div>
      )}

      {currentStep === "results" && verificationData && (
        <ResultsScreen
          data={verificationData}
          onComplete={handleComplete}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
