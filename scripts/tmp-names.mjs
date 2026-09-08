import fs from "node:fs";
for (const f of ["set-core", "set-a", "set-b", "set-c", "set-d", "set-e"]) {
  const src = fs.readFileSync(`packages/icons/src/${f}.tsx`, "utf8");
  const keys = [...src.matchAll(/"([a-z0-9-]+)":/g)].map((m) => m[1]);
  console.log(f, "raw-keys:" + keys.length);
}
