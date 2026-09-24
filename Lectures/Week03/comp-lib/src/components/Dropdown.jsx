import {useState, useRef, useEffect} from "react"
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel"

const Dropdown = (props) => {
    // options is an array of objects each with a label and a value
    const {options, onChange, value} = props

    // keep track of if the dropdown itself is open/closed
    const [isOpen, setIsOpen] = useState(false)
    const divEl = useRef()
    // useEffect takes 2 arguments: a function to fire, an array of things to watch
    // useEffect(()=> {}, []) = run once when the component mounts
    // useEffect(() => {}, [thing, thing2]) = run on mount or whenever thing1 or thing2 updates/changes
    // useEffect(() => {}) run after every single render (same as accidentally calling a function inside code)
    // here we are adding a plain old vanilla js event listener so that we can close the dropdown 
    // when the user clicks outside of our dropdown component
    // if the first argument (the funciton) returns another function, that returned function gets fired
    // when the component unmounts/destroyed. this is usually a cleanup function 
    useEffect(() => {
        // add event listener
        const handlerFunction = (event) => {
            // ifn there is no ref div at all, return
            if (!divEl.current) return
            // if i click on NOT the reference div aka outside my component 
            // close the dropdown without setter 
            if (!divEl.current.contains(event.target)) {
                setIsOpen(false)

            }
        }

        document.addEventListener('click', handlerFunction)

        // if useEffect returns a function, thats a cleanup function
        return () => {
            // remove that event listener/cleanup
            document.removeEventListener('click', handler)
        }
    }, [])


    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    // why does this exist here? to wrap the function we passed in as a prop called onChange
    const handleOptionClick = (option) => {
        setIsOpen(false)
        onChange(option)
    }

    // whenever we map, we need a key at the top level element returned
    const renderedOptions = options.map((opt, index) => {
        return <div key={index} className='hover:bg-sky-100 rounded-md cursor-pointer p-1'
        onClick={() => handleOptionClick(opt)}>
            {opt.label}
        </div>
    })
    return <div ref = {divEl} className="w-48">
        <Panel className= 'flex justify-between items-center cursor-pointer' onClick={handleClick}>
            {value ? value.label : 'Select...'}<GoChevronDown/>
        </Panel>
        {isOpen && <Panel className="">{renderedOptions}</Panel>}
        </div>
}

export default Dropdown