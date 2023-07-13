export interface IFormSignIn {
  username: string,
  password: string,
}
export interface IFormRegister {
  fullname: string,
  groupUser: any,
  email: string,
  phone: string,
  password: string,
}
export interface IFormForgetPass {
  username: string,
}
export interface IFormChangePass {
  password: string,
}
export interface IPropsSignIn{
  changeType:(val:number)=>void;
}