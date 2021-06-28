exports.wrapper = fn => (...args) => fn(...args).catch(args[2]);
