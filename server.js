// ==========================================
// 1. IMPORTACIÓN DE LIBRERÍAS (HERRAMIENTAS)
// ==========================================

// Importamos Express, un framework de Node.js que simplifica la creación de servidores web.
const express = require('express');

// Importamos CORS, un paquete que permite que otras aplicaciones o páginas web se conecten a nuestra API.
const cors = require('cors');

// Inicializamos la aplicación de Express para crear nuestro servidor.
const app = express();


// ==========================================
// 2. CONFIGURACIÓN DE MIDDLEWARES (REGLAS)
// ==========================================

// Le decimos al servidor que entienda los datos en formato JSON que lleguen en el cuerpo de las peticiones (req.body).
app.use(express.json());

// Habilitamos CORS para que cualquier cliente (navegador, Postman, app móvil) pueda enviar peticiones.
app.use(cors());


// ==========================================
// 3. BASE DE DATOS EN MEMORIA (ALMACENAMIENTO)
// ==========================================

// Creamos un arreglo (Array) de objetos para simular una base de datos.
// NOTA: Como está en memoria RAM, si el servidor se reinicia, los cambios vuelven a este estado inicial.
let vehiculos = [
  { id: 1, placa: "XYZ123", tipo: "Carro", ingreso: "08:00 AM" },
  { id: 2, placa: "ABC456", tipo: "Moto", ingreso: "09:15 AM" }
];


// ==========================================
// 4. RUTAS Y ENDPOINTS DE LA API (CRUD)
// ==========================================

/**
 * RUTA 1: OBTENER TODOS LOS VEHÍCULOS (READ - LECTURA)
 * Método HTTP: GET
 * Ruta: /api/vehiculos
 */
app.get('/api/vehiculos', (req, res) => {
  // req (petición): contiene los datos que envía el cliente.
  // res (respuesta): contiene los métodos para responder al cliente.
  
  // Respondemos con código HTTP 200 (OK por defecto) enviando un objeto JSON con la lista de vehículos.
  res.json({ 
    status: "success", 
    data: vehiculos 
  });
});


/**
 * RUTA 2: REGISTRAR UN NUEVO VEHÍCULO (CREATE - CREACIÓN)
 * Método HTTP: POST
 * Ruta: /api/vehiculos
 */
app.post('/api/vehiculos', (req, res) => {
  // Extraemos las propiedades 'placa' y 'tipo' del cuerpo de la petición (req.body).
  const { placa, tipo } = req.body;

  // VALIDACIÓN: Verificamos que el cliente haya enviado ambos datos requeridos.
  if (!placa || !tipo) {
    // Si falta alguno, respondemos con código HTTP 400 (Bad Request / Petición incorrecta) y un mensaje de error.
    return res.status(400).json({ error: "Faltan datos requeridos (placa o tipo)" });
  }
  
  // Creamos un objeto JavaScript con los datos del nuevo vehículo.
  const nuevoVehiculo = {
    id: vehiculos.length + 1,            // Asignamos un ID autoincrementable según la cantidad de elementos.
    placa: placa,                       // Guardamos la placa recibida.
    tipo: tipo,                         // Guardamos el tipo de vehículo (Carro, Moto, etc.).
    ingreso: new Date().toLocaleTimeString() // Guardamos la hora actual del servidor en formato de texto.
  };

  // Agregamos el nuevo objeto al final de nuestro arreglo de vehículos.
  vehiculos.push(nuevoVehiculo);

  // Respondemos con código HTTP 201 (Created / Creado exitosamente) y devolvemos el objeto registrado.
  res.status(201).json({ 
    mensaje: "Vehículo registrado con éxito", 
    data: nuevoVehiculo 
  });
});


/**
 * RUTA 3: ELIMINAR / DAR SALIDA A UN VEHÍCULO (DELETE - ELIMINACIÓN)
 * Método HTTP: DELETE
 * Ruta: /api/vehiculos/:id
 */
app.delete('/api/vehiculos/:id', (req, res) => {
  // Extraemos el parámetro 'id' de la URL (req.params).
  // Por ejemplo, si la URL es /api/vehiculos/1, entonces id tomará el valor "1".
  const { id } = req.params;

  // Usamos el método filter() para sobrescribir el arreglo 'vehiculos'.
  // Conservamos todos los vehículos cuyo ID sea DIFERENTE al ID que queremos eliminar.
  // Usamos parseInt(id) porque el ID recibido por URL viene como texto y debemos convertirlo a número.
  vehiculos = vehiculos.filter(v => v.id !== parseInt(id));

  // Respondemos con un mensaje JSON confirmando que el vehículo fue removido.
  res.json({ 
    mensaje: `Vehículo con ID ${id} retirado correctamente` 
  });
});


// ==========================================
// 5. INICIALIZACIÓN DEL SERVIDOR
// ==========================================

// Definimos el puerto en el que escuchará el servidor.
// Intenta usar la variable de entorno PORT (util para despliegue en la nube) o el puerto 3000 por defecto.
const PORT = process.env.PORT || 3000;

// Ponemos el servidor a escuchar peticiones entrantes en el puerto especificado.
app.listen(PORT, () => {
  // Imprimimos un mensaje en la consola del terminal indicando que el servidor está activo.
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});