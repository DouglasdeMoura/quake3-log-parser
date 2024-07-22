-- Games table to store information about each game session
CREATE TABLE games (
    game_id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time TEXT,
    end_time TEXT,
    map_name TEXT,
    game_type INTEGER,
    frag_limit INTEGER,
    time_limit INTEGER,
    server_name TEXT
);

-- Players table to store information about players
CREATE TABLE players (
    player_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

-- Game_players table to associate players with games and store their stats
CREATE TABLE game_players (
    game_player_id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    player_id INTEGER,
    connect_time TEXT,
    disconnect_time TEXT,
    kills INTEGER DEFAULT 0,
    deaths INTEGER DEFAULT 0,
    suicides INTEGER DEFAULT 0,
    FOREIGN KEY (game_id) REFERENCES games (game_id),
    FOREIGN KEY (player_id) REFERENCES players (player_id)
);

-- Kills table to store detailed information about each kill
CREATE TABLE kills (
    kill_id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    killer_id INTEGER,
    victim_id INTEGER,
    weapon TEXT,
    time TEXT,
    FOREIGN KEY (game_id) REFERENCES games (game_id),
    FOREIGN KEY (killer_id) REFERENCES players (player_id),
    FOREIGN KEY (victim_id) REFERENCES players (player_id)
);

-- Items table to store information about item pickups
CREATE TABLE items (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    player_id INTEGER,
    item_name TEXT,
    time TEXT,
    FOREIGN KEY (game_id) REFERENCES games (game_id),
    FOREIGN KEY (player_id) REFERENCES players (player_id)
);

-- Client_updates table to store changes in client information
CREATE TABLE client_updates (
    update_id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    player_id INTEGER,
    time TEXT,
    model TEXT,
    hmodel TEXT,
    FOREIGN KEY (game_id) REFERENCES games (game_id),
    FOREIGN KEY (player_id) REFERENCES players (player_id)
);