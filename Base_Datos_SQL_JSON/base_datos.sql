-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS sketch_coffee
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE sketch_coffee;


-- Nombre de la tabla (clientes y admin): Usuario
CREATE TABLE usuario (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    rol ENUM('cliente', 'admin') DEFAULT 'cliente',
    activo BOOLEAN DEFAULT TRUE,
    password_hash VARCHAR(255) NULL
);


-- Nombre de la tabla: Categorias
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(300) NULL
);

INSERT INTO categorias (id, nombre, descripcion) VALUES
    (1, 'Bebidas calientes', 'Bebidas calientes preparadas al momento.'),
    (2, 'Bebidas frías', 'Bebidas frías preparadas al momento.'),
    (3, 'Frappés', 'Bebidas frappé del menú.'),
    (4, 'Snacks', 'Platillos y snacks salados.'),
    (5, 'Café en grano', 'Café de especialidad en distintas presentaciones.'),
    (6, 'Postres', 'Postres y panadería artesanal.');


-- Nombre de la tabla: Productos
CREATE TABLE productos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    sku VARCHAR(30) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    existencias INT NOT NULL DEFAULT 0,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_productos_categoria FOREIGN KEY (categoria_id) 
    REFERENCES categorias(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- Nombre de la tabla: Pedidos
CREATE TABLE pedidos ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL, 
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP, 
    estado ENUM('pendiente', 'pagado', 'en_preparacion', 'entregado', 'cancelado') DEFAULT 'pendiente',
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00, 
    CONSTRAINT fk_pedidos_usuario FOREIGN KEY (usuario_id) 
    REFERENCES usuario(id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE 
);

-- Agregar los Registros de Pedidos
INSERT INTO pedidos (usuario_id, fecha, estado, total) VALUES 
(1, NOW(), 'pendiente', 450.00), 
(2, NOW(), 'pagado', 1250.50), 
(3, NOW(), 'en_preparacion', 90.00), 
(4, NOW(), 'entregado', 320.00), 
(5, NOW(), 'cancelado', 150.00); 


-- Nombre de la tabla: Detalles_pedido
