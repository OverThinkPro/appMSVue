export function initPagination(parentId, childrenId) {
  $("#" + parentId).html("");
  $("#" + parentId).html("<div id='" + childrenId + "' class='pagination'></div>");
};
