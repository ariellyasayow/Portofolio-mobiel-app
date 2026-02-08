import { Redirect } from 'expo-router';

const Index = () => {
  // Langsung lempar user ke halaman Profile di dalam folder (tabs)
  return <Redirect href="/(tabs)/myProfile" />;
};

export default Index;