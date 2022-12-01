// export function getLocaleDate(dateString: Date | string | null): Date {
//   const date = new Date(dateString!);
//   const result = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
//   return result;
// }

export function getTimeFromDate(dateString: Date | string | null): string {
  const result = new Date(dateString!);
  // const result = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
  const hours = result.getHours().toString().length === 2 ? result.getHours().toString() : '0' + result.getHours().toString();
  const minutes = result.getMinutes().toString().length === 2 ? result.getMinutes().toString() : '0' + result.getMinutes().toString();
  const time = hours + ':' + minutes;
  return time;
}

export function splitDates(dateString?: string | null): Date[] | undefined {
  const dateArray = dateString && dateString.length > 0 ? dateString.split(',').map(x => {
      var parts = x!.split('/');
      return new Date(+parts[2], +parts[1]-1, +parts[0]);
  }) : [];
  return dateArray;
}
export function getDaysBetween(start: Date, end: Date) : Date[] {
    let dateArray: Date[] = [];
    let currentDate =  new Date(start);
    let maxDate = new Date(end)
    while(currentDate <= maxDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}
