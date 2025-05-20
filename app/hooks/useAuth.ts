import { useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const [isLoading, setIsLoading] = useState(false); 


  return { isAuthenticated, isLoading };
} 