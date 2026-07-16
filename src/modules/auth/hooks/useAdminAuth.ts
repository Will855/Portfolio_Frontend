/**
 * @file useAdminAuth.ts
 * @description Hook de autenticación para el panel de administración.
 * Gestiona sesión de Supabase Auth, login, registro y cierre de sesión.
 * Solo usuarios cuyo email está en la tabla `admin_emails` pueden acceder al admin.
 */
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { User, Session } from '@supabase/supabase-js';

/**
 * Hook que proporciona estado de autenticación y métodos para iniciar/cerrar sesión en el admin.
 * Suscribe a cambios de sesión con onAuthStateChange y expone user, session y loading.
 * @returns Objeto con user, session, loading, signIn, signOut e isConfigured
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
    }).catch(() => {
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
   * Cierra la sesión actual del usuario.
   */
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  /**
   * Envía un correo de recuperación de contraseña con código OTP.
   */
  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  };

  /**
   * Verifica el código OTP de recuperación.
   * Si es exitoso, Supabase inicia una sesión automáticamente.
   */
  const verifyRecoveryOtp = async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'recovery',
    });
    return { data, error };
  };

  /**
   * Actualiza la contraseña del usuario (se debe llamar después de haber recuperado la sesión vía OTP).
   */
  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    return { data, error };
  };

  return { user, session, loading, signIn, signOut, resetPassword, verifyRecoveryOtp, updatePassword, isConfigured: isSupabaseConfigured };
}
