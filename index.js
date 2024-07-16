// index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importation du module CORS
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes en JSON
app.use(express.json());

// Configuration de CORS pour autoriser plusieurs origines
const allowedOrigins = ['http://localhost:5173', 'https://recipify-mu.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
        // Autoriser les requêtes sans origine (comme les requêtes internes)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Chemin absolu vers le fichier db.json
const dbFilePath = path.join(__dirname, 'db.json');

// Route de base
app.get('/', (req, res) => {
    res.send('Bienvenue à l\'API de recettes de cuisine!');
});

// Route pour récupérer les recettes
app.get('/recettes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur de lecture du fichier' });
        }
        res.json(JSON.parse(data));
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
