# Quake Log Parser

## Overview

This project is a robust Quake 3 Arena log parser that processes game logs and generates detailed statistics. It's designed to handle large log files efficiently using Node.js streams, providing real-time data processing and analysis.

## Features

- Parses Quake 3 Arena log files;
- Generates detailed statistics for each game, including:
  - Total kills;
  - Player list;
  - Individual player kills;
  - Kills by means (weapons/methods).
- Streams results in real-time;
- Highly efficient, capable of handling large log files;
- Fully tested with comprehensive unit tests.

## Installation

1. Ensure you have Node.js installed on your system.
2. Clone this repository:

```
git clone https://github.com/douglasdemoura/quake3-log-parser.git
```

3. Navigate to the project directory:

```
cd quake3-log-parser
```

4. Install dependencies:

```
npm install
```

## Usage

### As a Module

```javascript
import { GameStatistics } from "./lib/game-statistics.js";
import fs from "node:fs";

const gameStats = new GameStatistics("./src/database/qgames.txt");

const outputStream = fs.createWriteStream("./output.json");

let isFirstGame = true;

gameStats
  .processLog()
  .on("data", (chunk) => {
    if (!isFirstGame) {
      outputStream.write(",\n");
    } else {
      outputStream.write("[\n");
      isFirstGame = false;
    }
    outputStream.write(chunk);
  })
  .on("end", () => {
    // Write the closing bracket of the JSON array
    outputStream.write("\n]");
    outputStream.end();
    console.log("Processing complete. Results written to output.json");
  })
  .on("error", (error) => {
    console.error("Error processing log:", error);
  });
```

The result will be written to `output.json` file.

## Testing

Run the comprehensive test suite with:

```
npm test
```

## Generating reports

To generate a report, run the following command:

```
npm run generate-report
```

This will process the log file located at `src/database/qgames.txt`, generate a JSON file with the statistics and print the results to the console.

## Demo

[![asciicast](https://asciinema.org/a/91eexxafmShEevrSBl2puE9Tj.svg)](https://asciinema.org/a/91eexxafmShEevrSBl2puE9Tj)

## API Reference

### `GameStatistics` Class

#### Constructor

```javascript
new GameStatistics(logFilePath);
```

- `logFilePath`: Path to the Quake 3 Arena log file

#### Methods

- `processLog()`: Starts processing the log file and returns a readable stream;
- `on('data', callback)`: Event emitted for each processed game;
- `on('end', callback)`: Event emitted when log processing is complete;
- `on('error', callback)`: Event emitted if an error occurs during processing;
- `on('playerAdded', callback)`: Event emitted when a player is added to the current game being processed;
- `on('gameAdded', callback)`: Event emitted when a game has been processed and added to the statistics;

## Project Structure

```
quake-log-parser/
├── src/
│   ├── lib/
│   │   └── game-statistics.js
│   ├── database/
│   │   └── qgames.txt
│   └── index.js
├── tests/
│   └── lib/
│       └── game-statistics.test.js
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Quake 3 Arena for providing the inspiration and log format;
- Node.js for the powerful streaming capabilities.
