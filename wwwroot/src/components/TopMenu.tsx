import React from "react";
import { Section, ITopMenuProps } from "../interfaces";

function TopMenu(props: ITopMenuProps) {
  const topMenu = [
    {
      link: "/komandir/contentTypes",
      text: "Content Types",
      selected: props.section === Section.ContentTypes
    },
    {
      link: "/komandir/content",
      text: "Content",
      selected: props.section === Section.Content
    }
  ];
  return (
    <div className="top-menu">
      {topMenu.map((m, i) => (
        <a
          key={`menu${i}`}
          className={m.selected ? "menu-item menu-item-selected" : "menu-item"}
          href={m.link}
        >
          {m.text}
        </a>
      ))}
    </div>
  );
}

export default TopMenu;
