// index.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes en JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    res.send('Bienvenue à l\'API de recettes de cuisine!');
});

// Route pour récupérer les recettes
app.get('/recettes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
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
