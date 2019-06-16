import { copySync, removeSync, remove } from "fs-extra";
import { extname } from "path";
import * as glob from "glob";

glob("dist/app/**/!(*.js|*.map)", { nodir: true }, function(err, files) {
  Promise.all(files.map(f => removeSync(f))).then(() => {
    copySync("src", "dist/app", {
      filter: function(path) {
        return !(extname(path) === ".ts");
      }
    });
  });
});
