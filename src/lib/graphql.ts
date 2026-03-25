import { print } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { CONFIG } from "./config";

type GraphQLVariables = Record<string, unknown>;
type DocumentNode = string | TypedDocumentNode;

function getGraphQLEndpoint(): string {
  return CONFIG.subgraphUrl;
}

export async function requestGraphQL<T>(
  query: DocumentNode,
  variables?: GraphQLVariables
): Promise<T> {
  const endpoint = getGraphQLEndpoint();
  const queryString = typeof query === "string" ? query : print(query);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryString,
      variables: variables || {},
    }),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${text}`);
  }

  let json: { data?: T; errors?: Array<{ message: string }> };

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`GraphQL returned non-JSON response: ${text}`);
  }

  if (json.errors?.length) {
    throw new Error(JSON.stringify(json.errors, null, 2));
  }

  if (!json.data) {
    throw new Error("GraphQL response did not contain data.");
  }

  return json.data;
}
