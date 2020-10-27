import React from 'react';

import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";

import './styles.scss';

export default function Appointment(props) {

  const {time, interview} = props;

  return (
    <article className="appointment">
      <Header time={time}/>
      {interview
        ? <Show interviewer={interview.interviewer} student={interview.student} /> 
        : <Empty />}
    </article>
  )
}