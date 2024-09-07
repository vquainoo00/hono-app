type Role = 'Mafia' | 'Villager';
type Status = 'Alive' | 'Dead';

interface Player {
  name: string;
  role: Role;
  status: Status;
}

class MafiaGame {
  players: Player[] = [];
  nightPhase: boolean = true;

  constructor(playerNames: string[]) {
    this.initializePlayers(playerNames);
  }

  initializePlayers(playerNames: string[]) {
    // Randomly assign roles
    const mafiaCount = Math.floor(playerNames.length / 3);
    const roles: Role[] = Array(mafiaCount).fill('Mafia').concat(
      Array(playerNames.length - mafiaCount).fill('Villager')
    );

    // Shuffle roles
    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    // Create players
    this.players = playerNames.map((name, index) => ({
      name,
      role: roles[index],
      status: 'Alive'
    }));
  }

  startNightPhase() {
    console.log("Night falls. The Mafia are choosing their victim...");
    // Mafia choose a victim
    const aliveVillagers = this.players.filter(p => p.role === 'Villager' && p.status === 'Alive');
    const victim = aliveVillagers[Math.floor(Math.random() * aliveVillagers.length)];

    if (victim) {
      victim.status = 'Dead';
      console.log(`${victim.name} was found dead in the morning.`);
    } else {
      console.log("No villagers left to kill.");
    }

    this.nightPhase = false;
  }

  startDayPhase() {
    console.log("Day breaks. The town must vote to eliminate a suspect.");
    // All alive players vote
    const alivePlayers = this.players.filter(p => p.status === 'Alive');
    const suspect = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];

    if (suspect) {
      suspect.status = 'Dead';
      console.log(`${suspect.name} was eliminated by the town.`);
    }

    this.nightPhase = true;
  }

  checkGameOver() {
    const aliveMafia = this.players.filter(p => p.role === 'Mafia' && p.status === 'Alive').length;
    const aliveVillagers = this.players.filter(p => p.role === 'Villager' && p.status === 'Alive').length;

    if (aliveMafia === 0) {
      console.log("All Mafia are dead. Villagers win!");
      return true;
    }

    if (aliveMafia >= aliveVillagers) {
      console.log("Mafia outnumber villagers. Mafia win!");
      return true;
    }

    return false;
  }

  playRound() {
    if (this.nightPhase) {
      this.startNightPhase();
    } else {
      this.startDayPhase();
    }

    return this.checkGameOver();
  }
}

// Example game setup
const playerNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'];
const game = new MafiaGame(playerNames);

// Play rounds until the game is over
while (!game.playRound()) {
  console.log("Next round begins...");
}
