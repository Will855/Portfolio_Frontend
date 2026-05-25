/**
 * @file useAdminAuth.ts
 * @description Hook de autenticación para el panel de administración.
 * Gestiona sesión de Supabase Auth, login, registro y cierre de sesión.
 * Solo usuarios cuyo email está en la tabla `admin_emails` pueden acceder al admin.
 */
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import type { User, Session } from '@supabase/supabase-js';

/**
 * Hook que proporciona estado de autenticación y métodos para iniciar/cerrar sesión en el admin.
 * Suscribe a cambios de sesión con onAuthStateChange y expone user, session y loading.
 * @returns Objeto con user, session, loading, signIn, signUp, signOut e isConfigured
 * @example
 * const { user, loading, signIn, signOut, isConfigured } = useAdminAuth();
 * if (!isConfigured) return <SetupMessage />;
 * if (!user) return <LoginForm onSubmit={signIn} />;
 * return <AdminPanel />;
 */
export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  /**
   * Inicia sesión con email y contraseña.
   * @param email - Correo del usuario
   * @param password - Contraseña
   * @returns Resultado de signInWithPassword de Supabase
   */
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  /**
   * Registra un nuevo usuario. El acceso al admin requiere que el email esté en admin_emails.
   * @param email - Correo del usuario
   * @param password - Contraseña (mínimo 6 caracteres según Supabase)
   * @returns Resultado de signUp de Supabase
   */
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error };
  };

  /**
   * Cierra la sesión actual del usuario.
   */
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, session, loading, signIn, signUp, signOut, isConfigured: isSupabaseConfigured };
}
