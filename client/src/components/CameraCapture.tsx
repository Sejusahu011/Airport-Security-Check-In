import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onBack?: () => void;
}

export default function CameraCapture({ onCapture, onBack }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      setPermissionGranted(true);
      setError(null);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError("Camera access denied. Please allow camera permissions to continue.");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleContinue = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-6 md:space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-semibold">Capture Your Selfie</h2>
            <p className="text-base text-muted-foreground">
              Position your face in the center and look directly at the camera
            </p>
          </div>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {!permissionGranted && !capturedImage && (
                  <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center gap-4 p-8">
                    <Camera className="w-16 h-16 text-muted-foreground" />
                    <div className="text-center space-y-2">
                      <p className="font-medium">Camera Access Required</p>
                      <p className="text-sm text-muted-foreground">
                        We need access to your camera to capture your selfie
                      </p>
                    </div>
                    <Button
                      onClick={startCamera}
                      data-testid="button-enable-camera"
                    >
                      Enable Camera
                    </Button>
                  </div>
                )}

                {permissionGranted && !capturedImage && (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full aspect-video rounded-md bg-black"
                      data-testid="video-camera-preview"
                    />
                    <div className="absolute inset-0 border-2 border-primary/30 rounded-md pointer-events-none">
                      <div className="absolute inset-[20%] border-2 border-primary/50 rounded-full" />
                    </div>
                  </div>
                )}

                {capturedImage && (
                  <div className="relative">
                    <img
                      src={capturedImage}
                      alt="Captured selfie"
                      className="w-full aspect-video rounded-md object-cover"
                      data-testid="img-captured-selfie"
                    />
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />

                {permissionGranted && !capturedImage && (
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={capturePhoto}
                    data-testid="button-capture-photo"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Capture Photo
                  </Button>
                )}

                {capturedImage && (
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={retakePhoto}
                      data-testid="button-retake-photo"
                    >
                      Retake Photo
                    </Button>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleContinue}
                      data-testid="button-continue-verification"
                    >
                      Continue to Verification
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex">
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
          </div>
        </div>
      </div>
    </div>
  );
}
