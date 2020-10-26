import React from 'react';

import classNames from 'classnames/bind';
import 'components/InterviewerListItem.scss'

export default function InterviewerListItem(props) {

  const {id, name, avatar, selected, setInterviewer} = props;
  const interviewerItemClass = classNames(
    'interviewers__item',
    {'interviewers__item--selected': selected}
  );

  return (

    <li onClick={setInterviewer} className={interviewerItemClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}