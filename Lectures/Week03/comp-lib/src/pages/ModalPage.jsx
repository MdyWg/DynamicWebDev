import {useState} from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'

const LIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices tempor euismod. Duis lacinia gravida tempor. Nulla posuere quam vitae purus tincidunt consectetur. Cras condimentum ut mauris quis convallis. Praesent nibh nulla, rhoncus sit amet pharetra egestas, imperdiet a leo. Quisque ut euismod mauris. Nam eu lacus ut nunc cursus porta. Pellentesque finibus arcu lorem, ut finibus enim ultrices ac."


const ModalPage = () => {
    const [modalOpen, setModalOpen] = useState()
    const handleClick = () => {
        setModalOpen(true)
    }

    const handleCloseClick = () => {
        setModalOpen(false)
    }

    const modalContent = <p>This is modal content populated by the children prop!</p>

    const actionBar = (
        <>
    <Button success outline onclick={()=> {console.log('other button function fired')}}>Some Prompt</Button>
    <Button danger outline onClick={handleCloseClick} className="ml-4">Close</Button>
        </>

    )
    return (<div className="relative">
        {[...Array(15)].map((_, index) => (
            <p key={index} className="mb-8">{LIPSUM}</p>
        ))}
        <Button success rounded onClick = {handleClick}>
            Open Modal! 
            </Button>
        
        {modalOpen && <Modal onClose={handleCloseClick} title="Yay Modal" actionBar={actionBar} crazy>{modalContent}</Modal>}
        
    </div>)
}

export default ModalPage