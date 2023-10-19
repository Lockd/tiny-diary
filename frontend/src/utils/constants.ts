export const MOOD_BORDERS = {
  min: -2,
  max: 2,
};

export const MOOD_OPTIONS = [
  {
    value: -2,
    label: "😣",
  },
  {
    value: -1,
    label: "😔",
  },
  {
    value: 0,
    label: "🙂",
  },
  {
    value: 1,
    label: "😄",
  },
  {
    value: 2,
    label: "😎",
  },
];

export const MOOD_MAPPING: { [key: number]: string } = {};

MOOD_OPTIONS.forEach((option) => {
  MOOD_MAPPING[option.value] = option.label;
});
