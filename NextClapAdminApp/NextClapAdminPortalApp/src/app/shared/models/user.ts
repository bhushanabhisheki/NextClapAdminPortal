export interface User {
  id: string;
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  gender?: string;
  imageurl?: string;
  company?: string;
  role?: string; //    superadmin/admin/others
  email?: string;
  phone?: string;
  address?: string;
  active?: boolean;
  blocked?: boolean;
  state?: string;
  region?: string;
  registration_date?: string;
  last_active_date?: string;
  reporting_manager?: string;
  group?: string;
  timesloggedin?: number;
}
