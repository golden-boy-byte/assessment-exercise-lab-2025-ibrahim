interface ExportConfiguration<T> {
  data: T[];
  filename: string;
  columns: { label: string; value: (row: T) => T[keyof T] }[];
}

export default function exportListAsXML<T>(
  configuration: ExportConfiguration<T>
) {
  const { data, columns, filename } = configuration;

  if (!data.length) return;

  const xmlRows = data
    .map((row) => {
      const xmlColumns = columns
        .map((c) => {
          const value = c.value(row);
          const escaped = String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
          return `    <${c.label}>${escaped}</${c.label}>`;
        })
        .join("\n");

      return `  <row>\n${xmlColumns}\n  </row>`;
    })
    .join("\n");

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n${xmlRows}\n</rows>`;

  const blob = new Blob([xmlContent], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    filename.endsWith(".xml") ? filename : `${filename}.xml`
  );

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
