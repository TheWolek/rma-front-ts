export interface User {
  user_id: number;
  login: string;
  role: string;
  created_date: string | Date;
  last_login_date: string | Date;
  change_password: boolean;
}
