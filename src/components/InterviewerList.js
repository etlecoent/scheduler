import React from 'react';

import InterviewerListItem from "components/InterviewerListItem";
import 'components/InterviewerList.scss';

export default function InterviewerList(props) {

  const {interviewers, interviewer, setInterviewer} = props;

  const interviewerList = interviewers.map(e => {
    return (
      
      <InterviewerListItem
        key={e.id}
        name={e.name}
        avatar={e.avatar}
        setInterviewer={setInterviewer}
        selected={e.id === interviewer}
      ></InterviewerListItem>
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
}