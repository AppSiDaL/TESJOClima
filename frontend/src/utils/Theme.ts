import sunrise from "../assets/sunrise.jpg";
import day from "../assets/day.jpeg";
import sunset from "../assets/sunset.jpg";
import night from "../assets/night1.jpg";

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

const getGradient = () => {
  const date = new Date();
  let gradient;
  const hour = date.getHours();

  if (hour >= 19 || hour < 6) {
    gradient = "night";
  } else if (hour >= 18) {
    gradient = "sunset";
  } else if (hour >= 10) {
    gradient = "day";
  } else {
    gradient = "sunrise";
  }

  return gradient;
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

const getColor = () => {
  const date = new Date();
  let color;
  const hour = date.getHours();

  if (hour >= 19 || hour < 6) {
    color = "#6F6175";
  } else if (hour >= 18) {
    color = "#EB7812";
  } else if (hour >= 10) {
    color = "#2545C7";
  } else {
    color = "#C73716";
  }

  return color;
};

export default { getBackground, getTimeRange,getColor,getGradient };
