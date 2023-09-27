import { createApi, SearchOrderBy, Orientation } from "unsplash-js";
import { getPhoto, Photo } from "../models/Photo";
import { Result } from "../models/Result";

const api = createApi({
  accessKey: `${process.env.REACT_APP_ACCESS_KEY}`,
});
const PER_PAGE = 16;

export const searchPhotos = async (
  query: string,
  criteria: string,
  page: number,
  orientation: string
) => {
  const result = await api.search.getPhotos({
    query,
    page,
    perPage: PER_PAGE,
    orientation: orientation as Orientation,
    orderBy: criteria as SearchOrderBy,
  });
  console.log(criteria, orientation);

  //if(result.type === 'success')
  if (result.status === 200) {
    const { response } = result;

    if (response) {
      const { total_pages, results } = response;
      const photos: Photo[] = results.map((r: any) => getPhoto(r));
      const result: Result = { photos, total_pages };

      return result;
    }
  }
  const sarchResult: Result = { photos: [], total_pages: 0 };
  return sarchResult;
};
