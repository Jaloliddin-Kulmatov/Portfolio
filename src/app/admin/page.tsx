import { Editor } from "@/components/Editor";
import { canSave, getContent } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Portfolio", robots: { index: false } };

export default async function AdminPage() {
  const content = await getContent();
  return <Editor initial={content} canSave={canSave()} />;
}
