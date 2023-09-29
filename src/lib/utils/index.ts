import { EVENTS_PER_PAGE, ROUTES } from "@consts/api";
import {
  ALL_SORT_PARAMS,
  CREATE_DATE_SORT,
  END_MONTH_FILTER,
  END_YEAR_FILTER,
  PAGE_QUERY,
  SEARCH_QUERY,
  START_MONTH_FILTER,
  START_YEAR_FILTER,
  THEMES,
  TITLE_SORT,
} from "@consts/common";
import { ISortEventsRequestData } from "@models/events";
import { IThemeType, SORT_TYPES, SearchParams } from "@models/index";
import moment from "moment";

export const formattedEventDate = (date: string, withoutDay = false) => {
  const result = moment(date).format(
    withoutDay ? "MMMM[,] YYYY" : "MMMM Do[,] YYYY"
  );
  return result.toString();
};

export const formattedEventLocation = (location: string) =>
  location.replace(", ", "\n");

export const getEventLink = (eventId: string) => `${ROUTES.events}/${eventId}`;

export const urlBuilder = (
  url: string,
  queryKey: string | string[],
  action: "remove" | "add" = "remove",
  queryValue?: string
) => {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);

  if (action === "remove") {
    if (typeof queryKey === "string") {
      params.delete(queryKey);
    } else {
      queryKey.forEach((qK) => {
        params.delete(qK);
      });
    }
  } else if (queryValue !== undefined) {
    if (typeof queryKey === "string") {
      params.set(queryKey, queryValue);
    }
  } else {
    return url;
  }

  urlObject.search = params.toString();

  return urlObject.toString();
};

export const getCurrentTheme = (theme: IThemeType) =>
  theme === "light" ? THEMES.lightTheme : THEMES.darkTheme;

export const getFormattedSortParameter = (queries: {
  [query: string]: string | undefined;
}) => {
  let resultParameter: string | undefined = undefined;

  const queryKeys = Object.keys(queries);
  queryKeys.forEach((queryKey) => {
    if (queryKey && queries[queryKey]) {
      if (queries[queryKey] === "asc") {
        resultParameter = `${queryKey},asc`;
      } else if (queries[queryKey] === "desc") {
        resultParameter = `${queryKey},desc`;
      }
    }
  });
  return resultParameter as string | undefined;
};

export const camelCaseToSentence = (camelCaseStr: string) => {
  const words = camelCaseStr.split(/(?=[A-Z])/);

  const sentence = words
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word.charAt(0).toLowerCase() + word.slice(1);
      }
    })
    .join(" ");

  return sentence;
};

export const parseSortParameter = (param: string) => {
  const searchedSortParam = ALL_SORT_PARAMS.find((sortParam) =>
    param.includes(sortParam)
  );
  if (searchedSortParam) {
    return camelCaseToSentence(searchedSortParam);
  } else {
    return "";
  }
};

export const getEventFiltersFromSearchParams = (
  searchParams: SearchParams
) => ({
  searchQuery: searchParams?.[SEARCH_QUERY],
  startMonth: searchParams?.[START_MONTH_FILTER],
  endMonth: searchParams?.[END_MONTH_FILTER],
  startYear: searchParams?.[START_YEAR_FILTER],
  endYear: searchParams?.[END_YEAR_FILTER],
  page:
    typeof Number(searchParams?.[PAGE_QUERY]) === "number" &&
    Number(searchParams?.[PAGE_QUERY]) > 0
      ? Number(searchParams?.[PAGE_QUERY])
      : 1,
  limit: EVENTS_PER_PAGE,
});

export const getEventSortFromSearchParams = (searchParams: SearchParams) => {
  const sortObj: ISortEventsRequestData = {};

  if (
    searchParams?.[TITLE_SORT] &&
    (searchParams[TITLE_SORT].toLowerCase() === "asc" ||
      searchParams[TITLE_SORT].toLowerCase() === "desc")
  ) {
    sortObj[TITLE_SORT] = searchParams[TITLE_SORT].toUpperCase() as SORT_TYPES;
  } else if (
    searchParams?.[CREATE_DATE_SORT] &&
    (searchParams[CREATE_DATE_SORT].toLowerCase() === "asc" ||
      searchParams[CREATE_DATE_SORT].toLowerCase() === "desc")
  ) {
    sortObj[CREATE_DATE_SORT] = searchParams[
      CREATE_DATE_SORT
    ].toUpperCase() as SORT_TYPES;
  }

  return sortObj;
};
