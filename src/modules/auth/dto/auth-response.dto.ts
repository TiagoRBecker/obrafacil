export class AuthResponseDto {
  accessToken?: string;
  refreshToken?: string;
  user!: {
    id: string;
    name: string;
    email: string;
    role: string;
    permission?:string[]
    seettingsId:string |null
    seettings?:{
      id:string | undefined,
      name:string | undefined,
      logoUrl:string | undefined,
      specialty:string | undefined,
    }
  };
}
