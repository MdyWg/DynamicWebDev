import {useState} from "react"
import Dropdown from '../components/Dropdown'

// data should live in parent component not reusable atomic component
const OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
]

const COLOR_MAP = {
    red: 'bg-red-500', 
    green: 'bg-green-500', 
    blue: 'bg-blue-500'
}

const DATA_TO_FILTER = [
  {id: 1, name: 'Katie', team: 'red'},
  {id: 2, name: 'a', team: 'green'},
  {id: 3, name: 'b', team: 'blue'},
  {id: 4, name: 'c', team: 'red'},
  {id: 5, name: 'd', team: 'green'},
]

// apply a classname based on selected value
// COLOR_MAP[{value.value}]

const DropdownPage = () => {
    //whenever we have a form element, the parent of the form is what keeps track of the selected value 
    const [value, setValue] = useState(null)

    let filteredData = DATA_TO_FILTER

    //?. optional chaining: if value is null, stop and dont explode
    if (value?.value) {
      // Array.filter takes a callback function that receives each object one at a time 
      // A condition that needs to be true, to keep/filter that object
      filteredData = DATA_TO_FILTER.filter((s) => {
        //this statement needs to be true to "keep" this individual s in our Array
        return s.team === value.value 
      })
    }
    const handleChange = (option) => {
        setValue(option)
    }

  return (
    <div>
        {/* value?.label = if value exists, render the label, otherwise exit */}
        <h1 className={COLOR_MAP[value?.value]}> Dropdown page with user selected value of {value?.label}</h1>
      <Dropdown options={OPTIONS} onChange={handleChange} value={value}/>
      <h2 className="mt-4">Students from {value?.label ?? 'every team'}</h2>
        
        {filteredData.map((student) => {
          <p key = {student.id}>{student.name}</p>
        })}
      
    </div>
  )
}

export default DropdownPage