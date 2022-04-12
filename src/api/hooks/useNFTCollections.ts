import useSWR from "swr";
import { endpoints } from "../endpoints";
import { fetcher } from "../fetcher";
import { FTXNFTCollectionsPageResponse } from "../types";

export function useNFTCollections(
  page: number = 0,
  limit: number = 5,
  collectionType: 'all' | 'ftx' | 'eth' | 'sol' = 'all'
) {
  return useSWR<FTXNFTCollectionsPageResponse>(
    endpoints.collections_page + 
    `?startInclusive=${page * limit}&endExclusive=${(page + 1) * limit}&collectionType=${collectionType}`, 
    fetcher);
}