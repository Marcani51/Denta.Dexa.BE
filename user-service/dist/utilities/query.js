"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = getPagination;
const DEFAULT_PAGE_LIMIT = 10;
const DEFAULT_PAGE_NUMBER = 1;
function getPagination(query) {
    const page = parseInt(query.current_page) || DEFAULT_PAGE_NUMBER;
    const limit = parseInt(query.per_page) || DEFAULT_PAGE_LIMIT;
    const skip = (page - 1) * limit;
    return {
        skip,
        limit,
        page
    };
}
//# sourceMappingURL=query.js.map