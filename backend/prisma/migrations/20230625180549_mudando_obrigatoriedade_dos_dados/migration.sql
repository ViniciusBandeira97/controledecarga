-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entrega" (
    "protolo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "localColeta" TEXT,
    "material" TEXT,
    "peso" REAL,
    "localDescarga" TEXT,
    "horarioColeta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "horarioEntrega" DATETIME NOT NULL,
    "usuario" TEXT NOT NULL,
    "dataCricao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualiacao" DATETIME NOT NULL,
    "usuarioMatricula" TEXT NOT NULL,
    CONSTRAINT "Entrega_usuarioMatricula_fkey" FOREIGN KEY ("usuarioMatricula") REFERENCES "Usuario" ("matricula") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entrega" ("dataAtualiacao", "dataCricao", "horarioColeta", "horarioEntrega", "localColeta", "localDescarga", "material", "peso", "protolo", "usuario", "usuarioMatricula") SELECT "dataAtualiacao", "dataCricao", "horarioColeta", "horarioEntrega", "localColeta", "localDescarga", "material", "peso", "protolo", "usuario", "usuarioMatricula" FROM "Entrega";
DROP TABLE "Entrega";
ALTER TABLE "new_Entrega" RENAME TO "Entrega";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
