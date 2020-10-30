import React from 'react';
import useVisualMode from "../../hooks/useVisualMode"

import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";

import './styles.scss';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {
  
  const {time, interview, interviewers, bookInterview, cancelInterview, id} = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  ); 

  function save(name, interviewer) {
    
    console.log(interviewer);
    
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    bookInterview(id, interview).then((response) => {
      transition(SHOW);
    })
    
  }

  function onDelete() {
    
    transition(DELETING);

    cancelInterview(id).then((response) => {
      transition(EMPTY);
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
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
      {mode === EDIT && (
        <Form
          interview={interview}
          onCancel={() => back()}
          save={save}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          name={interview.student}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        message={"Are you sure wou would like to delete?"}
        onCancel={() => back()}
        onConfirm={onDelete}
        />
      )}
      {mode === SAVING && (
        <Status 
          message={"Saving"}
        />
      )}
      {mode === DELETING && (
        <Status 
          message={"Deleting"}
        />
      )}
    </article>
  )
}