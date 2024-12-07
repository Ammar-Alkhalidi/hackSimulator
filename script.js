// Required dependencies
const readline = require("readline-sync"); // Module to read user input from the console
const clear = require("clear"); // Module to clear the console screen
const chalk = require("chalk"); // Module to add colors to console output
const systemScanLogs = require("./systemScanLogs.js"); // Logs to be displayed during the system scan
const bruteForceChallenges = require("./bruteForceChallenges.js"); // Challenges to be solved during brute force attack
const passwordList = require("./passwordList.js"); // List of passwords to be used during brute force attack
const firewallDecryptionKeys = require("./firewallDecryptionKeys.js"); // Decryption puzzles for level 2

// Constants for different delays in the game
const LOGIN_DELAY = 1000; // Delay between login actions in milliseconds
const LOG_MESSAGE_DELAY = 200; // Delay between displaying log messages in milliseconds
const DIALOGUE_DELAY = 2000; // Delay between displaying dialogue messages in milliseconds
const CHALLENGE_LOG_INTERVAL = 17; // Number of logs to show during a challenge
const PASSWORD_LOG_DELAY = 100; // Delay between testing passwords during brute force attack

const CLI_PROMPT = chalk.cyan("[kali@VenturoCorp]$ "); // The prompt symbol used for user commands

// Object to track the progress of each level in the game
const progress = {
  ...Object.fromEntries(
    Array.from({ length: 5 }, (_, i) => [`level${i + 1}`, false])
  ),
  isHacked: function () {
    return Object.values(this).every(
      (level) => typeof level === "boolean" && level
    );
  },
};

// Clear the console at the start of the game
clear();

// Display the title of the game
console.log(chalk.red.bold("=== Hack Simulator ==="));

// Predefined log messages that will be shown during login
const logMessages = [
  "Initializing secure connection...",
  "Establishing encrypted tunnel...",
  "Accessing remote server...",
  "Authenticating user credentials...",
  "Loading user environment...",
  "Verifying access level...",
  "Fetching secure assets...",
  "Decrypting files...",
  "Checking system integrity...",
  "Access granted.",
];

// Function to simulate typing after a prompt symbol, character by character
function typeAfterPrompt(prompt, text, callback) {
  process.stdout.write(prompt); // Display the initial prompt (e.g., "username: ")
  let index = 0;
  const typingInterval = setInterval(() => {
    if (index < text.length) {
      process.stdout.write(text[index]); // Display each character of the text one by one
      index++;
    } else {
      clearInterval(typingInterval); // Stop typing when all characters are displayed
      console.log(); // Add a new line after typing is complete
      callback(); // Call the callback function to continue the flow
    }
  }, 100); // Delay between each character typed
}

// Function to display logs in a shuffled order, one by one
function displayShuffledLogs(logs, callback) {
  const shuffledLogs = shuffle([...logs]); // Shuffle the log messages
  displayLogs(shuffledLogs, callback); // Display the shuffled log messages
}

// Function to shuffle the order of items in an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements randomly
  }
  return array;
}

// Function to simulate the login process
function simulateLogin() {
  console.clear();
  typeAfterPrompt(`${chalk.blue("username: ")}`, "cipher", () => {
    typeAfterPrompt(`${chalk.blue("password: ")}`, "**************", () => {
      setTimeout(() => {
        displayShuffledLogs(logMessages, () => {
          setTimeout(() => {
            console.clear();
            startGame(); // Start the game after successful login
          }, LOGIN_DELAY);
        });
      }, LOGIN_DELAY);
    });
  });
}

// Function to display logs without shuffling, one by one
function displayLogs(logs, callback) {
  let logIndex = 0;
  const logInterval = setInterval(() => {
    if (logIndex < logs.length) {
      console.log(chalk.green(logs[logIndex])); // Display each log message
      logIndex++;
    } else {
      clearInterval(logInterval); // Stop displaying logs when finished
      callback(); // Call the callback function to continue
    }
  }, LOG_MESSAGE_DELAY); // Delay between each log message
}

// Function to display dialogue messages with a delay between each message
function showDialogue(messages, delayBetween, callback) {
  let currentDelay = 0;
  messages.forEach((message, index) => {
    setTimeout(() => {
      console.log(chalk.yellow(message)); // Display each dialogue message in yellow
      if (index === messages.length - 1 && callback) {
        setTimeout(callback, delayBetween); // Call the callback function after the last message
      }
    }, currentDelay);
    currentDelay += delayBetween; // Increase the delay for each message
  });
}

// Function to dynamically adjust delays based on the number of steps
function dynamicDelay(baseDelay, numSteps) {
  return Math.max(100, baseDelay / numSteps); // Ensure a minimum delay of 100ms
}

// Function to start the main game sequence
function startGame() {
  console.log(chalk.bold("Welcome to the Hack Simulator."));

  const introMessages = [
    "> Cipher, you're in.",
    "> Welcome to VenturoCorp's external network.",
    "> This is the first step to infiltrating their systems.",
    "> We need to be careful—they have security layers all over the place.\n\n",
  ];

  showDialogue(introMessages, DIALOGUE_DELAY, () => {
    startVulnerabilityAssessment(); // Start vulnerability assessment after introduction
  });
}

// Function to start vulnerability assessment in the game
function startVulnerabilityAssessment() {
  let input = readline.question(
    chalk.yellow(
      "> Type 'scan_network' to begin vulnerability assessment...\n"
    ) + CLI_PROMPT
  );
  while (input.trim() !== "scan_network") {
    input = readline.question(
      chalk.red("> Invalid command. Please type 'scan_network' to begin.\n") +
        CLI_PROMPT
    );
  }
  console.clear();
  console.log(chalk.blueBright("Scan starting..."));
  displayLogs(systemScanLogs, () => {
    setTimeout(() => {
      console.clear();
      levelOne(); // Start level one after vulnerability assessment
    }, LOGIN_DELAY);
  });
}

// Function for Level One of the game
function levelOne() {
  const lvlOneIntroMsgs = [
    "> System ready for next steps.",
    "> Control: 'Cipher, we’ve found an entry point in VenturoCorp's database system,\n> but it’s locked behind a password-protected gateway. The only way in now is through brute force.'",
    "> We’ll need you to hammer this system until it gives up the password.",
    "> Control: 'You know the drill.\n> I’ll feed you the code; fix the flaws to keep the attack going. \n> Be sharp, and don’t waste time. \n> VenturoCorp's system is old, but it’ll still shut us out if we’re sloppy.'\n\n",
  ];

  showDialogue(lvlOneIntroMsgs, DIALOGUE_DELAY, () => {
    setTimeout(() => {
      let input = readline.question(
        chalk.yellow("> Type 'brute_force' to begin the attack...\n") +
          CLI_PROMPT
      );
      while (input.trim() !== "brute_force") {
        input = readline.question(
          chalk.red(
            "> Invalid command. Please type 'brute_force' to begin the attack.\n"
          ) + CLI_PROMPT
        );
      }
      console.clear();
      console.log(chalk.blueBright("Brute force attack starting..."));
      runBruteForce(
        passwordList.slice(-10), // Select the last 10 passwords from the list
        passwordList[Math.floor(Math.random() * 10)] // Pick a random password to be the correct one
      );
    }, dynamicDelay(DIALOGUE_DELAY, lvlOneIntroMsgs.length));
  });
}

// Function to run brute force attack
function runBruteForce(passwords, actualPassword) {
  let attemptCounter = 0;
  const challenges = shuffle([...bruteForceChallenges]).slice(0, 5); // Select 5 random challenges

  function bruteForceAttempt() {
    if (attemptCounter < 5) {
      console.log(
        chalk.blue(`Testing password: ${passwords[attemptCounter]}...`)
      );
      console.log(chalk.red("Password failed..."));
      attemptCounter++;
      setTimeout(bruteForceAttempt, PASSWORD_LOG_DELAY); // Attempt the next password
    } else if (challenges.length > 0) {
      handleChallenge(challenges, bruteForceAttempt, passwords); // If attempts fail, handle a challenge
    } else {
      finalizeBruteForce(actualPassword); // Finalize if all attempts and challenges are done
    }
  }

  bruteForceAttempt(); // Start the brute force attempts
}

// Function to handle challenges during brute force attack
function handleChallenge(challenges, callback, passwords) {
  const challengeIndex = Math.floor(Math.random() * challenges.length);
  const challenge = challenges.splice(challengeIndex, 1)[0];

  console.log(chalk.yellow(`\nChallenge: ${challenge.question}`));
  console.log(chalk.yellow(`Code: ${challenge.questionCode}`));

  let input = readline.question(chalk.yellow("Fix the code: \n") + CLI_PROMPT);
  if (input.trim() === challenge.answer.trim()) {
    console.log(chalk.green("Challenge completed!")); // Correct answer
  } else {
    console.log(chalk.red("Incorrect. Try again.")); // Incorrect answer, challenge remains
    challenges.push(challenge); // Add the challenge back to the list to retry later
  }

  setTimeout(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < CHALLENGE_LOG_INTERVAL) {
        console.log(
          chalk.blue(
            `Testing password: ${passwords[logIndex % passwords.length]}...`
          )
        );
        console.log(chalk.red("Password failed..."));
        logIndex++;
      } else {
        clearInterval(logInterval);
        callback(); // Continue after challenge
      }
    }, PASSWORD_LOG_DELAY);
  }, PASSWORD_LOG_DELAY);
}

// Function to finalize the brute force attack
function finalizeBruteForce(actualPassword) {
  console.log(chalk.green(`Password cracked: ${actualPassword}`)); // Correct password found
  progress.level1 = true; // Mark level one as complete
  setTimeout(() => {
    console.clear();
    console.log(chalk.green("Access granted."));
    levelTwo(); // Proceed to level two
  }, LOGIN_DELAY);
}

// Function for Level Two of the game
function levelTwo() {
  console.log(chalk.blue("Level Two starting..."));

  const lvlTwoIntroMsgs = [
    "> Nice work on cracking that password, Cipher. But don’t get too comfortable.",
    "> You’ve made it into the database, but there’s a second line of defense—a firewall separating you from their core data.",
    "> This firewall is custom-built. It’s not going to roll over easily, so you’ll need to do more than just brute force your way through.",
    "> First, we need to analyze the firewall rules and find an opening. We’ll need to manipulate IP addresses and spoof legitimate credentials.",
    "> Type 'view_firewall_rules' to analyze the firewall.\n",
  ];

  showDialogue(lvlTwoIntroMsgs, DIALOGUE_DELAY, () => {
    startFirewallAnalysis();
  });
}

// Function to start the firewall analysis
function startFirewallAnalysis() {
  let input = readline.question(
    chalk.yellow("> Type 'view_firewall_rules' to analyze the firewall...\n") +
      CLI_PROMPT
  );
  while (input.trim() !== "view_firewall_rules") {
    input = readline.question(
      chalk.red(
        "> Invalid command. Please type 'view_firewall_rules' to proceed.\n"
      ) + CLI_PROMPT
    );
  }
  console.clear();
  console.log(
    chalk.blueBright("Firewall Rules Loaded... VenturoFirewall v.4.2")
  );
  const firewallRules = [
    "Rule 1: Block all incoming traffic except from internal IPs (192.168.x.x).",
    "Rule 2: Allow traffic only from trusted devices.",
    "Rule 3: Block repeated requests from a single IP address.",
    "Rule 4: Log all unauthorized access attempts.",
  ];
  firewallRules.forEach((rule) => {
    console.log(chalk.green(rule)); // Display each firewall rule
  });
  setTimeout(() => {
    console.clear();
    startDecryptionPuzzles();
  }, LOGIN_DELAY);
}

// Function to start decryption puzzles
function startDecryptionPuzzles() {
  console.log(
    chalk.yellow("The firewall is a bit more sophisticated than we thought.")
  );
  console.log(
    chalk.yellow(
      "It has encrypted security keys that authenticate internal devices. We need to decrypt these keys to spoof our IP."
    )
  );
  console.log(
    chalk.yellow(
      "Type 'solve_decryption_keys' to begin the decryption process.\n"
    )
  );

  let input = readline.question(CLI_PROMPT);
  while (input.trim() !== "solve_decryption_keys") {
    input = readline.question(
      chalk.red(
        "> Invalid command. Please type 'solve_decryption_keys' to proceed.\n"
      ) + CLI_PROMPT
    );
  }
  console.clear();
  runDecryptionPuzzles();
}

// Function to run decryption puzzles
function runDecryptionPuzzles() {
  const fixedPuzzles = firewallDecryptionKeys.slice(0, 5); // First 5 fixed puzzles
  const randomPuzzles = shuffle(firewallDecryptionKeys.slice(5)).slice(0, 5); // Randomly select 5 more puzzles
  const puzzles = [...fixedPuzzles, ...randomPuzzles];

  let puzzleIndex = 0;

  function solveNextPuzzle() {
    if (puzzleIndex < puzzles.length) {
      const puzzle = puzzles[puzzleIndex];
      console.log(
        chalk.yellow(
          `\n[Log] Decrypting Security Key: '${puzzle.scrambledWord}'`
        )
      );
      puzzle.options.forEach((option, index) => {
        console.log(chalk.yellow(`${index + 1}. ${option}`));
      });

      let answer = readline.question(CLI_PROMPT);
      while (
        !["1", "2", "3"].includes(answer.trim()) ||
        puzzle.options[parseInt(answer.trim()) - 1] !== puzzle.answer
      ) {
        console.log(chalk.red("Incorrect. Try again."));
        answer = readline.question(CLI_PROMPT);
      }

      console.log(chalk.green("Decryption successful."));
      puzzleIndex++;
      setTimeout(solveNextPuzzle, DIALOGUE_DELAY);
    } else {
      finalizeLevelTwo();
    }
  }

  solveNextPuzzle();
}

// Function to finalize Level Two
function finalizeLevelTwo() {
  console.log(
    chalk.green(
      "\n[Log] Decrypted enough keys. Firewall is letting us through."
    )
  );
  console.log(
    chalk.green(
      "[Log] Spoofing IP address complete. Access granted to VenturoCorp's internal network."
    )
  );
  console.log(
    chalk.yellow(
      "\nType 'access_internal_network' to proceed to the next level.\n"
    )
  );

  let input = readline.question(CLI_PROMPT);
  while (input.trim() !== "access_internal_network") {
    input = readline.question(
      chalk.red(
        "> Invalid command. Please type 'access_internal_network' to proceed.\n"
      ) + CLI_PROMPT
    );
  }
  console.clear();
  console.log(chalk.green("Accessing internal network..."));
  progress.level2 = true; // Mark level two as complete
  setTimeout(() => {
    handleGameEnding();
  }, LOGIN_DELAY);
}

// Function to handle the end game sequence
function handleGameEnding() {
  console.clear();
  console.log(chalk.red.bold("=== Level 4: Final Breach ==="));
  console.log(chalk.yellow("You’ve reached the core of VenturoCorp’s system."));
  console.log(chalk.yellow("The final commands must be executed with precision to fully compromise the network.\n"));

  const finalCommands = [
    { command: "cd final_layer", hint: "Accessing final layer...", color: chalk.cyan },
    { command: "run secure_breach_protocol", hint: "Initiating breach protocol...", color: chalk.magenta },
    { command: 'echo "system compromised" > flag.txt', hint: "Writing to flag file...", color: chalk.green },
  ];
  
  let commandIndex = 0;

  function executeCommand() {
    if (commandIndex < finalCommands.length) {
      const currentCommand = finalCommands[commandIndex];
      let input = readline.question(`${CLI_PROMPT}`);

      while (input.trim() !== currentCommand.command) {
        console.log(chalk.red("> Invalid command. Please try again.\n"));
        input = readline.question(CLI_PROMPT);
      }

      console.clear();
      console.log(currentCommand.color(currentCommand.hint));
      commandIndex++;
      setTimeout(executeCommand, DIALOGUE_DELAY);
    } else {
      endGame();
    }
  }

  executeCommand();
}

// Function to clear the screen and display ending credits
function endGame() {
  console.clear();
  console.log(chalk.red.bold("=== System Breached Successfully! ==="));
  console.log(chalk.green("Congratulations, you have completed Hack Simulator."));
  console.log(chalk.yellow("\n>> Finalizing secure breach..."));
  setTimeout(() => {
    console.clear();
    console.log(chalk.cyan.bold("\n== Credits =="));
    console.log(chalk.cyan("Developed by: Yousif Paulus"));
    console.log(chalk.cyan("Debuging by: Ammar Alkhalidi"));
    console.log(chalk.cyan("VenturoCorp Systems Compromised"));
    process.exit();
  }, LOGIN_DELAY * 2);
}

// Start the login simulation to begin the game
simulateLogin();

