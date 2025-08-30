import { BlogType } from "types/cms/component.types";
import { fetchData } from "utils/apiCaller";

export const getAllBlogs = async (): Promise<BlogType[]> => {
  return fetchData<BlogType[]>(`/cms/blog/list`, {
    errorMessage: "Blog list",
  });
};

export const getBlogDetails = async (id: string): Promise<BlogType> => {
  return fetchData<BlogType>(`/cms/blog/details/${id}`, {
    errorMessage: "Blog details",
  });
};
