-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matricula" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataCricao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualiacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Entrega" (
    "protolo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "localColeta" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "localDescarga" TEXT NOT NULL,
    "horarioColeta" DATETIME NOT NULL,
    "horarioEntrega" DATETIME NOT NULL,
    "usuario" TEXT NOT NULL,
    "dataCricao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualiacao" DATETIME NOT NULL,
    "usuarioMatricula" TEXT NOT NULL,
    CONSTRAINT "Entrega_usuarioMatricula_fkey" FOREIGN KEY ("usuarioMatricula") REFERENCES "Usuario" ("matricula") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_matricula_key" ON "Usuario"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");
