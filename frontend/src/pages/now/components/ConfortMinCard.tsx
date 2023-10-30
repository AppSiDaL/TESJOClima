import { confort } from "../../../Types";
import { MiniWeatherIcon } from "../../../utils/WeatherIcon";

interface ConfortMinCardProps {
  values: confort;
  iconColor: string;
}

const ConfortMinCard = ({ values,iconColor }: ConfortMinCardProps) => {
  return (
    <div>
      <p style={{textTransform:"capitalize"}}>{values.name}</p>
      <MiniWeatherIcon color={iconColor} value={values.name} />
      {values.value}
    </div>
  );
};

export default ConfortMinCard;
