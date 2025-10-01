'use client';
import { TextField } from '@mui/material/TextField';
import { useDebounce } from '@/hooks';
import { useState, useEffect } from 'react';

export default function SearchField({ 
  onSearch, 
  placeholder = "Search...", 
  delay = 300,
  sx = {} 
}) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, delay);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <TextField
      fullWidth
      label={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ maxWidth: { xs: '100%', sm: 400 }, ...sx }}
    />
  );
}