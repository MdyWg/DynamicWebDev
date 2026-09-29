/*
  Escape key questions:
  1. Which useEffect form did you use — [], [something], or none — and why?
     [onClose]. The listener uses onClose, which is a prop that can change.
     If it changes, the effect re-runs so Escape always uses the newest one.
  2. What does your cleanup function remove?
     The keydown (Escape) listener, so listeners don't pile up.
*/
import {useEffect} from 'react'

const Modal = ({onClose}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return <div>Modal</div>
}

export default Modal
