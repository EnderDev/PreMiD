console.clear();

import { copySync, removeSync, writeFileSync } from "fs-extra";
import { extname, basename } from "path";
import * as glob from "fast-glob";

(async () => {
  var dist = await glob("dist/app/**/*", { onlyFiles: true }),
    src = await glob("src/**/*", { onlyFiles: true });

  //* Delete js files in dist that are no longer existant in src folder
  await Promise.all(
    dist
      .map(f => [
        f.replace("dist/app/", "").replace(basename(f), basename(f, ".js")),
        f
      ])
      .filter(
        d =>
          !src
            .map(f =>
              f.replace("src/", "").replace(basename(f), basename(f, ".ts"))
            )
            .includes(d[0])
      )
      .map(f => removeSync(f[1]))
  );

  var srcPackageJSON = require("./src/package.json"),
    packageJSON = require("./package.json");

  srcPackageJSON.dependencies = packageJSON.dependencies;
  srcPackageJSON.devDependencies = {
    electron: packageJSON.devDependencies.electron
  };

  await writeFileSync(
    "./src/package.json",
    JSON.stringify(srcPackageJSON, null, 2)
  );

  //* Copy files from src to dist
  copySync("src", "dist/app", {
    filter: function(path) {
      return extname(path) !== ".ts";
    }
  });
})();
