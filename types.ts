export interface Coordinate {
    x: number;
    y: number;
}

export interface Obstacle extends Coordinate {
    size: number;
    label: string;
}

export interface BoxState extends Coordinate {
    size: number;
    label: string;
}

export interface RobotState {
    x: number;
    y: number;
    speed: number;
    targetSpeed: number;
    direction: 'STOP' | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    battery: number;
    steps: number;
    isFallen: boolean;
    hasBox: boolean;
    leftArmAngle: number;
    rightArmAngle: number;
    path: Coordinate[];
}

export interface LogEntry {
    timestamp: string;
    message: string;
    type: 'info' | 'warn' | 'error' | 'success' | 'control';
}

export const INITIAL_ROBOT_STATE: RobotState = {
    x: 50,
    y: 50,
    speed: 0,
    targetSpeed: 1.5,
    direction: 'STOP',
    battery: 87.5,
    steps: 0,
    isFallen: false,
    hasBox: false,
    leftArmAngle: 180,
    rightArmAngle: 0,
    path: [{ x: 50, y: 50 }]
};

export const OBSTACLES: Obstacle[] = [
    { x: 30, y: 30, size: 5, label: 'Pillar 1' },
    { x: 75, y: 60, size: 8, label: 'Pillar 2' },
    { x: 50, y: 85, size: 6, label: 'Crate' }
];

export const INITIAL_BOX: BoxState = {
    x: 15, y: 70, size: 5, label: 'Cargo Box'
};
