import { sample } from 'lodash';
import { MANIFOLDS } from './manifolds';
import { addDays } from 'date-fns';

export type Valve = typeof VALVES[0];
export type ValveStatus = typeof VALVE_STATUSES[0];

export interface ValveChangeHistory {
  date: Date;
  isApproved?: boolean;
  type?: string;
  status?: ValveStatus;
  comments: string;
  docs: number;
  createdBy: string;
}

export const VALVE_STATUSES = [
  {
    code: 'opened',
    name: 'Opened',
    foregroundColor: '#ffffff',
    backgroundColor: '#ff5722',
  },
  {
    code: 'closed',
    name: 'Closed',
    foregroundColor: '#000000',
    backgroundColor: '#66bb6a',
  },
];

export const VALVES = Array.from({ length: 30 }, (v, i) => {
  const start = i + 1;
  const d = new Date();
  const comments = [
    {
      originator: 'alex',
      date: d,
      comment: `This is a comment ${Math.random()}`,
    },
    {
      originator: 'alex',
      date: addDays(d, -1),
      comment: `This is a comment ${Math.random()}`,
    },
    {
      originator: 'alex',
      date: addDays(d, -2),
      comment: `This is a comment ${Math.random()}`,
    },
  ];

  const approvedStatus = [false, true];
  const changeTypes = ['Change', 'Inspection'];

  const changeHistories: ValveChangeHistory[] = [
    {
      date: addDays(d, -1),
      isApproved: sample(approvedStatus),
      type: sample(changeTypes),
      status: sample(VALVE_STATUSES),
      comments: 'comments...',
      docs: 1,
      createdBy: 'alex',
    },
    {
      date: addDays(d, -2),
      isApproved: sample(approvedStatus),
      type: sample(changeTypes),
      status: sample(VALVE_STATUSES),
      comments: 'comments...',
      docs: 1,
      createdBy: 'alex',
    },
    {
      date: addDays(d, -3),
      isApproved: sample(approvedStatus),
      type: sample(changeTypes),
      status: sample(VALVE_STATUSES),
      comments: 'comments...',
      docs: 1,
      createdBy: 'alex',
    },
    {
      date: addDays(d, -4),
      isApproved: sample(approvedStatus),
      type: sample(changeTypes),
      status: sample(VALVE_STATUSES),
      comments: 'comments...',
      docs: 1,
      createdBy: 'alex',
    },
  ];

  const manifold = sample(MANIFOLDS);
  const status = sample(VALVE_STATUSES);
  return {
    manifoldId: manifold?.id,
    assetTag: `${manifold?.assetTag}-CIMV${start}`,
    desc: 'Example of a description for valve ' + start,
    id: `ID 0000${start}`,
    type: 'Simple',
    model: 'T-1000',
    serialNo: '1234567890',
    status: status,
    comments: comments,
    changeHistories: changeHistories,
  };
});
