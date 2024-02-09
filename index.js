const Eris = require("eris");
const fs = require("fs"); // Import the file system module
const keep_alive = require('./keep_alive.js');

// Replace TOKEN with your bot account's token
const bot = new Eris(process.env.token);

const targetChannelId = 1200747293033382051;
const logFilePath = "logs.json"; // Path to the log file

// Function to load the logs from the file
function loadLogs() {
 try {
   const logsContent = fs.readFileSync(logFilePath, "utf-8");
   const logs = logsContent.split("\n").map((line) => {
     const parts = line.split("-").map((part) => part.trim());
     const timestamp = parseInt(parts[0]);
     const number = parseInt(parts[2]);
     return { timestamp, number };
   });
   return logs;
 } catch (err) {
   console.error("Error loading logs:", err);
   return [];
 }
}

// Function to predict the next number based on the logs (replace with your prediction logic)
function predictNextNumber(logs) {
 // Example implementation: Predict the most frequent number in the logs
 const numberCounts = {};
 logs.forEach((log) => {
   numberCounts[log.number] = (numberCounts[log.number] || 0) + 1;
 });
 const mostFrequentNumber = Object.entries(numberCounts)
   .sort(([, countA], [, countB]) => countB - countA)[0][0];
 return mostFrequentNumber;
}

bot.on("error", (err) => {
 console.error(err); // or your preferred logger
});

bot.connect(); // Get the bot to connect to Discord

bot.on("messageCreate", (message) => {
 if (message.channel.id === targetChannelId) {
   const content = message.content.trim();

   // Check if the message contains a number between 0 and 100
   const number = parseInt(content);
   if (!isNaN(number) && number >= 0 && number <= 100) {
     // Log the received number
     const logEntry = `${Date.now()} - Received number: ${number}`;
     fs.appendFileSync(logFilePath, logEntry + "\n");

     // Load the logs
     const logs = loadLogs();

     // Predict the next number based on the logs
     const predictedNumber = predictNextNumber(logs);

     // Send the predicted number to the channel
     message.channel.send(`The next number could be: <span class="math-inline">\{predictedNumber\}\`\);
// Log the predicted number
const predictionLogEntry \= \`</span>{Date.now()} - Predicted number: ${predictedNumber}`;
     fs.appendFileSync(logFilePath, predictionLogEntry + "\n");
   }
 }
});

// Keep the bot alive (if applicable)
keep_alive();
