#étape prérequis
- npm c'est le gestionnaire de package javascript. C'est l'équivalent de pip pour python. Comme pip il te permet de faire des packages ou librairies mais en javascript. Un projet node js n'est ni plus ni moins qu'un package javascript qui utilise node js comme envirennement d'exécution
https://www.npmjs.com/

#étapes à suivre avant de lancer le projet:
- installer les node module via le terminal à la racine du projet via "npm install"
- initialiser tes variables d'environnement => va à la racine de ton projet et dans le terminal fais "touch .env" puis "nano .env" (commandes linux, respectivement "type nul > .env" et "bash -c "nano .env" sous windows) et écrit :
PORT=4200
URL_FRONT='http://localhost'
SESSION_SECRET='my_secret'
DATABASE='mongoDB'

=> les node modules sont des dépendances dont ton projet a besoin pour tourner, des "packages" ou "librairies" javascript que tu utilises si tu préfères. ça ne sert à rien de les mettres sur le git dans le cloud car le git doit just te permettre de récupérer le code source. c'est à l'utilisateurs de les installer dans son environnement. C'est pour ça que j'ai mis node_modules dans le fichier .gitignore

=> même chose pour les variables d'environnement. Elle dépendent de tes choix de développement. Ici je t'ai laissé le choix de choisir le port sur lequel ton serveur va écouter pour récupérer les requêtes (j'ai choisi arbitrairement 4200) , url_front c'est l'adresse du front avec lequel communique ton back, SESSION_SECRET c'est un string qui te permet de chiffrer tes cookies et database te permet de choisir quelle base de donnée utiliser (je t'ai fais les fichiers de set up pour mongoDB donc pour l'instant tu n'as que mongoDB)
ducoup pareil ça part dans le .gitignore

#architecture du projet
pour mon back j'ai adopté une architecture "MVC+S" pour Model-Vue-Controller + Service
https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur

#lancer le projet
pour lancer le projet tu dois dans le terminal au niveau du fichier index.js lancer la commande "node index.js"
mais comme c'est un projet packagé via npm tu peux te mettre à la racine du projet (soit au niveau de package.json) et lancer "npm run start"

=> le fichier package.json contient toutes les caractéristiques du package javascript
