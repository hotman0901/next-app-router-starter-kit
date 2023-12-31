import { Suspense } from "react";

import Counter from "./counter";
import ListUsers from "./list-users";

export default async function Page() {
  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <Counter />
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>loading... on initial request</p>
        }
      >
        <ListUsers />
      </Suspense>
    </main>
  );
}
