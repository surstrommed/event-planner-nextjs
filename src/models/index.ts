import { NavigateOptions } from "next/dist/shared/lib/app-router-context";
import { z } from "zod";
import { ReactNode } from "react";
import { Session } from "next-auth";

export const SORT_TYPES = z.enum(["ASC", "DESC"]);
export type SORT_TYPES = z.infer<typeof SORT_TYPES>;

export type PushType = (
  href: string,
  options?: NavigateOptions | undefined
) => void;

export const SearchParams = z
  .record(z.string(), z.string().optional())
  .optional();
export type SearchParams = z.infer<typeof SearchParams>;

export const ThemeType = z.enum(["light", "dark"]);
export type IThemeType = z.infer<typeof ThemeType>;

export type UserSession = {
  authenticated: boolean;
  session: {
    user: {
      name: string;
      email: string;
      image: string;
    };
  } | null;
};

export type ILayout = {
  session: Session;
  children: ReactNode;
};
