import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavigationGuard = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const previousPathRef = useRef(location.pathname);
  const isHandlingBackRef = useRef(false);

  const protectedRoutes = ['/lodgecomplaint', '/checkcomplaint', '/studentacc', '/staffacc', '/editstudent', '/editstaff'];

  useEffect(() => {
    if (!user || !protectedRoutes.includes(location.pathname)) {
      previousPathRef.current = location.pathname;
      return;
    }

    if (previousPathRef.current !== location.pathname) {
      window.history.pushState({ guarded: true }, '', location.pathname);
      previousPathRef.current = location.pathname;
    }

    const handlePopState = (e) => {
      if (isHandlingBackRef.current) {
        isHandlingBackRef.current = false;
        return;
      }

      const isOnProtectedRoute = protectedRoutes.includes(location.pathname);

      if (isOnProtectedRoute) {
        const confirmed = window.confirm(
          'Are you sure you want to go back? This will log you out of your account.'
        );

        if (!confirmed) {
          isHandlingBackRef.current = true;
          window.history.pushState({ guarded: true }, '', location.pathname);
          window.dispatchEvent(new PopStateEvent('popstate', { state: { guarded: true } }));
        } else {
          isHandlingBackRef.current = true;
          navigate('/', { replace: true });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [user, location.pathname, navigate]);

  return children;
};

export default NavigationGuard;

