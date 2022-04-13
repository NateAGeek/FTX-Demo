import useSWR from "swr";
import { endpoints } from "../endpoints";
import { fetcher } from "../fetcher";
import { FTXNFTsFilteredResponse } from "../types";

export function useNFTSingleCollection(
  page: number = 0,
  limit: number = 5,
  nftFilterString: {
    collection?: string,
    id?: string,
    name?: string
    nfts?: string
  }
) {
  return useSWR<FTXNFTsFilteredResponse>(
    endpoints.nfts_filtered + 
    `?startInclusive=${page * limit}&endExclusive=${(page + 1) * limit}&nft_filter_string=${encodeURIComponent(JSON.stringify(nftFilterString))}`, 
    fetcher);
}