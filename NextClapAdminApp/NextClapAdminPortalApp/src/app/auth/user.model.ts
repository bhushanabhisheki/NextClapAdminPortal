export class User {
  constructor(
    private id: string,
    private username: string,
    private _token: string,
    private role: string, //    superadmin/admin/others
    private email: string,
    private password: string,
    public expiresIn: string,
    public _tokenExpirationDate: Date,
    public firstname: string,
    public lastname: string,
    public birthdate: string,
    public gender: string,
    public imageurl: string,
    public company: string,
    public phone?: string,
    public address?: string,
    public active?: boolean,
    public blocked?: boolean,
    public state?: string,
    public region?: string,
    public registration_date?: string,
    public last_active_date?: string,
    public reporting_manager?: string,
    public group?: string
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
