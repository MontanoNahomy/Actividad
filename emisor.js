// emisor.js
const crypto = require('crypto');
const fs = require('fs');

// Mensaje a enviar
const mensaje = "Hola mundo";
// Clave secreta compartida (simulada)
const claveSecreta = "clave123";

// Función para generar el hash SHA-256 del mensaje
function generarHash(mensaje) {
  return crypto.createHash('sha256').update(mensaje).digest('hex');
}

// Función para generar el HMAC usando la clave secreta
function generarHMAC(mensaje, clave) {
  return crypto.createHmac('sha256', clave).update(mensaje).digest('hex');
}

// Generar hash y HMAC
const hash = generarHash(mensaje);
const hmac = generarHMAC(mensaje, claveSecreta);

// Crear objeto con los datos del mensaje
const mensajeConHash = {
  mensaje_original: mensaje,
  hash_sha256: hash,
  hmac_sha256: hmac,
  descripcion: "Este archivo contiene el mensaje original, su hash SHA-256 y el HMAC generado usando una clave secreta compartida."
};

// Guardar como archivo JSON
fs.writeFileSync('mensaje_con_hash.json', JSON.stringify(mensajeConHash, null, 2));

console.log(" Mensaje enviado (archivo mensaje_con_hash.json creado).");
 