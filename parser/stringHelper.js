const StringHelper = {
    replaceAll: function (str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}

module.exports = StringHelper