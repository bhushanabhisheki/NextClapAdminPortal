import { User } from 'src/app/auth/user.model';

export interface UserDialogData {
  title: string;
  message: string;
  confirmCaption: string;
  cancelCaption: string;
  user?: User;
}
