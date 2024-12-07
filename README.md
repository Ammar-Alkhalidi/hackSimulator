
# Hack Simulator

**Hack Simulator** is a console-based game that immerses the player in a hacker-like environment, simulating the infiltration of a fictional company's system. The game is built in Node.js and uses various dependencies to enhance the hacking experience.

## Overview
In **Hack Simulator**, you play as "Cipher", a skilled hacker trying to breach the systems of "VenturoCorp". The game guides you through various levels with increasing difficulty, including simulated logins, brute force attacks, firewall analysis, and decryption challenges. Each level involves unique interactions and challenges that must be solved to advance further into the system.

## Features
- **Realistic Hacking Environment**: The game simulates typing, command inputs, and system responses, creating an immersive experience.
- **Brute Force and Puzzle Challenges**: To pass through security layers, players must solve code-based challenges and successfully brute-force passwords.
- **Firewall and Decryption Levels**: Higher levels introduce new obstacles like firewall analysis and decryption puzzles, requiring careful strategy.
- **Customizable Game Flow**: The modular code structure allows for easy addition of new challenges and levels.

## Dependencies
To play Hack Simulator, you'll need the following npm packages:
- `readline-sync`: For reading user input from the console.
- `clear`: To clear the console between stages.
- `chalk`: Adds color to the console output for a more immersive experience.

Install these dependencies using:
```bash
npm install readline-sync clear chalk
```

## Getting Started
1. **Clone the repository**:
    ```bash
    git clone https://github.com/yousifpa98/hackSimulator
    ```
2. **Navigate to the project directory**:
    ```bash
    cd hack-simulator
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Run the game**:
    ```bash
    node hackSimulator.js
    ```

## Code Structure
- **`hackSimulator.js`**: Main game file containing the logic for each level and the overall game progression.
- **`systemScanLogs.js`**: Contains logs displayed during the system scan.
- **`bruteForceChallenges.js`**: Houses challenges encountered during brute force attacks.
- **`passwordList.js`**: List of passwords used for brute force attempts.
- **`firewallDecryptionKeys.js`**: Decryption puzzles for firewall level.

## How to Play
1. Start the game with `node hackSimulator.js`.
2. Follow the on-screen instructions. Each level will require different commands to progress, which will be prompted as you play.
3. Complete challenges to advance through the game levels.

## License
MIT License

---

Enjoy hacking!
Developed by : Yousif Paulus    https://github.com/yousifpa98/hackSimulator
Debuging by  : Ammar Alkhalidi  https://github.com/Ammar-Alkhalidi
