# Form (ContactForm)

## Ubicación

`src/components/form.tsx`

## Propósito

Formulario de contacto con validación en cliente, envío a Firebase Firestore, animaciones (Framer Motion) y enlaces a redes sociales. Incluye subcomponentes internos para campos animados.

## Uso

Se usa en la página Contact:

```tsx
<ContactForm />
```

## Estructura del archivo

- **Tipos**: `FormData`, `FormField`, `SocialLink`.
- **Constantes**: `SOCIAL_LINKS`, `SOCIAL_ITEMS` (whatsapp, instagram, github) con iconos IonIcon y estilos hover.
- **Variantes de animación**: `containerVariants`, `itemVariants`, `buttonVariants`, `messageVariants` (Framer Motion).
- **Subcomponentes internos**:
  - `AnimatedInput`: input con label, estado de foco y error, variante `itemVariants`.
  - `AnimatedTextarea`: textarea con label y error, misma línea de variantes.
- **Componente principal**: `ContactForm` con estado (`formData`, `fieldErrors`, `isSubmitting`, `responseMessage`, `error`), `handleChange`, `handleSubmit`, y render del form + mensajes + iconos sociales.

## Validación

- Campos requeridos: nombre, email, mensaje (trim).
- Email: `isValidEmail()` desde `./utils/validation`.
- Teléfono opcional: si se envía, debe tener 11 dígitos (`/^\d{11}$/`).
- Errores por campo en `fieldErrors` y mensaje global en `error`.

## Envío

- `handleSubmit`: previene default, valida, llama a `addDoc(collection(db, "contactFormSubmissions"), formData)` (Firebase). En éxito limpia el form y muestra `responseMessage`; en error muestra `error`. `trackContactAttempt` se usa al hacer click en redes, no en el submit del form.

## Props

Ninguno. Todo el estado y la configuración son internos.

## Dependencias

- React, useState
- @reacticons/ionicons
- framer-motion (motion, AnimatePresence)
- firebase/firestore (collection, addDoc), config/firebase (db)
- ./utils/validation (isValidEmail)
- utils/analytics (trackContactAttempt)

## Mejoras sugeridas

- Extraer `AnimatedInput` y `AnimatedTextarea` a archivos separados (p. ej. en `components/form/` o `components/inputs/`).
- Mover variantes del form a `animations/variants.ts` o a un módulo `formVariants.ts`.
- Centralizar enlaces sociales en `config/social.ts` y reutilizar en Footer y Form.
- Considerar feedback de éxito/error accesible (live region, roles).
