// PRIMERA LINEA — cargar variables de entorno
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const originesPermitidos = [
  "http://localhost:5500",
  "http://127.0.0.1:5500"
];

// ── MIDDLEWARES ──────────────────────────────────────────
app.use(cors({ origin: originesPermitidos }));
app.use(express.json({ limit: '50mb' }));
app.use("/img", express.static("img"));

// ── DATOS ────────────────────────────────────────────────
const fs = require("fs");

const articulos = [
{
  id: 1,
  titulo: "Museo Juan Manuel Blanes:",
  subtitulo: "origen de un patrimonio cultural uruguayo",
  autor: "Stephanie Puñales",
  categoria: "Historia",
  fecha: "2026/07/02",
  descripcion1: fs.readFileSync(
    "./articulos/museo-blanes-1.html",
    "utf8"
  ),
  descripcion2: fs.readFileSync(
    "./articulos/museo-blanes-2.html",
    "utf8"
  ),
  portada: "/img/museo-blanes-portada.jpg",
  galeria: [
    "/img/museo-blanes-1.jpg",
    "/img/museo-blanes-2.jpg",
    "/img/museo-blanes-3.jpg",
    "/img/museo-blanes-4.jpg",
  ],
},

{
  id: 2,
  titulo: "El Tango:",
  subtitulo: "memoria, identidad y patrimonio cultural del Uruguay.",
  autor: "Valeria Mendez",
  categoria: "Arte",
  fecha: "2026/07/02",
  descripcion1: fs.readFileSync(
    "./articulos/el-tango-1.html",
    "utf8"
  ),
  descripcion2: fs.readFileSync(
    "./articulos/el-tango-2.html",
    "utf8"
  ),
  portada: "/img/tango-portada.jpg",
  galeria: [
    "/img/tango2.jpg",
    "/img/tango3.jpg",
    "/img/tango4 (3).jpg",
    "/img/tango5.jpg",
  ],
},

{
  id: 3,
  titulo: "Heritage Day in Uruguay",
  subtitulo: "",
  autor: "Valeria Mendez",
  categoria: "Heritage",
  fecha: "2026/07/02",
  descripcion1: fs.readFileSync(
    "./articulos/patrimonio-ingles.html",
    "utf8"
  ),
  descripcion2: "",
  portada: "/img/patrimonio-portada.jpg",
  galeria: [
    "/img/patrimonio-1.jpg",
    "/img/patrimonio2.jpg",
    "/img/patrimonio3.jpg",
    "/img/patrimonio4.jpg",
  ],
},

{
  id: 4,
  titulo: "iii",
  subtitulo: "",
  autor: "",
  categoria: "",
  fecha: "",
  descripcion1: "",
  descripcion2: "",
  portada:"",
  galeria: [],
},

{
  id: 5,
  titulo: "",
  subtitulo: "",
  autor: "",
  categoria: "",
  fecha: "",
  descripcion1: "",
  descripcion2: "",
  portada: "",
  galeria: [],
},

];

// ── RUTAS ────────────────────────────────────────────────

// GET /articulos → devuelve todos los artículos
app.get("/articulos", (req, res) => {
  res.json(articulos);
});

// GET /articulos/:id → devuelve un artículo por id
app.get("/articulos/:id", (req, res) => {
  const id = Number(req.params.id);
  const articulo = articulos.find((a) => a.id === id);
  if (!articulo) {
    return res.status(404).json({ error: "Artículo no encontrado" });
  }
  res.json(articulo);
});

// POST /articulos → crea un artículo nuevo
app.post("/articulos", (req, res) => {
  const { titulo, subtitulo, autor, categoria, fecha, descripcion1, descripcion2, portada, galeria } = req.body;

  if (!titulo || !autor || !descripcion1 || !descripcion2) {
    return res.status(400).json({
      error: "Los campos título, autor y contenido son obligatorios",
    });
  }

  const nuevo = {
    id: articulos.length + 1,
    titulo,
    subtitulo: subtitulo || "",
    autor,
    categoria: categoria || "Sin categoría",
    fecha: fecha || "",
    descripcion1,
    descripcion2: descripcion2 || "",
    portada: portada || "",
    galeria: galeria || []
  };

  articulos.push(nuevo);
  res.status(201).json(nuevo);
});

// ── 404 ──────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ── ERROR HANDLER ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// ── INICIAR SERVIDOR ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});