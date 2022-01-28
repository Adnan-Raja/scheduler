import React from "react";

import "./styles.scss";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

import Form from "./Form";

import Status from "./Status";

import Confirm from "./Confirm";

import Error from "./Error";


import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE= "ERROR_SAVE";
const ERROR_DELETE= "ERROR_DELETE";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(res => {
      transition(SHOW)})
     // window.location.reload()})
      .catch((error) => transition(ERROR_SAVE, true));   
  }

  function deleteAppointment(id) {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => 
      {transition(EMPTY)
      // window.location.reload(); 
      })
    .catch((error) => transition(ERROR_DELETE, true));
    }


  //console.log(props.bookInterview)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //console.log(props.interview)
 
  return (
    <main className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />} */}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === SAVING && ( <Status />)}
      {mode === DELETING && (<Status message="Deleting" />)}
      {mode === CONFIRM && (<Confirm message="Cancel" onCancel={() => back()} onConfirm={deleteAppointment} />)}
      
      {mode === EDIT && (<Form
          student={props.interview.student}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />) }

      {mode === "ERROR_SAVE" && (<Error onClose={() => transition(SHOW) }  message="Error: Could not save." />) }
      {mode === "ERROR_DELETE" && (<Error onClose={() => transition(SHOW) } message="Error: Could not delete." />) }


    </main>
    
  );
}

