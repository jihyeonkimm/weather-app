import { WeatherPage } from '@/pages/weather/WeatherPage';
import { Sidebar } from '@/widgets/sidebar';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
    label: string;
  } | null>(null);

  // 검색결과에서 지역 선택
  const handleSelectLocation = (lat: number, lon: number, label: string) => {
    setSelectedLocation({ lat, lon, label });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onSelectLocation={handleSelectLocation}
      />
      <main
        className={`w-full transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-200 md:w-[calc(100%-200px)]' : 'ml-0'
        }`}
      >
        <WeatherPage
          selectedLocation={selectedLocation}
          onSelectLocation={handleSelectLocation}
        />
      </main>
    </div>
  );
}

export default App;
