// receptor.js
const crypto = require('crypto');
const fs = require('fs');

// Clave secreta compartida (debe coincidir con la del emisor)
const claveSecreta = "Nahomy1128";

// Función para generar hash
function generarHash(mensaje) {
  return crypto.createHash('sha256').update(mensaje).digest('hex');
}

// Función para generar HMAC
function generarHMAC(mensaje, clave) {
  return crypto.createHmac('sha256', clave).update(mensaje).digest('hex');
}

// Leer el archivo recibido
const datos = JSON.parse(fs.readFileSync('mensaje_con_hash.json', 'utf8'));
const { mensaje_original, hash_sha256, hmac_sha256 } = datos;

// Verificar hash
const hashCalculado = generarHash(mensaje_original);
const hashValido = hashCalculado === hash_sha256;

// Verificar HMAC
const hmacCalculado = generarHMAC(mensaje_original, claveSecreta);
const hmacValido = hmacCalculado === hmac_sha256;

// Mostrar resultados
console.log(" Mensaje recibido:", mensaje_original);
console.log(" Verificación de Hash:", hashValido ? " Válido" : " Inválido");
console.log(" Verificación de HMAC:", hmacValido ? " Válido" : " Inválido");

if (hashValido && hmacValido) {
  console.log(" Mensaje íntegro y auténtico.");
} else {
  console.log(" Advertencia: El mensaje fue modificado o la clave es incorrecta.");
}
 