const { spawn } = require("cross-spawn");
const { copy } = require("fs-extra");
const { series } = require("gulp");

function build() {
    return spawn("npm", ["run", "build"], { stdio: "inherit" });
}

function locales() {
    return copy("locale", "dist/locale");
}

exports.default = () => {
    return spawn("gulp", ["--tasks"], { stdio: "inherit" });
};

exports.build = series(build, locales);