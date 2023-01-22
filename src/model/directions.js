const DIRECTIONS = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
}

const direction_to_string = (direction) => {
    switch (direction) {
        case DIRECTIONS.UP: return  "UP";
        case DIRECTIONS.DOWN: return  "DOWN";
        case DIRECTIONS.LEFT: return  "LEFT";
        case DIRECTIONS.RIGHT: return "RIGHT";
        default: return "";
    }
}

const string_to_direction = (str_direction) => {
    switch (str_direction.toUpperCase()) {
        case "UP": return DIRECTIONS.UP;
        case "DOWN": return DIRECTIONS.DOWN;
        case "LEFT": return DIRECTIONS.LEFT;
        case "RIGHT": return DIRECTIONS.RIGHT;
        default: return -1;
    }
}

export { DIRECTIONS, direction_to_string, string_to_direction };