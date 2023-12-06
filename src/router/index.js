import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/drivers",
		name: "drivers",
		component: () =>
			import(/* webpackChunkName: "drivers" */ "../views/DriversView.vue"),
	},
	{
		path: "/driver/:driverId?",
		name: "driver",
		component: () =>
			import(/* webpackChunkName: "driver" */ "../views/DriverEditor.vue"),
	},
	{
		path: "/buses",
		name: "buses",
		component: () =>
			import(/* webpackChunkName: "buses" */ "../views/BusesView.vue"),
	},
	{
		path: "/bus/:busId?",
		name: "bus",
		component: () =>
			import(/* webpackChunkName: "bus" */ "../views/BusesEditor.vue"),
	},
	{
		path: "/assignments",
		name: "assignments",
		component: () =>
			import(/* webpackChunkName: "assignments" */ "../views/AssignmentsView.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
