"use client";
import { useRouter } from "next/navigation";

import { useI18n, useScopedI18n } from "@/locales/client";
import Link from "next/link";

export default function page() {
  const router = useRouter();
  const t = useI18n();
  const helloT = useScopedI18n("hello");
  const nameT = useScopedI18n("hello.world");

  return (
    <div>
      <Link href="/stream">stream page</Link>
      <p>{t("hello")}</p>
      <p>{t("hello.world.welcome", { name: "benny" })}</p>
      <p>{helloT("world")}</p>
      <p>{nameT("welcome", { name: "john" })}</p>
      <button onClick={() => router.push("/")}>go to index</button>
    </div>
  );
}
