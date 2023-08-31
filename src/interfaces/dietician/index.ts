import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DieticianInterface {
  id?: string;
  name: string;
  specialty: string;
  experience: number;
  availability: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface DieticianGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  specialty?: string;
  availability?: string;
  user_id?: string;
}
