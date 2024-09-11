"use client";

import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

import { GET_POD_TOKENS_FOR_ACCOUNT } from "@/lib/graph-queries";
import { PodAccount } from "@/lib/types";
import { CHAIN_ID, GRAPH_ENDPOINT } from "@/config/constants";

export const usePodTokensForAccount = ({ address }: { address: string }) => {
  const graphQLClient = new GraphQLClient(GRAPH_ENDPOINT[CHAIN_ID]);

  const { data, error, ...rest } = useQuery({
    queryKey: ["get-account", { address }],
    queryFn: async () =>
      (await graphQLClient.request(GET_POD_TOKENS_FOR_ACCOUNT, {
        account: address.toLowerCase(),
      })) as {
        account: PodAccount;
      },
  });

  return {
    account: data?.account,
    ...rest,
  };
};
