import DocumentUpload from '../DocumentUpload';

export default function DocumentUploadExample() {
  return (
    <DocumentUpload
      onComplete={(passport, boardingPass) => {
        console.log('Documents uploaded:', { passport, boardingPass });
      }}
      onBack={() => console.log('Back clicked')}
    />
  );
}
