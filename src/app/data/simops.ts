import { addDays } from 'date-fns';
import { random } from 'lodash';

export interface SimOps {
  comments: string;
  createdAt: Date;
  createdBy: string;
  currentState: string; // DRAFT | REJECTED | APPROVED | PENDING_APPROVAL
  duration: number;
  expiresAt: Date;
  id: number;
  planName: string;
  priority: string;
  simopsPlanType: string;
  startedAt: Date;
  lat: number;
  lng: number;
}

let id = 1;
const date = new Date();

const LAT_LOWER = 41.892464;
const LAT_UPPER = 45.644768;
const LNG_LOWER = 28.057071;
const LNG_UPPER = 40.910904;

export const SIMOPS: SimOps[] = [
  {
    id: id++,
    comments:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    createdAt: addDays(date, 0),
    createdBy: 'Alex',
    currentState: 'DRAFT',
    duration: 1,
    expiresAt: addDays(date, 30),
    planName: `Risus in hendrerit gravida rutrum quisque non.`,
    priority: 'LOW',
    simopsPlanType: 'Installation',
    startedAt: addDays(date, 0),
    lat: random(LAT_LOWER, LAT_UPPER),
    lng: random(LNG_LOWER, LNG_UPPER),
  },
  {
    id: id++,
    comments:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    createdAt: addDays(date, -id),
    createdBy: 'Alex',
    currentState: 'APPROVED',
    duration: 2,
    expiresAt: addDays(date, 30),
    planName: `Volutpat odio facilisis mauris sit amet massa vitae`,
    priority: 'MEDIUM',
    simopsPlanType: 'Survey',
    startedAt: addDays(date, 0),
    lat: random(LAT_LOWER, LAT_UPPER),
    lng: random(LNG_LOWER, LNG_UPPER),
  },
  {
    id: id++,
    comments:
      'Mattis enim ut tellus elementum sagittis vitae et. Varius duis at consectetur lorem donec. Felis donec et odio pellentesque diam volutpat commodo sed egestas',
    createdAt: addDays(date, -id),
    createdBy: 'Alex',
    currentState: 'REJECTED',
    duration: 2,
    expiresAt: addDays(date, 30),
    planName: `Etiam dignissim diam quis enim`,
    priority: 'HIGH',
    simopsPlanType: 'Drilling',
    startedAt: addDays(date, 0),
    lat: random(LAT_LOWER, LAT_UPPER),
    lng: random(LNG_LOWER, LNG_UPPER),
  },

  {
    id: id++,
    comments:
      'Mattis enim ut tellus elementum sagittis vitae et. Varius duis at consectetur lorem donec. Felis donec et odio pellentesque diam volutpat commodo sed egestas',
    createdAt: addDays(date, -id),
    createdBy: 'Another Person',
    currentState: 'PENDING_APPROVAL',
    duration: 2,
    expiresAt: addDays(date, 30),
    planName: `Etiam dignissim diam quis enim`,
    priority: 'HIGH',
    simopsPlanType: 'Drilling',
    startedAt: addDays(date, 0),
    lat: random(LAT_LOWER, LAT_UPPER),
    lng: random(LNG_LOWER, LNG_UPPER),
  },
  {
    id: id++,
    comments:
      'Mattis enim ut tellus elementum sagittis vitae et. Varius duis at consectetur lorem donec. Felis donec et odio pellentesque diam volutpat commodo sed egestas',
    createdAt: addDays(date, -id),
    createdBy: 'Another Person',
    currentState: 'PENDING_APPROVAL',
    duration: 2,
    expiresAt: addDays(date, 30),
    planName: `Etiam dignissim diam quis enim`,
    priority: 'HIGH',
    simopsPlanType: 'Drilling',
    startedAt: addDays(date, 0),
    lat: random(LAT_LOWER, LAT_UPPER),
    lng: random(LNG_LOWER, LNG_UPPER),
  },
];
