create database LocaFilme;

use LocaFilme;

-- • Cliente: Devem ser cadastrados com nome, CPF, telefone e e-mail. 
create table cliente (
id int auto_increment,
nome varchar(100) not null,
cpf varchar(14) not null unique,
telefone varchar(24),
email varchar(150),
primary key (Id)
);

insert into cliente (nome, cpf, telefone, email)
values
('Ana Clara Costa', '123.456.789-01', '(11) 98765-4321', 'ana.clara@email.com'),
('Bruno Silva Santos', '098.765.432-10', '(21) 91234-5678', 'bruno.santos@email.com'),
('Carla Oliveira Souza', '112.233.445-56', '(31) 99876-1234', 'carla.oliver@email.com'),
('Daniel Pereira Lima', '678.901.234-57', '(41) 97654-3210', 'daniel.lima@email.com'),
('Eduarda Rocha Almeida', '554.332.110-09', '(51) 96543-2109', 'eduarda.rocha@email.com'),
('Felipe Gomes Martins', '998.877.665-54', '(61) 95432-1098', 'felipe.gomes@email.com'),
('Gabriela Fernandes Brito', '332.211.009-98', '(71) 94321-0987', 'gabriela.brito@email.com'),
('Hugo Santos Ribeiro', '776.655.443-32', '(81) 93210-9876', 'hugo.ribeiro@email.com'),
('Isabela Dias Nunes', '110.099.887-76', '(91) 92109-8765', 'isabela.dias@email.com'),
('João Pedro Carvalho', '221.100.998-87', '(11) 91098-7654', 'joao.carvalho@email.com');

-- • Filmes: Cada filme tem título, gênero, ano de lançamento, classificação indicativa e estoque disponível.
create table filmes (
id int  auto_increment,
titulo varchar(100) not null,
genero varchar(100) not null,
ano_Lancamento int not null,
classificacao_Indicativa int not null,
estoque_Disponivel int not null,
primary key (id)
);

insert into filmes (titulo, genero, ano_lancamento, classificacao_indicativa, estoque_disponivel)
values
('O Poderoso Chefão', 'Crime/Drama', 1972, 14, 5),
('A Origem', 'Ficção Científica', 2010, 14, 12),
('Forrest Gump: O Contador de Histórias', 'Drama/Romance', 1994, 12, 8),
('Matrix', 'Ficção Científica/Ação', 1999, 14, 15),
('Pulp Fiction: Tempo de Violência', 'Crime/Drama', 1994, 18, 7),
('O Rei Leão', 'Animação/Musical', 1994, 0, 20),
('Interestelar', 'Ficção Científica/Drama', 2014, 10, 10),
('Vingadores: Ultimato', 'Ação/Fantasia', 2019, 12, 25),
('Titanic', 'Drama/Romance', 1997, 12, 9),
('Jurassic Park: Parque dos Dinossauros', 'Aventura/Ficção Científica', 1993, 12, 11),
('A Viagem de Chihiro', 'Animação/Fantasia', 2001, 10, 6),
('O Senhor dos Anéis: A Sociedade do Anel', 'Fantasia/Aventura', 2001, 12, 18),
('Parasita', 'Thriller/Drama', 2019, 16, 4),
('Toy Story', 'Animação/Comédia', 1995, 0, 15),
('Clube da Luta', 'Drama/Suspense', 1999, 18, 3),
('De Volta para o Futuro', 'Ficção Científica/Aventura', 1985, 10, 13),
('A Chegada', 'Ficção Científica/Drama', 2016, 10, 9),
('Cidade de Deus', 'Crime/Drama', 2002, 18, 6),
('Procurando Nemo', 'Animação/Aventura', 2003, 0, 14),
('Psicose', 'Terror/Suspense', 1960, 14, 2);

-- • Locações: Cada cliente pode realizar locações contendo um ou mais filmes. É necessário registrar a data da locação, a data prevista para devolução e a data real de devolução.
CREATE TABLE locacao (
    id_locacao INT NOT NULL AUTO_INCREMENT,
    id_filme INT NOT NULL,
    id_cliente INT NOT NULL,
    data_locacao DATE NOT NULL,
    data_devolucao DATE,
    PRIMARY KEY (id_locacao),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_filme) REFERENCES filmes(id)
);
select*from locacao;

insert into locacao (id_filme,id_cliente, data_locacao, data_devolucao)
values
(1,1,'2024-11-01', '2024-11-04'),
(2,2,'2024-11-05', '2024-11-09'),
(3,3,'2024-11-10', '2024-11-13'),
(4,4,'2024-11-15', '2024-11-20'),
(5,5,'2024-11-20', '2024-11-23'),
(6,6,'2024-12-01', '2024-12-05'),
(7,7,'2024-12-06', '2024-12-09'),
(8,8,'2024-12-10', '2024-12-15'),
(9,9,'2025-01-05', '2025-01-08'),
(10,10,'2025-01-10', '2025-01-14');