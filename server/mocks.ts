import {
  CATEGORY_VALUES,
  CategoryTypes,
  PRIORITY_VALUES,
  PriorityTypes,
  STATUS_VALUES,
  StatusTypes,
} from "~/utils/constants";

export const EVENT_PHOTOS = [
  {
    taskId: "1",
    photos: ["images/photos/1.png", "images/photos/6.png"],
  },
  {
    taskId: "2",
    photos: ["images/photos/2.png", "images/photos/7.png"],
  },
  {
    taskId: "3",
    photos: ["images/photos/3.png", "images/photos/8.png"],
  },
  {
    taskId: "4",
    photos: ["images/photos/4.png", "images/photos/9.png"],
  },
  {
    taskId: "0",
    photos: ["images/photos/5.png", "images/photos/11.png"],
  },
];
export const TASK_LIST = [
  {
    id: "0",
    slug: "TASK-1",
    title: "Change of road elements, and wireless stastions",
    address: "Seattle",
    coordinates: [-149.83841861419532, 61.18245716761903],
    date: "10/11/2024",
    time: "11:00",
    category: CATEGORY_VALUES[CategoryTypes.ACCIDENT],
    priority: PRIORITY_VALUES[PriorityTypes.HIGH],
    status: STATUS_VALUES[StatusTypes.TODO],
    employeeId: "202",
  },
  {
    id: "1",
    slug: "TASK-2",
    title: "Current repairs. Requires careful preparation.",
    address: "Washington",
    coordinates: [-123.21622572700346, 47.84958094763019],
    date: "10/11/2024",
    time: "10:00",
    category: CATEGORY_VALUES[CategoryTypes.ENERGETICS],
    priority: PRIORITY_VALUES[PriorityTypes.LOW],
    status: STATUS_VALUES[StatusTypes.IN_PROGRESS],
    employeeId: "202",
  },
  {
    id: "2",
    slug: "TASK-3",
    title: "Scheduled inspection of the territory",
    address: "Alaska",
    coordinates: [-148.62522116057576, 61.599792852689625],
    date: "10/11/2024",
    time: "09:00",
    category: CATEGORY_VALUES[CategoryTypes.FIRE],
    priority: PRIORITY_VALUES[PriorityTypes.MEDIUM],
    status: STATUS_VALUES[StatusTypes.IN_PROGRESS],
    employeeId: "202",
  },
  {
    id: "3",
    slug: "TASK-4",
    title: "Protective treatment, new equipment and painting",
    address: "Washington",
    coordinates: [-124.53631465491922, 48.87987756124854],
    date: "10/11/2024",
    time: "08:00",
    category: CATEGORY_VALUES[CategoryTypes.OIL],
    priority: PRIORITY_VALUES[PriorityTypes.LOW],
    status: STATUS_VALUES[StatusTypes.IN_PROGRESS],
    employeeId: "201",
  },
  {
    id: "4",
    slug: "TASK-5",
    title: "Repair of transmission lines",
    address: "Los Angeles",
    coordinates: [-118.30274230366926, 34.13444747401841],
    date: "10/11/2024",
    time: "07:30",
    category: CATEGORY_VALUES[CategoryTypes.BATTERIES],
    priority: PRIORITY_VALUES[PriorityTypes.LOW],
    status: STATUS_VALUES[StatusTypes.TODO],
    employeeId: "201",
  },
];

export const EMPLOYEE_LIST = [
  {
    id: "201",
    firstName: "Rus",
    lastName: "K",
    email: "rk@email.com",
    coordinates: [-110.68011211907145, 46.771022411558626],
    avatar: "/images/logo.png",
  },
  {
    id: "202",
    firstName: "Alex",
    lastName: "Russo",
    email: "alex@russo.com",
    coordinates: [-122.71763861539273, 45.51025144791064],
    avatar: "/avatars/03.png",
  },
];
