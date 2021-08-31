import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss';


export default function InterviewerList(props) {
  const parsedInterviewers = props.interviewers.map(interviewer => <InterviewerListItem 
  key={interviewer.id}
  name={interviewer.name}
  avatar={interviewer.avatar}
  selected={interviewer.id === props.interviewer}
  setInterviewer={event => props.setInterviewer(interviewer.id)}
  />)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  );
}







  // const parsedDays = props.days.map(day => <DayListItem 
  //   key={day.id}
  //   name={day.name} 
  //   spots={day.spots} 
  //   selected={day.name === props.day}
  //   setDay={props.setDay}  />)