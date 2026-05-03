import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search courses...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      // Mock suggestions - replace with actual search API
      setSuggestions([
        `${value} - Mathematics`,
        `${value} - Science`,
        `${value} - History`,
      ]);
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setSuggestions([]);
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSearch(suggestion.split(' - ')[0])}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}