import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane } from "lucide-react";

interface WelcomeScreenProps {
  onStartAutomatic: () => void;
  onStartManual: () => void;
}

export default function WelcomeScreen({ onStartAutomatic, onStartManual }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Plane className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Airport Security Check-In
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Streamlined verification system for faster, more secure airport processing
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <Button
            size="lg"
            className="w-full h-auto py-4 text-lg font-semibold"
            onClick={onStartAutomatic}
            data-testid="button-start-automatic"
          >
            Start Automatic Check-In Prototype
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full h-auto py-4 text-lg font-semibold"
            onClick={onStartManual}
            data-testid="button-start-manual"
          >
            Start Manual Prototype
          </Button>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            Prototype Version 1.0 • Demo Only
          </p>
        </div>
      </div>
    </div>
  );
}
