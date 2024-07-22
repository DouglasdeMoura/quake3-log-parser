-- Games table to store information about each game session
CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total_kills INTEGER NOT NULL DEFAULT 0,
    players JSON NOT NULL DEFAULT '[]',
    kills JSON NOT NULL DEFAULT '{}',
    kills_by_means JSON NOT NULL DEFAULT '{}',
);
