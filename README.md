# 📄 Documentación del Proyecto: emisor.js, receptor.js y mensaje_con_hash.json

## 1. `emisor.js`

Este script representa al emisor del mensaje. Sus funciones principales son:

- Definir un mensaje original.
- Calcular el hash SHA-256 del mensaje.
- Generar un HMAC SHA-256 usando una clave secreta compartida.
- Guardar estos datos en un archivo llamado `mensaje_con_hash.json`.

---

## 2. `receptor.js`

Este script representa al receptor del mensaje. Sus funciones son:

- Leer el archivo `mensaje_con_hash.json`.
- Calcular nuevamente el hash y el HMAC del mensaje recibido.
- Compararlos con los valores que envió el emisor.
- Mostrar si el mensaje es válido o si ha sido modificado o falsificado.

---

## 3. `mensaje_con_hash.json`

Este archivo actúa como el "mensaje enviado". Contiene:

```json
{
  "mensaje_original": "Hola mundo",
  "hash_sha256": "<hash calculado>",
  "hmac_sha256": "<hmac calculado>",
  "descripcion": "Este archivo contiene el mensaje original, su hash SHA-256 y el HMAC generado usando una clave secreta compartida."
}
```

## Clave compartida (clave secreta)

Tanto `emisor.js` como `receptor.js` utilizan una clave secreta compartida (por ejemplo: `"clave123"`) para generar y verificar el HMAC (Hash-based Message Authentication Code). Esta clave no se transmite junto con el mensaje, sino que ambas partes deben conocerla de antemano.

### ¿Qué es y para qué sirve esta clave?

La clave secreta es usada para:

- Autenticar el mensaje ya que permite al receptor saber si el mensaje fue generado por alguien que conoce la clave (es decir, alguien de confianza).
- Proteger contra modificaciones por si un se intenta modificar el mensaje, ya no podrá generar un HMAC válido sin conocer la clave, por lo tanto, el receptor detectará la alteración.

Si el emisor y el receptor usan claves diferentes, el HMAC generado por el receptor no coincidirá con el que viene en el mensaje, por lo tanto el mensaje no es auténtico, ha sido manipulado, o proviene de una fuente no autorizada.
