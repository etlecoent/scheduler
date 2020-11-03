import React from "react";

import classNames from 'classnames/bind';
import "components/DayListItem.scss";


export default function DayListItem(props) {
  
  const {name, spots, selected, setDay} = props;
  const dayListItemClass = classNames(
    'day-list__item',
    {'day-list__item--selected': selected},
    {'day-list__item--full': !spots}
  );

  const formatSpots = () => {
    if (!spots) {
      return `no spots remaining`
    } else if (spots === 1) {
      return `${spots} spot remaining`
    } else {
      return `${spots} spots remaining`
    }
  }

  return (
    <li onClick={() => setDay(name)} className={dayListItemClass} data-testid="day">
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}