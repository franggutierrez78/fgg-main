Create table profedores(
    id_profesor INT PRIMAR KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    departamento VARCHAR(50)
);

Create table alumnos(
    id_alumno INT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    curso VARCHAR(50),
);

Create table asignaturas(
    id_asignatura INT PRIMARY KEY,
    nombre VARCHAR(50),
    horas_semanales INT
);

Create table matriculas(
    id_matricula INT PRIMARY KEY,
    id_alumno INT,
    id_asignatura INT,
    id_profesor INT,
    nota DECIMAL(4,2),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno),
    FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id_asignatura),
    FOREIGN KEY (id_profesor) REFERENCES profedores(id_profesor)
);

--Inserccion de datos 
INSERT INTO profedores VALUES (1, 'Laura', 'Perez', 'Informatica'), (2, 'Carlos', 'Ruiz', 'Matematicas'), (3, 'Ana', 'Garcia', 'Lengua');
INSERT INTO alumnos VAlUES (1, 'Maria', 'Lopez', '1ºA'), (2, 'Juan', 'Martinez', '1ºA'), (3, 'Lucia', 'Santos', '2ºB'), (4, 'Pedro', 'Gomez', '2ºB');
INSERT INTO asignaturas VALUES (1, 'Bases de Datos', 4), (2, 'Matematicas', 5), (3, 'Lengua', 4);
INSERT INTO matriculas VALUES (1, 1, 1, 1, 7.5), (2, 2, 1, 1, 8.2), (3, 3, 2, 2, 6.4), (4, 4, 3, 3, 9.1), (5, 1, 3,3, 8.8);
