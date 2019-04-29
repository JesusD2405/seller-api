
export class ApiSeller {

  private static _instance: ApiSeller;
  
  public apiKey: string;
  public userId: string;
  public url: any;

  constructor() {

      // Llave de la Api 
      this.apiKey = 'apiKey';

      // User
      this.userId = 'user@user.com';
      
      // URL de la Api en el servidor
      this.url = 'https://sellercenter-api.dafiti.com.co';

   }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

}