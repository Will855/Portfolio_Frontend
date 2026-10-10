# Informe de Certificación de Convergencia — portfolio-next

**Fecha:** 2026-10-09 19:00:36  
**Estado de Convergencia:** CERTIFICADA (0 Nuevos Bugs)  
**Bugs Preexistentes Ingestados:** 0  
**Nuevos Bugs Descubiertos:** 3  
**Total Bugs en Memoria Acumulada:** 3  

## Matriz Consolidada de Vulnerabilidades

| ID | Dominio / Cuadrante | Severidad | Archivo | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Q05 | PENDIENTE_KEV | `src/modules/projects/hooks/useCertificates.ts` | En el mapeo de registros devueltos por Supabase, la expresión getStoragePublicUrl(row.image_path) &#124;&#124; (row.image_path.startsWith('/') ? row.image_path : `/${row.image_path}`) evalúa la rama derecha únicamente cuando row.image_path es falsy. Si row.image_path es null o undefined, la invocación row.image_path.startsWith('/') produce una excepción TypeError al leer una propiedad sobre un valor nulo, provocando que el bloque catch descarte todos los registros válidos obtenidos y devuelva FALLBACK_CERTIFICATES. Si row.image_path es una cadena vacía, la expresión evalúa a '/', asignando como fuente de imagen la ruta raíz que descarga el documento HTML en lugar de un recurso gráfico. |
| **SEC-02** | Q05 | PENDIENTE_KEV | `src/modules/projects/hooks/useAdminCertificates.ts` | La función moveCertificate utiliza el operador de coalescencia nula (swap.order ?? swapIdx y current.order ?? idx) para calcular el nuevo orden. Cuando dos registros contiguos poseen el mismo valor numérico de orden (por ejemplo 0, que es el valor predeterminado en emptyCertificateForm), la expresión 0 ?? swapIdx evalúa al número 0 en lugar del índice alternativo. Ambos registros son actualizados en Supabase con su mismo valor previo 0, manteniendo inalterada la posición relativa de los elementos tras la invalidación de la consulta. |
| **SEC-03** | Q05 | PENDIENTE_KEV | `src/modules/projects/hooks/useAdminCertificates.ts` | En handleDelete, ante un fallo retornado por supabase.from('certificates').delete(), la excepción capturada en el bloque catch únicamente se envía a console.error sin actualizar el estado error mediante setError. Adicionalmente, el bloque finally ejecuta incondicionalmente la función onSettled, impidiendo que el componente consumidor detecte el error en el estado del hook y provocando que cierre diálogos o confirme la operación como si hubiese concluido correctamente. |
