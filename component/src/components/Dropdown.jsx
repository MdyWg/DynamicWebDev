import {useState} from 'react'
import {GoChevronDown} from 'react-icons/go'

const Dropdown = (props) => {
    const {items} = props
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState()

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }
    const handleClick = (item) => {
        setSelectedItem(item)
    }

    const renderedItems = items.map((item) => {
        const bar = selectedItem && selectedItem.id === item.id ? "bg-gray-400" : "bg-white"
        return (
            <div key={item.id} className={bar} onClick={() => handleClick(item)}>
                    {item.label}
            </div>
        )
    })

    return <div>
            <div onClick= {handleToggle}>
                <div className="flex items-center"> Options <GoChevronDown/> </div>
            </div>
            {isOpen && renderedItems}
        </div>

}

export default Dropdown