import React from "react";
import { Mode, ITopMenuProps } from "../interfaces";

function TopMenu(props: ITopMenuProps) {
	const topMenu = [
		{ link: "/komandir/contentTypes", text: "Content Types", selected: props.mode === Mode.ContentTypes },
		{ link: "/komandir/content", text: "Content", selected: props.mode === Mode.Content }
	];
	return <div className="top-menu">
		{topMenu.map((m, i) => (
			<a key={`menu${i}`} className={m.selected ? "menu-item menu-item-selected" : "menu-item"} href={m.link}>
				{m.text}
			</a>
		))}
	</div>
}

export default TopMenu;