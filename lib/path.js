const jPath = require('java/nio/file/Paths');
const os = require('os');

function getDirSep() {
  if (os.platform() == 'win32') return '\\';
  else return '/';
}

function pathGet(paths) {
  let result = jPath.get(paths[0].toString(), []);
  for (let i = 1; i < paths.length; ++i) {
    const path = paths[i];
    if (path) {
      result = result.resolve(path);
    }
  }
  return result;
}

exports.basename = function(path, ext) {
  if (typeof path !== 'string') throw 'Path must be a string';
  const pathSplit = path.split(getDirSep());
  let found = pathSplit[pathSplit.length - 1];
  if (ext != undefined) {
    for (let i = 0; i < ext.length; i++) {
      if (found.endsWith(ext[i])) {
        found = found.replace(ext[i], '');
      }
    }
  }

  return found;
};

exports.delimiter = os.platform() == 'win32' ? ';' : ':';

exports.dirname = function(path) {
  const separator = getDirSep();
  const split = path.split(separator);
  let result = '';
  for (let i = 0; i < split.length - 1; i++) {
    result += separator + split[i];
  }
  return result;
};

exports.extname = function(path) {
  const split = path.split('.');
  return split[split.length - 1];
};

exports.format = function(pathObject) {
  const sep = getDirSep();
  let dir = '';
  let file = '';
  if (pathObject.base != undefined && pathObject.dir) {
    dir = pathObject.dir + sep;
  } else if (!pathObject.dir) {
    dir = pathObject.root + sep;
  }
  if (!pathObject.base) {
    file = pathObject.name + pathObject.ext;
  } else {
    file = pathObject.base;
  }
  return dir + sep + file;
};

exports.isAbsolute = function(path) {
  return jPath.get(path).isAbsolute();
};

exports.join = function(...paths) {
  return exports.normalize(paths.join(getDirSep()));
};

exports.normalize = function(path) {
  if (!path.length === 0) return '';
  return jPath
    .get(path)
    .normalize()
    .toString();
};

exports.parse = function(path) {
  const jp = jPath.get(path);
  const file = jp
    .getFileName()
    .toString()
    .split('.');
  const e = file[file.length - 1];
  return {
    root: jp.getRoot().toString(),
    dir: jp.getParent().toString(),
    base: jp.getFileName().toString(),
    name: jp
      .getFileName()
      .toString()
      .replace(e, ''),
    ext: e
  };
};

exports.relative = function(from, to) {
  return exports.jrelative(from, to).toString();
};

exports.resolve = function(...paths) {
  if (paths.length === 0) return '';
  if (typeof paths === 'string') {
    paths = [paths];
  }
  return pathGet(paths)
    .normalize()
    .toString();
};

exports.sep = getDirSep();

exports.posix = {};
exports.win32 = {};
