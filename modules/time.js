import { DateTime } from './luxon.js';

export const displayTime = () => {
  let dt = DateTime.now();
  dt = dt.toHTTP();
  document.getElementById('date').innerHTML = dt;
  setTimeout(displayTime, 1000);
};

export default displayTime;
