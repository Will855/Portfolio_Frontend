import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { testSupabaseConnection, type ConnectionTestResult } from '../../../core/utils/testSupabaseConnection';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [dbTest, setDbTest] = useState<ConnectionTestResult | null>(null);
  const { user, loading: authLoading, signIn, resetPassword, verifyRecoveryOtp, isConfigured } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConfigured) return;
    testSupabaseConnection().then(setDbTest);
  }, [isConfigured]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    setError('');
    setMessage('');
    setLoading(true);
    const { error: err } = await resetPassword(email);
    setLoading(false);
    if (err) {
      setError(err.message ?? 'Error al reenviar el correo');
    } else {
      setMessage('Nuevo código enviado a tu correo.');
      setResendCooldown(60);
    }
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 p-4">
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 max-w-sm text-center">
          <p className="text-slate-300">Supabase no está configurado. Añade <code className="text-blue-400">VITE_SUPABASE_URL</code> y <code className="text-blue-400">VITE_SUPABASE_ANON_KEY</code> en .env</p>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span>Cargando...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (isVerifyingOtp) {
      const { error: err } = await verifyRecoveryOtp(email.trim(), otp.trim());
      setLoading(false);
      if (err) {
        setError(err.message ?? 'Código incorrecto o expirado.');
      } else {
        // Al verificar exitosamente, Supabase inicia la sesión.
        navigate('/admin/update-password', { replace: true });
      }
      return;
    }

    if (isRecovering) {
      const { error: err } = await resetPassword(email);
      setLoading(false);
      if (err) {
        setError(err.message ?? 'Error al enviar el correo');
      } else {
        setMessage('Revisa tu bandeja de entrada y escribe el código de 6 dígitos.');
        setIsVerifyingOtp(true);
      }
      return;
    }

    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err.message ?? 'Error al iniciar sesión');
      return;
    }
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 p-4">
      <div className="w-full max-w-sm space-y-3">
        {dbTest && !dbTest.ok && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-300">
            <strong>Base de datos:</strong> {dbTest.error}
            <p className="mt-1 text-xs text-red-400/70">Comprueba que las migraciones estén aplicadas en Supabase (SQL Editor).</p>
          </div>
        )}
        {dbTest?.ok && (
          <p className="text-center text-xs text-emerald-400">Conexión a la base de datos correcta</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 border border-white/10 relative overflow-hidden"
        >
          <h1 className="text-xl font-bold text-center text-white">
            {isVerifyingOtp ? 'Ingresar Código' : isRecovering ? 'Recuperar contraseña' : 'Admin'}
          </h1>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly={isVerifyingOtp}
              className={`w-full px-4 py-2.5 rounded-xl border transition-all ${
                isVerifyingOtp 
                  ? 'bg-white/5 border-transparent text-slate-400 cursor-not-allowed'
                  : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20'
              }`}
              placeholder="tu@email.com"
            />
          </div>

          {/* OTP Code Input */}
          {isVerifyingOtp && (
            <div className="space-y-1.5">
              <label htmlFor="otp" className="block text-sm font-medium text-slate-300">Código de 6 dígitos</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                required
                maxLength={6}
                minLength={6}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                           text-white text-center tracking-[0.5em] font-mono text-lg placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                           focus:ring-1 focus:ring-blue-500/20 transition-all"
                placeholder="000000"
              />
            </div>
          )}

          {/* Password (only if not recovering and not verifying) */}
          {!isRecovering && !isVerifyingOtp && (
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Contraseña</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
                  aria-label="Alternar visibilidad"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          
          {message && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                       text-white font-medium hover:from-blue-500 hover:to-blue-400
                       transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                       disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {loading ? 'Procesando...' : isVerifyingOtp ? 'Validar Código' : isRecovering ? 'Enviar Código' : 'Entrar'}
          </button>
          
          <div className="text-center mt-4 space-y-2 flex flex-col">
            {isVerifyingOtp && (
              <button
                type="button"
                disabled={resendCooldown > 0 || loading}
                onClick={handleResendCode}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0 ? `Reenviar código en ${resendCooldown}s` : 'Reenviar código'}
              </button>
            )}
            
            <button
              type="button"
              onClick={() => { 
                setIsRecovering(!isRecovering); 
                setIsVerifyingOtp(false);
                setError(''); 
                setMessage(''); 
              }}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isRecovering ? 'Volver a Iniciar Sesión' : '¿Olvidaste tu contraseña?'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
