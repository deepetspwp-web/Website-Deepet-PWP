import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
import { CMS_TAGS } from "./queries";

/** Clears cached content after an admin edit so the website updates right away. */
export function refreshContent(...tags: (keyof typeof CMS_TAGS)[]) {
    for (const t of tags) revalidateTag(CMS_TAGS[t], { expire: 0 });
    revalidatePath("/", "layout");
}
