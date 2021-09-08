import React from "react";
import useVisualMode from "hooks/useVisualMode";

// Import appointment components to use as visual modes
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;

  // Store modes as variables
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Determine initial mode for appointments
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    // Format interview object
    const interview = {
      student: name,
      interviewer,
    };
    // Show status mode
    transition(SAVING);
    // Run packaged axios call to book interview
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  }

  function cancel() {
    // Show status mode
    transition(DELETING, true);
    // Run packaged axios call to delete an interview
    cancelInterview(id)
      .then((response) => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      {/* Header Always Shows */}

      <Header time={time} />

      {/* Initial Modes */}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {/* Editable Modes */}

      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {/* Status/Error Messages */}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"You sure about that?"}
          onCancel={() => back()}
          onConfirm={() => cancel()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Appointment cannot be saved." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Appointment cannot be deleted." onClose={back} />
      )}
    </article>
  );
}
