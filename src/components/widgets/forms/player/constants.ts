type ItemValue = {
  value: string;
  name: string;
  isHidden?: boolean;
};

export const positionsItemValues: ItemValue[] = [
  { value: "Goalkeeper", name: "Goalkeeper", isHidden: false },
  { value: "Defender", name: "Defender", isHidden: false },
  { value: "Left Winger", name: "Left Winger", isHidden: false },
  { value: "Right Winger", name: "Right Winger", isHidden: false },
  { value: "Striker", name: "Striker", isHidden: false },
];

export const levelOfStudyItemValues: ItemValue[] = [
  { value: "FOUND", name: "Foundation", isHidden: false },
  { value: "UG", name: "Undergraduate", isHidden: false },
  { value: "GR", name: "Graduate", isHidden: false },
];

export const schoolNameItemValues: ItemValue[] = [
  { value: "SEDS", name: "SEDS", isHidden: false },
  { value: "SSH", name: "SSH", isHidden: false },
  { value: "NUSOM", name: "NUSOM", isHidden: false },
  { value: "GSB", name: "GSB", isHidden: false },
  { value: "GSE", name: "GSE", isHidden: false },
  { value: "GSPP", name: "GSPP", isHidden: false },
  { value: "SMG", name: "SMG", isHidden: false },
  { value: "CPS", name: "CPS", isHidden: true },
];

export const numberOfYearsItemValues: ItemValue[] = [
  { value: "0", name: "0", isHidden: true },
  { value: "1", name: "1", isHidden: false },
  { value: "2", name: "2", isHidden: false },
  { value: "3", name: "3", isHidden: false },
  { value: "4", name: "4", isHidden: false },
  { value: "5", name: "5", isHidden: false },
  { value: "6", name: "6", isHidden: false },
];
