import SearchIcon from '@/shared/assets/icons/icon-search.svg';
import districtsData from '@/shared/assets/data/korea_districts.json';
import { useMemo, useState } from 'react';
import { getCoordByLocation } from '@/shared/api';

interface SearchInputProps {
  onSelectLocation: (lat: number, lon: number, label: string) => void;
}

export const SearchInput = ({ onSelectLocation }: SearchInputProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);

  const showDropdown = (isOpen && keyword) || searchError;

  // 검색 기능
  const filteredResults = useMemo(() => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return [];

    return districtsData.filter((district) =>
      district.includes(trimmedKeyword),
    );
  }, [keyword]);

  // 검색 결과 선택
  const handleSelectLocation = async (address: string) => {
    try {
      const coord = await getCoordByLocation(address);

      const label = address.includes('-')
        ? address.split('-').pop() || address
        : address;

      onSelectLocation(coord.lat, coord.lon, label);
      setSearchError(false);
      setIsOpen(false);
    } catch (error) {
      console.error('위치 선택 중 오류 발생:', error);
      setSearchError(true);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center rounded border border-gray-200 px-6 py-2">
        <div className="md:w-24 md:h-24 w-20 h-20">
          <img src={SearchIcon} alt="search icon" />
        </div>
        <input
          type="text"
          id="search-input"
          name="search-input"
          placeholder="지역을 입력해주세요. (예: 종로구)"
          value={keyword}
          className="md:w-200 w-180 md:px-6 px-0 py-6 md:text-sm text-xs placeholder:text-sm focus-visible:outline-0"
          onChange={(e) => {
            setKeyword(e.target.value);
            setSearchError(false);
            setIsOpen(true);
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
        />
      </div>

      {showDropdown && (
        <div className="absolute z-10 top-40 right-0 min-w-300 max-h-300 overflow-auto rounded bg-white shadow-md border border-gray-200">
          <ul className="flex flex-col gap-4 p-4">
            {searchError ? (
              <li className="text-sm">해당 장소의 정보가 제공되지 않습니다.</li>
            ) : (
              <>
                {/* 상황 2: 검색 결과가 있을 때 */}
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, index) => (
                    <li
                      key={index}
                      className="text-sm hover:bg-blue-50 rounded p-2"
                    >
                      <button
                        type="button"
                        className="w-full text-left cursor-pointer"
                        onMouseDown={() => handleSelectLocation(result)}
                      >
                        {result.replace(/-/g, ' ')}
                      </button>
                    </li>
                  ))
                ) : (
                  // 상황 3: 검색 키워드와 일치하는 데이터가 없을 때
                  <li className="text-sm">
                    해당 장소의 정보가 제공되지 않습니다.
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
