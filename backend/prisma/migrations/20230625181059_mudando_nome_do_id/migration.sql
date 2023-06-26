/*
  Warnings:

  - The primary key for the `Entrega` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `protolo` on the `Entrega` table. All the data in the column will be lost.
  - Added the required column `codigo` to the `Entrega` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entrega" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_Entrega" ("dataAtualiacao", "dataCricao", "horarioColeta", "horarioEntrega", "localColeta", "localDescarga", "material", "peso", "usuarioId") SELECT "dataAtualiacao", "dataCricao", "horarioColeta", "horarioEntrega", "localColeta", "localDescarga", "material", "peso", "usuarioId" FROM "Entrega";
DROP TABLE "Entrega";
ALTER TABLE "new_Entrega" RENAME TO "Entrega";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
