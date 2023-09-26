import sunrise from "../assets/sunrise.jpg";
import day from "../assets/day.jpeg";
import sunset from "../assets/sunset.jpg";
import night from "../assets/night.png";

const getBackground = () => {
  const date = new Date();
  let bgImage;
  const hour = date.getHours();

  if (hour >= 19 || hour < 6) {
    bgImage = night;
  } else if (hour >= 18) {
    bgImage = sunset;
  } else if (hour >= 10) {
    bgImage = day;
  } else {
    bgImage = sunrise;
  }

  return bgImage;
};

const getTimeRange = () => {
  const date = new Date();
  let range;
  const hour = date.getHours();

  if (hour >= 19 || hour < 6) {
    range = "Night";
  } else if (hour >= 18) {
    range = "Sunset";
  } else if (hour >= 10) {
    range = "Day";
  } else {
    range = "Sunrise";
  }

  return range;
};

export default { getBackground, getTimeRange };
