"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = 'https://jsonplaceholder.typicode.com/todos/1';
axios_1["default"].get(url).then(function (response) {
    var todo = response.data;
    var id = todo.id;
    var title = todo.title;
    var finished = todo.finished;
    console.log("\n    This todo with ID: ".concat(id, "\n    Has a title of: ").concat(title, "\n    and is it finished?: ").concat(finished, "\n  "));
});
