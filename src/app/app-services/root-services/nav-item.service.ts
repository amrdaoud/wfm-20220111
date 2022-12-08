import { Injectable } from '@angular/core';
import { AppUser } from 'src/app/app-models/root-models/app-user';
import { NavItem } from 'src/app/app-models/shared/nav-item';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NavItemService {
  // Call Center
  private navItems: NavItem[] = environment.tenant === 'Call Center' ? [
    {Name: 'Resources', Path: null, Icon: 'inventory', Roles:['Admin', 'Hos'], Items: [
      {Name: 'Locations', Path: '/resources/locations', Roles: ['Admin'], Icon: 'place', Items: null},
      {Name: 'Sub-Locations', Path: '/resources/sublocations', Roles: ['Admin'], Icon: 'place', Items: null},
      {Name: 'Staff Members', Path: '/resources/staff-members', Roles:['Admin','Hos'], Icon: 'people', Items: [
        {Name: 'Create New', Path: '/resources/staff-members/add', Roles:['Admin'], Icon: 'add', Items:null},
        {Name: 'Staff Types', Path: '/resources/staff-types',Roles:['Admin'], Icon: 'category', Items:null},
      ]},
      {Name: 'Head Of Sections', Path: '/resources/head-of-sections',Roles:['Admin'], Icon: 'supervisor_account', Items: null},
      {Name: 'Transportations', Path: '/resources/transportations',Roles:['Admin'], Icon: 'directions_bus', Items: null},
    ]},
    {Name: 'Shifts & activities', Path: null, Roles:['Admin'], Icon: 'calendar_today', Items:[
      {Name: 'Shifts', Path: '/shifts-activities/shifts', Icon: 'timelapse', Items: null},
      {Name: 'Activities', Path: '/shifts-activities/activities', Icon: 'today', Items: null},
      {Name: 'Attendance Types', Path: '/shifts-activities/attendance-types', Icon: 'event_available', Items: null}
    ]},
    {Name: 'Forecasts', Path: null,Roles:['Admin'], Icon: 'thermostat', Items:[
      {Name: 'Forecast List', Path: '/forecasts', Icon: 'view_list', Items: null},
      {Name: 'Create New', Path: '/forecasts/add', Icon: 'add', Items: null},
    ]},
    {Name: 'Schedules',Roles:['Admin', 'Hos', 'User'], Path: null, Icon: 'pending_actions', Items:[
      {Name: 'Schedule List',Roles:['Admin'], Path: '/schedules', Icon: 'history', Items: null},
      {Name: 'My Schedules',Roles:['Hos', 'User'], Path: '/schedules/my-schedules', Icon: 'history', Items: null},
      {Name: 'Open Schedule', Roles: ['Admin', 'User'], Path: null, Icon: 'pending_actions',IsAccent: true, Items: [
        {Name: 'Attendance Approvals', Roles:['Admin'], Path: '/day-offs/attendance-approvals', Icon: 'fact_check',IsAccent: true, Items: null},
        {Name: 'My Attendance Choices', Roles: ['User'], Path: '/day-offs/attendance-choices', Icon: 'tune',IsAccent: true, Items: null},
        {Name: 'Generate',Roles:['Admin'], Path: '/active-schedule/generate', Icon: 'play_arrow',IsAccent: true, Items: null},
        {Name: 'Upload',Roles:['Admin'], Path: '/day-offs/upload', Icon: 'upload',IsAccent: true, Items: null}
      ]},

    ]},
    {Name: 'Swap Requests', Roles:['Hos','User'], Path: null, Icon: 'swap_horiz', Items:[
      {Name: 'My Swap Requests', Path: '/swap-requests', Icon: 'view_list', Items: null},
      {Name: 'New Request', Roles:['User'], Path: '/swap-requests/add', Icon: 'add', Items: null},
    ]},
    {Name: 'Analysis', Roles:['Admin','Hos'], Path: null, Icon: 'analytics', Items:[
      {Name: 'Schedule Dashboard', Path: '/analysis', Icon: 'dashboard', Items: null},
      {Name: 'Adherence Report', Path: '/analysis/adherence', Icon: 'date_range', Items: null},
      {Name: 'Activities Report', Path: '/analysis/activities', Icon: 'event', Items: null},
    ]}

  ] : environment.tenant === 'Telemarketing' ?

  /// Telemarketing
  [
    {Name: 'Resources', Path: null, Icon: 'inventory', Roles:['Admin', 'Hos'], Items: [
      {Name: 'Locations', Path: '/resources/locations', Roles: ['Admin'], Icon: 'place', Items: null},
      {Name: 'Staff Members', Path: '/resources/staff-members', Roles:['Admin','Hos'], Icon: 'people', Items: [
        {Name: 'Create New', Path: '/resources/staff-members/add', Roles:['Admin'], Icon: 'add', Items:null},
        {Name: 'Staff Types', Path: '/resources/staff-types',Roles:['SuperUser'], Icon: 'category', Items:null},
      ]},
      {Name: 'Head Of Sections', Path: '/resources/head-of-sections',Roles:['Admin'], Icon: 'supervisor_account', Items: null},
      {Name: 'Transportations', Path: '/resources/transportations',Roles:['Admin'], Icon: 'directions_bus', Items: null},
    ]},
    {Name: 'Shifts & activities', Path: null, Roles:['Admin'], Icon: 'calendar_today', Items:[
      {Name: 'Shifts', Roles:['SuperUser'], Path: '/shifts-activities/shifts', Icon: 'timelapse', Items: null},
      {Name: 'Activities',Roles:['Admin'], Path: '/shifts-activities/activities', Icon: 'today', Items: null},
      {Name: 'Attendance Types',Roles:['Admin'], Path: '/shifts-activities/attendance-types', Icon: 'event_available', Items: null}
    ]},
    {Name: 'Forecasts', Path: null,Roles:['SuperUser'], Icon: 'thermostat', Items:[
      {Name: 'Forecast List', Path: '/forecasts', Icon: 'view_list', Items: null},
      {Name: 'Create New', Path: '/forecasts/add', Icon: 'add', Items: null},
    ]},
    {Name: 'Schedules',Roles:['Admin', 'Hos', 'User'], Path: null, Icon: 'pending_actions', Items:[
      {Name: 'Schedule List',Roles:['Admin'], Path: '/schedules', Icon: 'history', Items: null},
      {Name: 'My Schedules',Roles:['Hos', 'User'], Path: '/schedules/my-schedules', Icon: 'history', Items: null},
      {Name: 'Open Schedule', Roles: ['Admin', 'User'], Path: null, Icon: 'pending_actions',IsAccent: true, Items: [
        {Name: 'Attendance Approvals', Roles:['Admin'], Path: '/day-offs/attendance-approvals', Icon: 'fact_check',IsAccent: true, Items: null},
        {Name: 'My Attendance Choices', Roles: ['User'], Path: '/day-offs/attendance-choices', Icon: 'tune',IsAccent: true, Items: null},
        {Name: 'Generate',Roles:['Admin'], Path: '/active-schedule/generate', Icon: 'play_arrow',IsAccent: true, Items: null},
        {Name: 'Upload',Roles:['SuperUser'], Path: '/day-offs/upload', Icon: 'upload',IsAccent: true, Items: null}
      ]},

    ]},
    {Name: 'Swap Requests', Roles:['SuperUser'], Path: null, Icon: 'swap_horiz', Items:[
      {Name: 'My Swap Requests', Path: '/swap-requests', Icon: 'view_list', Items: null},
      {Name: 'New Request', Roles:['User'], Path: '/swap-requests/add', Icon: 'add', Items: null},
    ]}

  ] : environment.tenant === 'Administration' ?

  /// Administration
  [
    {Name: 'Resources', Path: null, Icon: 'inventory', Roles:['Admin', 'Hos'], Items: [
      {Name: 'Locations', Path: '/resources/locations', Roles: ['Admin'], Icon: 'place', Items: null},
      {Name: 'Sub-Locations', Path: '/resources/sublocations', Roles: ['Admin'], Icon: 'place', Items: null},
      {Name: 'Staff Members', Path: '/resources/staff-members', Roles:['Admin','Hos'], Icon: 'people', Items: [
        {Name: 'Create New', Path: '/resources/staff-members/add', Roles:['Admin'], Icon: 'add', Items:null},
        {Name: 'Staff Types', Path: '/resources/staff-types',Roles:['SuperUser'], Icon: 'category', Items:null},
      ]},
      {Name: 'Head Of Sections', Path: '/resources/head-of-sections',Roles:['Admin'], Icon: 'supervisor_account', Items: null},
      {Name: 'Transportations', Path: '/resources/transportations',Roles:['Admin'], Icon: 'directions_bus', Items: null},
    ]},
    // {Name: 'Shifts & activities', Path: null, Roles:['Admin'], Icon: 'calendar_today', Items:[
    //   {Name: 'Shifts', Roles:['SuperUser'], Path: '/shifts-activities/shifts', Icon: 'timelapse', Items: null},
    //   {Name: 'Activities',Roles:['Admin'], Path: '/shifts-activities/activities', Icon: 'today', Items: null},
    //   {Name: 'Attendance Types',Roles:['Admin'], Path: '/shifts-activities/attendance-types', Icon: 'event_available', Items: null}
    // ]},
    // {Name: 'Forecasts', Path: null,Roles:['SuperUser'], Icon: 'thermostat', Items:[
    //   {Name: 'Forecast List', Path: '/forecasts', Icon: 'view_list', Items: null},
    //   {Name: 'Create New', Path: '/forecasts/add', Icon: 'add', Items: null},
    // ]},
    // {Name: 'Schedules',Roles:['Admin', 'Hos', 'User'], Path: null, Icon: 'pending_actions', Items:[
    //   {Name: 'Schedule List',Roles:['Admin'], Path: '/schedules', Icon: 'history', Items: null},
    //   {Name: 'My Schedules',Roles:['Hos', 'User'], Path: '/schedules/my-schedules', Icon: 'history', Items: null},
    //   {Name: 'Open Schedule', Roles: ['Admin', 'User'], Path: null, Icon: 'pending_actions',IsAccent: true, Items: [
    //     {Name: 'Attendance Approvals', Roles:['Admin'], Path: '/day-offs/attendance-approvals', Icon: 'fact_check',IsAccent: true, Items: null},
    //     {Name: 'My Attendance Choices', Roles: ['User'], Path: '/day-offs/attendance-choices', Icon: 'tune',IsAccent: true, Items: null},
    //     {Name: 'Generate',Roles:['Admin'], Path: '/active-schedule/generate', Icon: 'play_arrow',IsAccent: true, Items: null},
    //     {Name: 'Upload',Roles:['SuperUser'], Path: '/day-offs/upload', Icon: 'upload',IsAccent: true, Items: null}
    //   ]},

    // ]},
    // {Name: 'Swap Requests', Roles:['SuperUser'], Path: null, Icon: 'swap_horiz', Items:[
    //   {Name: 'My Swap Requests', Path: '/swap-requests', Icon: 'view_list', Items: null},
    //   {Name: 'New Request', Roles:['User'], Path: '/swap-requests/add', Icon: 'add', Items: null},
    // ]}

  ] :[];
  constructor() { }

  getNavItems(user:AppUser): NavItem[] {
    const main = this.navItems.filter(x => user.Roles.includes('SuperUser') || !x.Roles ||
      user.Roles.some(y => x.Roles?.includes(y))
    );
    main.forEach(mainItem => {
      mainItem.Items = mainItem.Items ? mainItem.Items.filter(x => user.Roles.includes('SuperUser') || !x.Roles ||
        user.Roles.some(y => x.Roles?.includes(y))
      ) : null;
        mainItem.Items?.forEach(grandChild => {
          grandChild.Items = grandChild.Items ? grandChild.Items.filter(x => user.Roles.includes('SuperUser') || !x.Roles ||
            user.Roles.some(y => x.Roles?.includes(y))
          ) : null;
        });
    });
    return main;
  }
}
