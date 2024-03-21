# Utiliser une image Node.js comme base
FROM node:alpine

# Étape 2: Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3: Copier le fichier package.json (et package-lock.json, si disponible) pour installer les dépendances
COPY package*.json ./

# Étape 4: Installer les dépendances du projet
RUN npm install

# Étape 5: Copier le fichier serverPROD.js spécifique dans le répertoire de travail du conteneur
COPY . .

# Étape 6: Exposer le port sur lequel votre application va écouter
EXPOSE 25565

# Étape 7: Définir la commande pour démarrer l'application en utilisant serverPROD.js
CMD [ "node", "serverPROD.js" ]