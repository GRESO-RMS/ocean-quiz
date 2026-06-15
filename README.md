# 🌊 Ocean Quiz — Staff

Quiz interattivo sul tema oceano per il mese di giugno.  
20 domande, classifica per punteggio + tempo, premi per i migliori.

---

## Deploy su Render (5 minuti)

### 1. Carica su GitHub

```bash
git init
git add .
git commit -m "Ocean Quiz initial commit"
git remote add origin https://github.com/TUO_USERNAME/ocean-quiz.git
git push -u origin main
```

### 2. Crea il database PostgreSQL su Render

- Vai su [render.com](https://render.com) → **New** → **PostgreSQL**
- Nome: `ocean-quiz-db`
- Plan: **Free**
- Crea e copia la **Connection String** (Internal)

### 3. Crea il Web Service su Render

- **New** → **Web Service**
- Collega il tuo repo GitHub `ocean-quiz`
- Impostazioni:
  - **Runtime:** Node
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`
  - **Plan:** Free
- **Environment Variables:**
  - `DATABASE_URL` → incolla la connection string del database
  - `NODE_ENV` → `production`
- Clicca **Create Web Service**

### 4. Aspetta il deploy (2-3 min)

La tabella del database viene creata automaticamente al primo avvio.  
La tua URL sarà tipo: `https://ocean-quiz-xxxx.onrender.com`

---

## Funzionalità

- ✅ 20 domande sull'oceano in italiano
- ✅ Timer globale (registra tempo totale, non per domanda)
- ✅ Classifica pubblica in tempo reale (punteggio + tempo)
- ✅ Medaglie 🥇🥈🥉 per i primi tre
- ✅ Evidenziazione del proprio risultato nella classifica
- ✅ Design ocean-themed con animazioni
- ✅ Funziona su mobile e desktop
- ✅ Nessuna registrazione richiesta dagli utenti

---

## Come vincono i premi?

Dopo 14 giorni, vai su:  
`https://TUA-URL.onrender.com/api/leaderboard`

Oppure guarda la classifica direttamente nell'app.  
I vincitori sono ordinati per: **punteggio più alto → tempo minore**.

---

## Struttura progetto

```
ocean-quiz/
├── public/
│   └── index.html      ← Frontend completo (HTML + CSS + JS)
├── src/
│   └── server.js       ← Backend Express + PostgreSQL
├── package.json
├── render.yaml
└── .env.example
```
