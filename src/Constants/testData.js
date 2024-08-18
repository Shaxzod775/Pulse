import { Icons } from "../Assets/Icons/icons";

export const leadSources = [
  "Instagram",
  "Facebook",
  "X",
  "LinkedIn",
  "YouTube",
  "TikTok",
  "Сайт",
  "Email-рассылка",
  "Рекомендация",
  "Событие",
  "Вебинар",
  "Подкаст",
  "Холодный звонок",
  "Органический поиск",
  "Платная реклама",
  "Связи с общественностью",
  "Нетворкинг",
  "Выставки",
  "Контент-маркетинг",
  "Партнерский маркетинг",
  "Отзывы в сети",
  "Сарафанное радио",
  "Другое",
];

export const languagesFullRu = ["Узбекский", "Русский", "Английский"];
export const courseLanguages = ["UZ", "RU", "EN"];
export const courseLanguagesFullRu = {
  UZ: "Узбекский",
  RU: "Русский",
  EN: "Английский",
};
// export const courseLanguagesFullEn = {
//   uz: "Uzbek",
//   ru: "Russian",
//   en: "English",
// };
// export const courseLanguagesFullUz = {
//   uz: "Uzbek",
//   ru: "Ruscha",
//   en: "Inglizcha",
// };

export const leadStatuses = [
  "Новый",
  "В процессе",
  "Открытый",
  "Завершенная сделка",
];

export const leadStatusesEnum = ["NEW", "IN_PROGRESS", "RECYCLED", "DEAD"];
export const leadStatusesEnumToText = {
  NEW: "Новый",
  IN_PROGRESS: "В процессе",
  RECYCLED: "Открытый",
  DEAD: "Завершенная сделка",
};
export const leadStatusesTextToEnum = {
  Новый: "NEW",
  "В процессе": "IN_PROGRESS",
  Открытый: "RECYCLED",
  "Завершенная сделка": "DEAD",
};

export const uzbekEducationLevels = [
  "Среднее образование",
  "Профессиональное образование",
  "Среднее специальное образование",
  "Высшее образование",
  "Магистратура",
  "Аспирантура",
  "Докторантура",
  "Доктор наук",
  "Квалификационная категория учителя",
];
export const teacherNames = [
  "Koptleulov Arslan",
  "Ilya Starodubtsev",
  "Aziz Mamajonov",
  "Muhammad Matchonov",
];

export const socialMediaTypes = [
  "LinkedIn",
  "Instagram",
  "Telegram",
  "Facebook",
  "YouTube",
  "WhatsApp",
];

export const socialMediaWithIcons = {
  GitHub: Icons.GithubLogo,
  LinkedIn: Icons.LinkedinLogo,
  Instagram: Icons.InstagramLogo,
  Telegram: Icons.TelegramLogo,
  Facebook: Icons.FacebookLogo,
  X: Icons.XLogo,
  YouTube: Icons.YoutubeLogo,
  WhatsApp: Icons.WhatsappLogo,
  "Персональный сайт": Icons.Globe,
};

export const genders = {
  MALE: { ru: "Мужской", uz: "Erkak" },
  FEMALE: { ru: "Женский", uz: "Ayol" },
};
