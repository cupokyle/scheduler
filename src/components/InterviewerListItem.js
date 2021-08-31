import React from "react";
import classnames from "classnames";
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {'interviewers__item--selected': props.selected});
  return (
<li className={interviewerClass} onClick={() => props.setInterviewer(props.name)}>
  <img
    className="interviewers__item-image"
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
  />
  {props.selected && props.name}
</li>
  );
}