import Index from "views/Index.js";
import PropertyDetail from "views/PropertyDetail";

var routes = [
  {
    path: "/index",
    name: "Properties",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/property-detail/:id",
    name: "Property Details",
    isMenu: false,
    component: PropertyDetail,
    layout: "/admin",
  },
];
export default routes;
