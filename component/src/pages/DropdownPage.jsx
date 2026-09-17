import Dropdown from '../components/Dropdown'

const ITEMS = [
    {
        id: '1',
        label: 'Option 1'
    }, 
    {
        id: '2',
        label: 'Option 2'
    }, 
    {
        id: '3', 
        label: 'Option 3'
    }
]
const DropdownPage = () => {
    return (
        <div>
            <Dropdown items={ITEMS} />
        </div>
    )
}

export default DropdownPage