const tasks = [
    "Faire les courses",
    "Répondre aux e-mails",
    "Terminer le rapport",
    "Prendre rendez-vous",
    "Préparer le dîner",
    "Regarder un film",
  ];
  
  export default function handler(req, res) {
    res.status(200).json(tasks);
  }
  