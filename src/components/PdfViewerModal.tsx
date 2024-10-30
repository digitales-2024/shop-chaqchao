// src/components/PdfViewerDialog.tsx

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Document, Page, pdfjs } from "react-pdf";

// Configure the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerDialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
  pdfData: Blob;
  onDownload: () => void;
}

export const PdfViewerDialog: React.FC<PdfViewerDialogProps> = ({
  isOpen,
  onRequestClose,
  pdfData,
  onDownload,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: any) {
    setNumPages(nextNumPages);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onRequestClose()}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Vista previa del pedido</DialogTitle>
        </DialogHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Button onClick={onRequestClose}>Cerrar</Button>
          <Button onClick={onDownload}>Descargar</Button>
        </div>
        {error ? (
          <div>
            <p>Error al cargar el PDF: {error}</p>
          </div>
        ) : (
          <div style={{ overflow: "auto", height: "600px" }}>
            <Document
              file={pdfData}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(err) => {
                console.error("Error while loading document:", err);
                setError("No se pudo cargar el PDF.");
              }}
            >
              {Array.from(new Array(numPages || 0), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                />
              ))}
            </Document>
          </div>
        )}
        <DialogFooter>
          {
            <div className="pt-8">
              <p>© CHAQCHAO 2024</p>
            </div>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
