import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuthNavigation = (targetPath) => {
  const navigate = useNavigate();
  const { profile, loading, error } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (!loading) {
      if (error || !profile) {
        navigate('/login');
      } else if (targetPath) {
        navigate(targetPath);
      }
    }
  }, [loading, error, profile, navigate, targetPath]);

  return { isAuthenticated: !!profile, loading };
};