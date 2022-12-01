export interface AppUser{
  UserName: string;
  Alias: string;
  Roles: string[];
  AvatarImgUrl: string;
  LargeImgUrl: string;
}
export class AppRoles {
  constructor(model: AppRolesMapping) {
    this.Groups = {
      Admin: model.Groups.Admin.join(','),
      User:  model.Groups.User.join(','),
      Hos: model.Groups.Hos.join(','),
    };
    this.Users = {
      Admin: model.Users.Admin.join(','),
      User:  model.Users.User.join(','),
      Hos: model.Users.Hos.join(','),
    }
  }
  Groups: {Admin: string, User: string, Hos: string};
  Users: {Admin: string, User: string, Hos: string};
}
export class AppRolesMapping {
  constructor(model: AppRoles) {
    this.Groups = {
      Admin: model.Groups.Admin !== '' ? model.Groups.Admin.trim().split(',') : [],
      User:  model.Groups.User !== '' ? model.Groups.User.trim().split(','): [],
      Hos: model.Groups.Hos !== '' ? model.Groups.Hos.trim().split(','): [],
    };
    this.Users = {
      Admin: model.Users.Admin !== '' ? model.Users.Admin.trim().split(',') : [],
      User:  model.Users.User !== '' ? model.Users.User.trim().split(',') : [],
      Hos: model.Users.Hos !== '' ? model.Users.Hos.trim().split(',') : [],
    }
  }
  Groups: AppRolesMappingChild;
  Users: AppRolesMappingChild;
}
export interface AppRolesMappingChild {
  Admin: string[];
  User: string[];
  Hos: string[];
}

export interface ADUser {
  Name: string;
  Alias: string;
}
