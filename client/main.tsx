import { Meteor } from "meteor/meteor";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "/imports/ui/App";

Meteor.startup(() => {
	const container = document.getElementById("react-target");
	// biome-ignore lint/style/noNonNullAssertion: Meteor.startup() is always called
	const root = createRoot(container!);
	root.render(<App />);
});
