import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      
      // If a user is logged in but their email doesn't match the admin email
      if (currentUser && adminEmail && currentUser.email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
        firebaseSignOut(auth).then(() => {
          setUser(null);
          setLoading(false);
          alert("Unauthorized access. You are not authorized to view the admin dashboard.");
        });
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      
      if (adminEmail && result.user.email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
        await firebaseSignOut(auth);
        throw new Error('Unauthorized');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  }, []);

  return { user, loading, signIn, signOut };
}
