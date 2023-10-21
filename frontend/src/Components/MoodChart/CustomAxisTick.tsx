import { MOOD_INDICATORS_MAPPING } from "../MoodIndicator/MoodIndicator";

const CustomAxisTick: React.FC<any> = ({ x, y, payload }) => {
  const moodIndex = MOOD_INDICATORS_MAPPING.findIndex(
    (indicator) => indicator.value === payload.value
  );

  if (moodIndex === -1) return null;

  const svgProps = {
    x: x - 25,
    y: y - 15,
  };

  return MOOD_INDICATORS_MAPPING[moodIndex].label(svgProps);
};

export default CustomAxisTick;
