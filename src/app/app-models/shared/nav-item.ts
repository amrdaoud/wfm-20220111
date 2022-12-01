export interface NavItem {
  Name: string;
  Path: string | null;
  Items: NavItem[] | null;
  Icon: string;
  IsAccent?: boolean;
  Roles?: string[];
}
