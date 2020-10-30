import React from 'react';
import useVisualMode from "../../hooks/useVisualMode"

import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";

import './styles.scss';
import Form from './Form';
import Status from './Status';

export default function Appointment(props) {
  
  const {time, interview, interviewers, bookInterview, id} = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  ); 

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    bookInterview(id, interview).then((response) => {
      transition(SHOW);
    })
    
  }

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interview={interview}
          onCancel={() => back()}
          save={save}
          interviewers={interviewers}
        />
      )}
      {mode === SAVING && (
        <Status 
          message={"Saving"}
        />
      )}
    </article>
  )
}