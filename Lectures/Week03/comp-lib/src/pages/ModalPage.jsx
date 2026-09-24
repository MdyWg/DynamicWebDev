import {useState} from 'react'
import Button from '../components/Button'
import Modal from '../components/Dropdown'

const ModalPage = () => {
    const [modalOpen, setModalOpen] = useState()
    const handleClick = () => {
        setModalOpen(true)
    }
    return (<div>
        <Button success rounded onClick = {handleClick}>
            Open Modal! 
            </Button>
        
        {modelOpen && <Modal/>}
        
    </div>)
}

export default ModalPage