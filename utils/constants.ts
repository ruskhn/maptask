export enum CategoryTypes {
  ACCIDENT = "accident",
  OIL = "oil",
  // CRASH = "crash",
  FIRE = "fire",
  // ROAD = "road",
  COMMUNICATIONS = "communications",
  ENERGETICS = "Energetics",
  BATTERIES = "Batteries",
  // POLICE = "police",
  // SNOW = "snow",
}

export type CategoryValue = {
  id: number;
  name: string;
};

export const CATEGORY_VALUES: Record<CategoryTypes, CategoryValue> = {
  [CategoryTypes.ACCIDENT]: {
    id: 0,
    name: "Accident",
  },
  // [CategoryTypes.CRASH]: {
  //   id: 1,
  //   name: "Crash",
  // },
  [CategoryTypes.FIRE]: {
    id: 2,
    name: "Fire",
  },
  // [CategoryTypes.ROAD]: {
  //   id: 3,
  //   name: "Road",
  // },
  [CategoryTypes.COMMUNICATIONS]: {
    id: 4,
    name: "Сommunications",
  },
  [CategoryTypes.ENERGETICS]: {
    id: 5,
    name: "Energetics",
  },
  [CategoryTypes.OIL]: {
    id: 6,
    name: "Oil",
  },
  [CategoryTypes.BATTERIES]: {
    id: 10,
    name: "Batteries",
  },
  // [CategoryTypes.POLICE]: {
  //   id: 7,
  //   name: "Police",
  // },
  // [CategoryTypes.SNOW]: {
  //   id: 8,
  //   name: "Snow",
  // },
};

export enum PriorityTypes {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export type PriorityValue = {
  id: number;
  name: string;
  color: string;
};

export const PRIORITY_VALUES: Record<PriorityTypes, PriorityValue> = {
  [PriorityTypes.LOW]: {
    id: 0,
    name: "Low",
    color: "text-green-500",
  },
  [PriorityTypes.MEDIUM]: {
    id: 1,
    name: "Medium",
    color: "text-yellow-500",
  },
  [PriorityTypes.HIGH]: {
    id: 2,
    name: "High",
    color: "text-red-500",
  },
  [PriorityTypes.CRITICAL]: {
    id: 3,
    name: "Critical",
    color: "text-destructive",
  },
};

export enum StatusTypes {
  TODO = "todo",
  IN_PROGRESS = "inProgress",
  DONE = "done",
  CANCELED = "canceled",
  BACKLOG = "backlog",
}

export type StatusValue = {
  id: number;
  name: string;
};

export const STATUS_VALUES: Record<StatusTypes, StatusValue> = {
  [StatusTypes.TODO]: {
    id: 0,
    name: "To Do",
  },
  [StatusTypes.IN_PROGRESS]: {
    id: 1,
    name: "In Progress",
  },
  [StatusTypes.DONE]: {
    id: 2,
    name: "Done",
  },
  [StatusTypes.CANCELED]: {
    id: 3,
    name: "Canceled",
  },
  [StatusTypes.BACKLOG]: {
    id: 4,
    name: "Backlog",
  },
};
