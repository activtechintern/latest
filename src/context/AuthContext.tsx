import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Session,
  User,
} from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  signup: (email: string, password: string, metadata?: any) => Promise<{ error: Error | null, user: User | null }>;
  logout: () => Promise<void>;
  loading: boolean;
  setUserMetadata: (metadata: any) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (email: string, password: string, metadata?: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => ({ error: null }),
  signup: async () => ({ error: null, user: null }),
  logout: async () => { },
  loading: false,
  setUserMetadata: () => { },
  isAuthenticated: false,
  isLoading: false,
  register: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error.message);
        return { error };
      }
      
      console.log("Login successful:", data?.user?.email);
      setUser(data?.user ?? null);
      return { error: null };
    } catch (error) {
      console.error("Unexpected login error:", error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, metadata?: any) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
          },
        },
      });
      return { error, user: data.user };
    } finally {
      setLoading(false);
    }
  };

  // Create an alias for signup to be used as register
  const register = async (email: string, password: string, metadata?: any) => {
    const { error } = await signup(email, password, metadata);
    return !error;
  };

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const setUserMetadata = (metadata: any) => {
    if (user) {
      setUser({
        ...user,
        user_metadata: {
          ...user.user_metadata,
          ...metadata
        }
      });
    }
  };

  // Add computed property for isAuthenticated
  const isAuthenticated = !!user;

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    setUserMetadata,
    isAuthenticated,
    isLoading: loading,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
