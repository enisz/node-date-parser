const { spawn } = require("cross-spawn");
const { copy } = require("fs-extra");
const { series } = require("gulp");

function build() {
    return spawn("npm", ["run", "build"], { stdio: "inherit" });
}

function locales() {
    return copy("locale", "dist/locale");
}

function major() {
    return spawn("npm", ["version", "major"], {stdio: "inherit" });
}

function minor() {
    return spawn("npm", ["version", "minor"], {stdio: "inherit" });
}

function patch() {
    return spawn("npm", ["version", "patch"], {stdio: "inherit" });
}

function publish() {
    return spawn("npm", ["publish"], {stdio: "inherit" });
}

exports.default = () => {
    return spawn("gulp", ["--tasks"], { stdio: "inherit" });
};

exports.build = series(build, locales);
exports.major = major;
exports.minor = minor;
exports.patch = patch;
exports.publish = publish;