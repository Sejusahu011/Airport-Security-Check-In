import CameraCapture from '../CameraCapture';

export default function CameraCaptureExample() {
  return (
    <CameraCapture
      onCapture={(imageData) => {
        console.log('Photo captured, data length:', imageData.length);
      }}
      onBack={() => console.log('Back clicked')}
    />
  );
}
