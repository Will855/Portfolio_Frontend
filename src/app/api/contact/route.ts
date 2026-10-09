import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Rate limiting simple en memoria (útil para despliegues ligeros)
// Para producción real, lo ideal es usar Redis (ej. @upstash/redis)
const rateLimit = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown_ip';
    const now = Date.now();
    const userRate = rateLimit.get(ip) || { count: 0, timestamp: now };
    
    // Limitar a 3 peticiones por minuto
    if (now - userRate.timestamp < 60000) {
      if (userRate.count >= 3) {
        return NextResponse.json(
          { error: 'Has enviado demasiados mensajes. Por favor, espera un minuto.' },
          { status: 429 }
        );
      }
      userRate.count++;
    } else {
      userRate.count = 1;
      userRate.timestamp = now;
    }
    rateLimit.set(ip, userRate);

    const body = await req.json();
    const { name, email, phone, message } = body;

    // 1. Validaciones en el backend
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    if (name.length > 100 || email.length > 150 || message.length > 2000) {
      return NextResponse.json({ error: 'La longitud de los campos excede el límite permitido' }, { status: 400 });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Formato de email inválido' }, { status: 400 });
    }

    // 2. Insertar en Supabase usando SERVICE_ROLE
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // IMPORTANTE: En producción debes tener SUPABASE_SERVICE_ROLE_KEY configurada.
    // Usamos el SERVICE ROLE porque le quitaremos el acceso público de "INSERT" a la base de datos.
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Variables de Supabase faltantes');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await supabase.from('contact_submissions').insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      message: message.trim()
    });

    if (error) {
      console.error('Error insertando en Supabase:', error);
      return NextResponse.json({ error: 'Error al guardar el mensaje en la base de datos' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error no controlado en /api/contact:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
