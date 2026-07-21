import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { testSupabaseConnection, type ConnectionTestResult } from '../../../core/utils/testSupabaseConnection';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Rate Limiting & Cooldowns
  const [resendCooldown, setResendCooldown] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  
  const [dbTest, setDbTest] = useState<ConnectionTestResult | null>(null);
  const { user, loading: authLoading, sendOtpLogin, verifyOtpLogin, isConfigured } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConfigured) return;
    testSupabaseConnection().then(setDbTest);
  }, [isConfigured]);

  // Recuperar cooldown del localStorage
  useEffect(() => {
    const savedCooldown = localStorage.getItem('admin_login_cooldown');
    if (savedCooldown) {
      const expiration = parseInt(savedCooldown, 10);
      const remaining = Math.max(0, Math.floor((expiration - Date.now()) / 1000));
      if (remaining > 0) {
        setResendCooldown(remaining);
      }
    }
  }, []);

  // Manejador del timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const startCooldown = (seconds: number) => {
    setResendCooldown(seconds);
    localStorage.setItem('admin_login_cooldown', (Date.now() + seconds * 1000).toString());
  };

  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (resendCooldown > 0) return;

    if (email.trim().toLowerCase() !== 'lynchwilmer@gmail.com') {
      setError('Acceso denegado: Correo no autorizado.');
      return;
    }

    setError('');
    setMessage('');
    setLoading(true);

    const { error: err } = await sendOtpLogin(email);
    setLoading(false);

    if (err) {
      // Manejo de código 429 Too Many Requests
      if (err.status === 429 || err.message.toLowerCase().includes('rate limit')) {
        setError('Has solicitado demasiados códigos. Por favor, espera 1 minuto e inténtalo de nuevo.');
        startCooldown(60);
      } else {
        setError(err.message ?? 'Error al enviar el correo');
      }
    } else {
      setMessage('Revisa tu bandeja de entrada (y Spam). Escribe el código que recibiste.');
      setStep('otp');
      setOtp('');
      setFailedAttempts(0);
      startCooldown(60); // 60 segundos de espera obligatoria entre envíos
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (email.trim().toLowerCase() !== 'lynchwilmer@gmail.com') {
      setError('Acceso denegado: Correo no autorizado.');
      setStep('email');
      return;
    }

    const cleanOtp = otp.trim();
    if (cleanOtp.length < 6) {
      setError('El código debe tener al menos 6 dígitos.');
      return;
    }

    setLoading(true);
    const { error: err } = await verifyOtpLogin(email.trim(), cleanOtp);
    setLoading(false);

    if (err) {
      const newFails = failedAttempts + 1;
      setFailedAttempts(newFails);
      
      if (newFails >= 3) {
        setError('Demasiados intentos fallidos. Por favor, solicita un nuevo código.');
        setStep('email');
        setOtp('');
      } else {
        setError(`Código incorrecto o expirado. (Intento ${newFails}/3)`);
      }
    } else {
      // Éxito absoluto, vamos al panel
      navigate('/admin', { replace: true });
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
          onSubmit={step === 'email' ? handleRequestOtp : handleVerifyOtp}
          className="space-y-5 rounded-2xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 border border-white/10 relative overflow-hidden"
        >
          <h1 className="text-xl font-bold text-center text-white">
            {step === 'otp' ? 'Ingresar Código' : 'Acceso Admin'}
          </h1>
          
          {step === 'email' && (
            <p className="text-sm text-slate-400 text-center">
              Ingresa tu correo autorizado para recibir un código de acceso de un solo uso.
            </p>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly={step === 'otp'}
              className={`w-full px-4 py-2.5 rounded-xl border transition-all ${
                step === 'otp'
                  ? 'bg-white/5 border-transparent text-slate-400 cursor-not-allowed'
                  : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20'
              }`}
              placeholder="tu@email.com"
            />
          </div>

          {/* OTP Code Input */}
          {step === 'otp' && (
            <div className="space-y-1.5">
              <label htmlFor="otp" className="block text-sm font-medium text-slate-300">Código de verificación</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 8))}
                required
                maxLength={8}
                minLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                           text-white text-center tracking-[0.4em] font-mono text-lg placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                           focus:ring-1 focus:ring-blue-500/20 transition-all"
                placeholder="••••••••"
              />
              <p className="text-xs text-slate-500 text-center">Ingresa el código exactamente como aparece en el correo</p>
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
            disabled={loading || (step === 'email' && resendCooldown > 0)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                       text-white font-medium hover:from-blue-500 hover:to-blue-400
                       transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                       disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {loading 
              ? 'Procesando...' 
              : step === 'otp' 
                ? 'Validar Código' 
                : resendCooldown > 0 
                  ? `Reenviar en ${resendCooldown}s` 
                  : 'Enviar Código OTP'}
          </button>
          
          {step === 'otp' && (
            <div className="text-center mt-4 space-y-2 flex flex-col">
              <button
                type="button"
                disabled={resendCooldown > 0 || loading}
                onClick={() => handleRequestOtp()}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0 ? `Reenviar código en ${resendCooldown}s` : 'Reenviar código'}
              </button>
              
              <button
                type="button"
                onClick={() => { 
                  setStep('email');
                  setError(''); 
                  setMessage(''); 
                }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ingresar otro correo
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
