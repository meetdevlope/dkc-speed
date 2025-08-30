import { Brand } from "types/brand.types";
import { Collection } from "types/collection.types";
import { Category } from "types/product.types";
import { BlogType } from "../component.types";

export interface AppCardApiResponse {
  brandList: Brand[];
  categoryList: Category[];
  collectionList: Collection[];
  blogList: BlogType[];
}
