import ResultsScreen from '../ResultsScreen';

export default function ResultsScreenExample() {
  // Mock successful verification data
  const mockData = {
    passportVerified: true,
    boardingPassVerified: true,
    faceMatchScore: 92,
    passportInfo: {
      name: "JOHN DOE",
      passportNumber: "H1234567",
      nationality: "INDIA",
      expiry: "15-08-2032"
    }
  };

  return (
    <ResultsScreen
      data={mockData}
      onComplete={() => console.log('Check-in completed')}
      onRetry={() => console.log('Retry verification')}
    />
  );
}
