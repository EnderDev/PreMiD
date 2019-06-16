"use strict";
exports.__esModule = true;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var glob = require("glob");
glob("dist/app/**/!(*.js|*.map)", { nodir: true }, function (err, files) {
    Promise.all(files.map(function (f) { return fs_extra_1.removeSync(f); })).then(function () {
        fs_extra_1.copySync("src", "dist/app", {
            filter: function (path) {
                return !(path_1.extname(path) === ".ts");
            }
        });
    });
});
//# sourceMappingURL=dev.js.map