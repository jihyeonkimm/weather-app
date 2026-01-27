import { WeatherPage } from '@/pages/weather/WeatherPage';
import { Sidebar } from '@/widgets/sidebar';

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <WeatherPage />
    </div>
  );
}

export default App;
