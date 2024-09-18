const player = require('../models/players');

// Default sport values
const predefinedSports = [
    { name: 'Volleyball', wins: 0, losses: 0 },
    { name: 'Spikeball', wins: 0, losses: 0 },
    { name: 'Basketball', wins: 0, losses: 0 }
];


exports.landing = async (req, res) => {
    res.render('better');
}

exports.findPlayer = async (req, res) => {
    const players = await player.find();

        // Render the players data to a view template
        res.render('players', { players });
};

exports.addPlayer = async (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    const athlete = new player({
        name, 
        sports: predefinedSports
    });
    athlete.save()
      .then(result => {
        res.redirect('/players');
      })
      .catch(err => {
        console.log(err);
      });
  };
  

exports.findVolleyPlayer =  async (req, res) => {
    const players = await player.find();
    const volleyballPlayers = players.map(player => {
        const volleyballData = player.sports.find(sport => sport.name === "Volleyball");
        return {
            name: player.name,
            volleyball: volleyballData
        };
    });
        // Render the players data to a view template
        res.render('volleyball', { players: volleyballPlayers });
};

exports.volleyForm = async (req, res) => {
    const { teamSize, winner } = req.body;
    const team1Players = [];
    const team2Players = [];

    for (let i = 1; i <= teamSize; i++) {
        team1Players.push(req.body[`team1Player${i}`]);
        team2Players.push(req.body[`team2Player${i}`]);
    }

    const winningTeam = winner === 'team1' ? team1Players : team2Players;
    const losingTeam = winner === 'team1' ? team2Players : team1Players;

    try {
        // Update players in the winning team
        for (let playerName of winningTeam) {
            await player.findOneAndUpdate(
                { name: playerName, 'sports.name': 'Volleyball' },
                { $inc: { 'sports.$.wins': 1 } },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }

        // Update players in the losing team
        for (let playerName of losingTeam) {
            await player.findOneAndUpdate(
                { name: playerName, 'sports.name': 'Volleyball' },
                { $inc: { 'sports.$.losses': 1 } },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }
        console.log("game recorded!");
        res.redirect('/volleyball');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error recording the game');
    }
};

exports.spikeballPlayer = async (req, res) => {
    const players = await player.find();
    const spikeballPlayers = players.map(player => {
        const spikeballData = player.sports.find(sport => sport.name === "Spikeball");
        return {
            name: player.name,
            spikeball: spikeballData
        };
    });
        // Render the players data to a view template
        res.render('spikeball', { players: spikeballPlayers });
};
// Route to handle the form submission
exports.spikeballForm = async (req, res) => {
    const { teamSize, winner } = req.body;
    const team1Players = [];
    const team2Players = [];

    for (let i = 1; i <= teamSize; i++) {
        team1Players.push(req.body[`team1Player${i}`]);
        team2Players.push(req.body[`team2Player${i}`]);
    }

    const winningTeam = winner === 'team1' ? team1Players : team2Players;
    const losingTeam = winner === 'team1' ? team2Players : team1Players;

    try {
        // Update players in the winning team
        for (let playerName of winningTeam) {
            await player.findOneAndUpdate(
                { name: playerName, 'sports.name': 'Spikeball' },
                { $inc: { 'sports.$.wins': 1 } },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }

        // Update players in the losing team
        for (let playerName of losingTeam) {
            await player.findOneAndUpdate(
                { name: playerName, 'sports.name': 'Spikeball' },
                { $inc: { 'sports.$.losses': 1 } },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }
        console.log("game recorded!");
        res.redirect('/spikeball');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error recording the game');
    }
};
exports.basketballPlayer = async (req, res) => {
    const players = await player.find();
    const basketballPlayers = players.map(player => {
        const basketballData = player.sports.find(sport => sport.name === "Basketball");
        return {
            name: player.name,
            basketball: basketballData
        };
    });
        // Render the players data to a view template
        res.render('basketball', { players: basketballPlayers });
};
exports.basketballForm = async (req, res) => {
    const { teamSize, winner } = req.body;
    const team1Players = [];
    const team2Players = [];

    for (let i = 1; i <= teamSize; i++) {
        team1Players.push(req.body[`team1Player${i}`]);
        team2Players.push(req.body[`team2Player${i}`]);
    }

    const winningTeam = winner === 'team1' ? team1Players : team2Players;
    const losingTeam = winner === 'team1' ? team2Players : team1Players;

    try {
        // Update players in the winning team
        for (let playerName of winningTeam) {
            await player.findOneAndUpdate(
                { name: playerName, 'sports.name': 'Basketball' },
                { $inc: { 'sports.$.wins': 1 } },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }

        // Update players in the losing team
        for (let playerName of losingTeam) {
            await player.findOneAndUpdate(
                { name: playerName, 'sports.name': 'Basketball' },
                { $inc: { 'sports.$.losses': 1 } },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }
        console.log("game recorded!");
        res.redirect('/basketball');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error recording the game');
    }
};