FROM node:18 AS base

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Abhängigkeiten kopieren
COPY package.json package-lock.json ./

# Abhängigkeiten installieren
RUN npm install

# Source-Code kopieren
COPY . .

# Entwicklungsserver starten
CMD ["npm", "run", "dev", "--", "--host"]
