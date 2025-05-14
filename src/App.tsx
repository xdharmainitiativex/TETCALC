import { useState } from 'react';
import { Calculator } from './components/Calculator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [activePage, setActivePage] = useState('calculator');

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950 transition-colors duration-300">
        <Header activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {activePage === 'calculator' && <Calculator />}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;