import React, { useState } from 'react'
import FacultySidebar from './FacultySidebar'
import AssignWork from './AssignWork'
import AllStudents from './AllStudents'
import EvaluateAssignment from './EvaluateAssignment'
import AwardedMarks from './AwardedMarks'
import JoinRequests from './JoinRequests'
import CreateClass from './CreateClass'

const FacultyHome = () => {

    const [active,setActive] = useState('assign')

  return (
    <div className='flex h-full overflow-hidden'>
        <FacultySidebar active={active} setActive={setActive} />

        <div className='overflow-y-auto flex-1'>
            {
                active === 'assign' && <AssignWork />
            }
            {
                active === "members" && <AllStudents />
            }
            {
                active === "evaluate" && <EvaluateAssignment />
            }
            {
                active === "marks" && <AwardedMarks />
            }
            {
                active === "joinings" && <JoinRequests />
            }
            {
                active === "createClass" && <CreateClass />
            }
        </div>
    </div>
  )
}

export default FacultyHome