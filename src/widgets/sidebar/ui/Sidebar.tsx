export const Sidebar = () => {
  const favoriteCities = ['서울', '부산', '대구', '인천', '광주'];
  return (
    <aside className="sticky top-0 min-h-screen h-full w-200 border-r border-gray-200 px-10 py-20">
      <h2 className="text-xs text-gray-700">즐겨찾기</h2>
      <ul>
        {favoriteCities.map((city) => (
          <li
            key={city}
            className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors text-gray-700 font-medium"
          >
            📍 {city}
          </li>
        ))}
        {favoriteCities.length === 0 && (
          <p className="text-sm text-gray-400">즐겨찾기가 없습니다.</p>
        )}
      </ul>
    </aside>
  );
};
