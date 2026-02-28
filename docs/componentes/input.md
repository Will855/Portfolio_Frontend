# Input (inpput.jsx)

## Ubicación

`src/components/inpput.jsx`

## Propósito

Componente de campo de entrada reutilizable con etiqueta. Versión simple (sin animaciones ni validación visual) para formularios. Nota: el nombre del archivo tiene un typo (“inpput” en lugar de “input”).

## Uso

No se usa en el formulario principal de contacto; el formulario en `form.tsx` usa su propio `AnimatedInput` y `AnimatedTextarea`. Este Input podría usarse en otros formularios o demos.

```tsx
<Input
  label="Nombre"
  name="name"
  type="text"
  placeholder="Tu nombre"
  onChange={handleChange}
/>
```

## Props

| Prop        | Tipo     | Descripción                                      |
|-------------|----------|--------------------------------------------------|
| label       | string   | Texto de la etiqueta                             |
| name        | string   | name e id del input                              |
| type        | string   | type del input (text, email, etc.)               |
| placeholder | string   | Placeholder del campo                            |
| onChange    | function | Callback al cambiar el valor                      |

No maneja `value` (no es controlado); sería controlado desde el padre pasando `value` y `onChange` si se extiende el componente.

## Estilos

- Label: `text-[#f0f8ff] block mb-2`
- Input: `w-full px-3 py-2 text-[#f0f8ff] bg-[#3a3a3a] rounded-md focus:ring-2 focus:ring-[#f0f8ff]`

## Dependencias

- Solo React

## Mejoras sugeridas

- Renombrar archivo a `Input.jsx` o `Input.tsx` y corregir imports.
- Añadir props `value`, `error` y `disabled` para uso controlado y consistencia con AnimatedInput.
- Migrar a TypeScript y exportar tipo de props.
- Si se unifica con los campos del form, considerar un único componente Input configurable (animado opcional, textarea opcional).
