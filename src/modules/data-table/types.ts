import { Tables } from "@modules/shared/db/database.types";

export type Word = Tables<"words">;
export type Category = Tables<"category">;

export interface WordWithCategory extends Word {
  category: Category;
}
