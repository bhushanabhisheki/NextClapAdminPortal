import { User } from './user';

export interface UserDialogData {
  title: string;
  message: string;
  confirmCaption: string;
  cancelCaption: string;
  user?: User;
}
