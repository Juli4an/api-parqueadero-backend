const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Simulación de base de datos en memoria (para empezar fácil)
let vehiculos = [
  { id: 1, placa: "XYZ123", tipo: "Carro", ingreso: "08:00 AM" },
  { id: 2, placa: "ABC456", tipo: "Moto", ingreso: "09:15 AM" }
];

// 1. OBTENER TODOS LOS VEHÍCULOS (GET)
app.get('/api/vehiculos', (req, res) => {
  res.json({ status: "success", data: vehiculos });
});

// 2. REGISTRAR UN NUEVO VEHÍCULO (POST)
app.post('/api/vehiculos', (req, res) => {
  const { placa, tipo } = req.body;
  if (!placa || !tipo) {
    return res.status(400).json({ error: "Faltan datos requeridos (placa o tipo)" });
  }
  
  const nuevoVehiculo = {
    id: vehiculos.length + 1,
    placa,
    tipo,
    ingreso: new Date().toLocaleTimeString()
  };

  vehiculos.push(nuevoVehiculo);
  res.status(201).json({ mensaje: "Vehículo registrado con éxito", data: nuevoVehiculo });
});

// 3. ELIMINAR / DAR SALIDA A UN VEHÍCULO (DELETE)
app.delete('/api/vehiculos/:id', (req, res) => {
  const { id } = req.params;
  vehiculos = vehiculos.filter(v => v.id !== parseInt(id));
  res.json({ mensaje: `Vehículo con ID ${id} retirado correctamente` });
});

// PUERTO DEL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});