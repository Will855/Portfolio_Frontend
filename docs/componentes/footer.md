# Footer

## Ubicación

`src/components/footer/footer.tsx`

## Propósito

Pie de página reutilizable con datos de contacto (email, teléfono), enlaces a redes sociales y tracking de analytics al hacer click en contacto.

## Uso

Se incluye al final de varias páginas: Home, Information, Proyects, Contact.

```tsx
<Footer />
```

## Configuración

Constante local `CONTACT_INFO`:

- `email`, `phone`
- `socialMedia`: github, instagram, linkedin, whatsapp (cada uno con `url` y `label`).

Los clicks en enlaces de contacto llaman a `trackContactAttempt(platform)` desde `utils/analytics`.

## Estructura

- Bloque "Contacto" con email y teléfono (mailto, tel).
- Bloque de redes con iconos e enlaces (GitHub, Instagram, LinkedIn, WhatsApp).
- Estilos: `backdrop-blur-lg`, `bg-white/5`, gradientes en títulos, hover en enlaces.

## Props

Ninguno. El componente es presentacional y toma todo de `CONTACT_INFO`.

## Dependencias

- React
- `../../utils/analytics` (trackContactAttempt)

## Mejoras sugeridas

- Mover `CONTACT_INFO` a `config/contact.ts` o `config/social.ts` y reutilizar en el formulario de contacto para evitar duplicar URLs y labels.
- Asegurar que los iconos tengan `aria-hidden` donde corresponda y que los enlaces tengan `aria-label` si el texto visible no es suficiente.
