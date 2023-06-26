/*
  Warnings:

  - You are about to drop the column `usuario` on the `Entrega` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioMatricula` on the `Entrega` table. All the data in the column will be lost.
  - Added the required column `usuarioId` to the `Entrega` table without a default value. This is not possible if the table is not empty.

*/
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
    "dataCricao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualiacao" DATETIME NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "Entrega_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entrega" ("dataAtualiacao", "dataCricao", "horarioColeta", "horarioEntrega", "localColeta", "localDescarga", "material", "peso", "protolo") SELECT "dataAtualiacao", "dataCricao", "horarioColeta", "horarioEntrega", "localColeta", "localDescarga", "material", "peso", "protolo" FROM "Entrega";
DROP TABLE "Entrega";
ALTER TABLE "new_Entrega" RENAME TO "Entrega";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
