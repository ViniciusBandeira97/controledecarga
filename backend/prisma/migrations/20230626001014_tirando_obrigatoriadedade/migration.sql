-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entrega" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "localColeta" TEXT,
    "material" TEXT,
    "peso" REAL,
    "localDescarga" TEXT,
    "horarioColeta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "horarioEntrega" DATETIME,
    "dataCricao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualiacao" DATETIME NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "Entrega_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entrega" ("codigo", "dataAtualiacao", "dataCricao", "horarioColeta", "horarioEntrega", "localColeta", "localDescarga", "material", "peso", "usuarioId") SELECT "codigo", "dataAtualiacao", "dataCricao", "horarioColeta", "horarioEntrega", "localColeta", "localDescarga", "material", "peso", "usuarioId" FROM "Entrega";
DROP TABLE "Entrega";
ALTER TABLE "new_Entrega" RENAME TO "Entrega";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
