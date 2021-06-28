let trim = (x) => {
    let value = String(x);
    return value.replace(/^\s+|\s+$/gm, '');
}

exports.isEmpty = (value) => {
    if (value === null || value === undefined || trim(value) === '' || value.length === 0 || Object.entries(value).length === 0) {
        return true;
    } else {
        return false;
    }
}

exports.isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && 'undefined' !== typeof value ? parseFloat(value) : false;
  }