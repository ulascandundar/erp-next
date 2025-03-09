const menus = [
  // #region test
  {
    path: "test/",
    roles: ["Test_Admin"],
  },
  // #endregion test

  // #region profile
  {
    path: "profile/",
    roles: ["CompanyAdmin"],
  },
  // #endregion profile

  // #region product
  {
    path: "product/",
    roles: ["CompanyAdmin"],
  },
  // #endregion product

  // #region order
  {
    path: "order/",
    roles: ["CompanyAdmin"],
  },
  // #endregion order
];

const hasPermission = (path, roles) => {
  const menuItem = menus.find((menu) => menu.path === path);
  if (!menuItem) return false;

  const hasRole = menuItem.roles.some((role) => roles?.includes(role));
  return hasRole;
};

export { hasPermission };
