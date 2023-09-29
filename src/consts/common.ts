import { ThemeConfig } from "antd";

export const PROJECT_NAME = "Event Planner";

export const MONTHS = [
  { value: "1", text: "January" },
  { value: "2", text: "February" },
  { value: "3", text: "March" },
  { value: "4", text: "April" },
  { value: "5", text: "May" },
  { value: "6", text: "June" },
  { value: "7", text: "July" },
  { value: "8", text: "August" },
  { value: "9", text: "September" },
  { value: "10", text: "October" },
  { value: "11", text: "November" },
  { value: "12", text: "December" },
];

export const SEARCH_QUERY = "searchQuery";
export const PAGE_QUERY = "page";
export const LIMIT_QUERY = "limit";

export const START_MONTH_FILTER = "startMonth";
export const END_MONTH_FILTER = "endMonth";
export const START_YEAR_FILTER = "startYear";
export const END_YEAR_FILTER = "endYear";

export const CREATE_DATE_SORT = "createDate";
export const TITLE_SORT = "title";

export const SORT_FORM_PARAMETER = "sortParameter";

export const ALL_FILTER_PARAMS = [
  START_MONTH_FILTER,
  END_MONTH_FILTER,
  START_YEAR_FILTER,
  END_YEAR_FILTER,
];
export const ALL_SORT_PARAMS = [CREATE_DATE_SORT, TITLE_SORT];
export const ALL_FILTER_SORT_PARAMS = [
  ...ALL_FILTER_PARAMS,
  ...ALL_SORT_PARAMS,
];

export const IMAGE_NOT_FOUND_ROUTE =
  "https://uploadthing.com/f/d02a54c3-bb2c-4abe-807c-22f8271ec4c6_image-not-found.jpg";

export const ALL_EVENTS_TITLE = "All events";
export const LAST_EVENTS_TITLE = "Last events";
export const SAVED_EVENTS_TITLE = "Saved events";
export const MY_EVENTS_TITLE = "My events";

export const COOKIES_USER_STATE = `${PROJECT_NAME}_userState`;
export const COOKIES_APP_STATE = `${PROJECT_NAME}_appState`;

export const THEMES: { lightTheme: ThemeConfig; darkTheme: ThemeConfig } = {
  lightTheme: {
    token: {
      colorPrimary: "#00e6bf",
      colorPrimaryBg: "#376767",
      colorBgBase: "#e4f1f1",
    },
  },
  darkTheme: {
    token: {
      colorPrimary: "#23d7b9",
      colorPrimaryBg: "#112222",
      colorBgBase: "#769898",
    },
  },
};

export const THEME_VARIANTS = [
  { value: "light", text: "Light" },
  { value: "dark", text: "Dark" },
];

export const SORT_OPTIONS = [
  {
    label: "Title",
    options: [
      { label: "From A to Z", value: "title,asc" },
      { label: "From Z to A", value: "title,desc" },
    ],
  },
  {
    label: "Create date",
    options: [
      { label: "From old to new", value: "createDate,asc" },
      { label: "From new to old", value: "createDate,desc" },
    ],
  },
];
