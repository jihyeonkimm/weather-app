import { WeatherPage } from '@/pages/weather/WeatherPage';
import { Sidebar } from '@/widgets/sidebar';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`w-full transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-200 md:w-[calc(100%-200px)]' : 'ml-0'
        }`}
      >
        <WeatherPage />
      </div>
    </div>
  );
}

export default App;
