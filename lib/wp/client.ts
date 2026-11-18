const WP_GRAPHQL_ENDPOINT =
    process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT ||
    "https://api.deepetservices.com/graphql";

type FetchOptions = {
    revalidate?: number | false;
    tags?: string[];
};

const DEFAULT_REVALIDATE = 60 * 10;

export async function wpFetch<T>(
    query: string,
    variables: Record<string, unknown> = {},
    options: FetchOptions = {},
): Promise<T | null> {
    try {
        const next: { revalidate?: number | false; tags?: string[] } = {
            revalidate:
                options.revalidate === undefined
                    ? DEFAULT_REVALIDATE
                    : options.revalidate,
        };
        if (options.tags) next.tags = options.tags;

        const res = await fetch(WP_GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables }),
            next,
        });

        if (!res.ok) {
            console.error("[wpFetch] HTTP error", res.status, res.statusText);
            return null;
        }

        const json = (await res.json()) as {
            data?: T;
            errors?: { message: string }[];
        };

        if (json.errors?.length) {
            console.error("[wpFetch] GraphQL errors:", json.errors);
        }

        return json.data ?? null;
    } catch (err) {
        console.error("[wpFetch] Network error:", err);
        return null;
    }
}
