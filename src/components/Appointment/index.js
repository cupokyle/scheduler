import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import 'components/Appointment/styles.scss';

export default function Appointment (props) {

  const {time, interview} = props;
  console.log("Bazinga", interview);

  return (
    <article className="appointment">
      {props.interview ? <><Header time={time}/><Show student={interview.student} interviewer={interview.interviewer}/></> : <><Header time={time}/><Empty /></>}
    </article>
  );
}