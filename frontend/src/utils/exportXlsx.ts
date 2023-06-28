import * as XLSX from "xlsx";

interface ExportXlsxProps<T> {
  data: T[];
  filename: string;
}

export async function exportXlsx<T>({ data, filename }: ExportXlsxProps<T>) {
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "aba");
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, `${filename}.xlsx`);
}
