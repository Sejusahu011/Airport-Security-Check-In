import WelcomeScreen from '../WelcomeScreen';

export default function WelcomeScreenExample() {
  return (
    <WelcomeScreen
      onStartAutomatic={() => console.log('Automatic check-in started')}
      onStartManual={() => console.log('Manual check-in started')}
    />
  );
}
