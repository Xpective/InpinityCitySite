type GraphQLVariables = Record<string, unknown>;

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
};

const DEFAULT_PROXY_URL = "https://api.city.inpinity.online/graphql";

function getGraphQLEndpoint(): string {
  const fromEnv = import.meta.env.VITE_SUBGRAPH_URL?.trim();
  if (fromEnv) return fromEnv;
  return DEFAULT_PROXY_URL;
}

export async function requestGraphQL<T>(
  query: string,
  variables?: GraphQLVariables
): Promise<T> {
  const endpoint = getGraphQLEndpoint();

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variables || {},
    }),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${text}`);
  }

  let json: GraphQLResponse<T>;
  try {
    json = JSON.parse(text) as GraphQLResponse<T>;
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