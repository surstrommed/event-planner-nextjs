import { z } from "zod";
import { ThemeType } from ".";

export type ProfileSetting = "avatar" | "password" | "theme";
export type ChangeAvatarFormVariant = "display" | "change";

const ChangePasswordForm = z.object({
  handleChangePassword: z
    .function()
    .args(
      z.string({ description: "email" }),
      z.string({ description: "oldPassword" }),
      z.string({ description: "newPassword" })
    )
    .returns(z.promise(z.void())),
});
export type IChangePasswordForm = z.infer<typeof ChangePasswordForm>;

const ChangeAvatarForm = z.object({
  handleChangeAvatar: z
    .function()
    .args(
      z.string({ description: "email" }),
      z.string({ description: "avatarUrl" }).nullable()
    )
    .returns(z.promise(z.void())),
});
export type IChangeAvatarForm = z.infer<typeof ChangeAvatarForm>;

const ChangeThemeForm = z.object({
  handleChangeTheme: z.function().args(ThemeType).returns(z.void()),
});
export type IChangeThemeForm = z.infer<typeof ChangeThemeForm>;
