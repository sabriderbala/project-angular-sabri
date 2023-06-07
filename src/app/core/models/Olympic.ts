import { Participation } from './Participation';

export interface Country {
  id: number;
  name: string;
  country: string;
  participations: Participation[];
}
