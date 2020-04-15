export enum UserPermission {
  MANAGE_USERS = 'manage_users',
  MANAGE_PAGES = 'manage_pages',
  MANAGE_PROFILES = 'manage_profiles',
  MANAGE_FILES = 'manage_files',
  MANAGE_ARTICLES = 'manage_articles',
  MANAGE_EVENTS = 'manage_events',
  MANAGE_MANUALS = 'manage_manuals',
  VIEW_LOGS = 'view_logs',
  EDIT_SETTINGS = 'edit_settings',
};

export interface IUser {
  id: number;
  username: string;
  email?: string;
  permissions: UserPermission[];
  iat: number;
  exp: number;
};
