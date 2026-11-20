import { getLlmsTxt } from "@/lib/cms";

export const revalidate = 600;

export async function GET(): Promise<Response> {
    const llms = await getLlmsTxt();

    if (!llms?.trim()) {
        return new Response("Not found", { status: 404 });
    }

    return new Response(llms, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
