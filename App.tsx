import { AuthProvider } from './src/core/context/AuthContext';
import AppEntry from './src/navigation/AppEntry';

const App = () => {
  return (
    <AuthProvider>
      <AppEntry />
    </AuthProvider>
  );
}

export default App;