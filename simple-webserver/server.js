// Import der benötigten Node.js Module
import http from 'node:http';
import createFileWithMessage from '../read-and-write/write.js';
import deleteFileByName from '../read-and-write/delete.js';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

// Handler für GET /files/{filename} - liest Datei vom Dateisystem
const getFile = async (req, res) => {
  // Entfernt "/files/" (7 Zeichen) aus der URL um den Dateinamen zu erhalten
  const filepath = req.url.slice(7);
  const myPath = path.join(import.meta.dirname, filepath);

  try {
    // Liest Datei asynchron als UTF-8 Text
    const data = await readFile(myPath, 'utf8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ data }));
  } catch {
    // Bei Fehler (z.B. Datei nicht gefunden) wird 404 zurückgegeben
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'File not found' }));
  }
};

// Handler für POST /files - erstellt neue Datei mit übergebener Nachricht
const handleFile = async (req, res) => {
  // Sammelt alle Daten-Chunks aus dem Request Body
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  // Kombiniert Chunks zu einem JSON-Objekt
  const body = JSON.parse(Buffer.concat(chunks).toString());
  const isSuccess = await createFileWithMessage(body.message);

  if (isSuccess) {
    res.statusCode = 201; // Created
  } else {
    res.statusCode = 500; // Internal Server Error
  }
  res.end();
};

// Handler für DELETE /files/{filename} - löscht spezifische Datei
const handleFileDeletion = async (req, res) => {
  // Extrahiert Dateiname aus URL
  const filepath = req.url.slice(7);

  const isSuccess = await deleteFileByName(filepath);

  if (isSuccess) {
    res.statusCode = 204; // No Content (erfolgreich gelöscht)
  } else {
    res.statusCode = 500; // Internal Server Error
  }
  res.end();
};

// Fallback für nicht gefundene URLs
const handleNotFound = (req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'URL not found: ' + req.url }));
};

// Hauptfunktion die alle HTTP-Requests verarbeitet
const requestHandler = async (req, res) => {
  const { method, url } = req;

  if (method === 'POST') {
    if (url === '/files') {
      // POST /files
      handleFile(req, res);
    } else {
      handleNotFound(req, res);
    }
  } else if (method === 'DELETE') {
    // DELETE /files/filename
    if (url.startsWith('/files/')) {
      handleFileDeletion(req, res);
    } else {
      handleNotFound(req, res);
    }
  } else if (method === 'GET') {
    // GET /files/filename
    if (url.startsWith('/files/')) {
      getFile(req, res);
    } else {
      handleNotFound(req, res);
    }
  } else {
    // Nicht unterstützte HTTP-Methoden
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
};

// Erstellt HTTP-Server mit der Request-Handler-Funktion
const server = http.createServer(requestHandler);

// Startet Server auf Port 3000
server.listen(3000, () => console.log('A Simple Web Server auf port 3000'));
