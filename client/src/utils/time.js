const time = {

  monthsAbbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  months:  ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'],
  daysOfTheWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

  weekday: (UNIX_timestamp) => {
    const date = new Date(UNIX_timestamp * 1000);
    return this.daysOfTheWeek[date.getDay()];
  },

  formattedDayAndMonth: (UNIX_timestamp) => {
    const date = new Date(UNIX_timestamp * 1000);
    const day = this.weekday(date.getDay());
    const month = this.monthsAbbreviated[date.getMonth()];
    return `${day} ${month}`;
  },

  formattedDateAndTime: (UNIX_timestamp) => {
    const date = new Date(UNIX_timestamp * 1000);
    const year = date.getFullYear();
    const month = this.monthsAbbreviated[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  },

  formatted12HourTime: (UNIX_timestamp) => {
    const date = new Date(UNIX_timestamp * 1000);
    const hours = date.getHours() > 12 ? (date.getHours() - 12) : date.getHours();
    const minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
    const ampm = date.getHours() < 12 ? 'AM' : 'PM';
    return `${hours}:${minutes} ${ampm}`;
  },

  formatted24HourTime: (UNIX_timestamp) => {
    const date = new Date(UNIX_timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
    return `${hours}:${minutes}`;
  }
};

export default time;