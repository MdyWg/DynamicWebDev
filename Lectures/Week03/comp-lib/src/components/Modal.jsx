/*
  Escape key questions:
  1. Which useEffect form did you use — [], [something], or none — and why?
     [onClose]. The listener uses onClose, which is a prop that can change.
     If it changes, the effect re-runs so Escape always uses the newest one.
  2. What does your cleanup function remove?
     The keydown (Escape) listener, so listeners don't pile up.
*/
import {useEffect} from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

const Modal = (props) => {
  const {onClose, title, children, actionBar, crazy} = props
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    // whenever you add an event listener in useEffect make sure to clean it up in return
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  const overlayClass = crazy
  ? "fixed inset-0 bg-gray-300 opacity-50"
  : "fixed inset-0 bg-gray-300 opacity-50"

  const windowClass = cx(
    "fixed inset-40 p-10 bg-white", {
        'rounded-lg' : crazy,
    }
  )


  return createPortal(<>
  {/* a transparent overlay, click to close the modal */}
    <div className={overlayClass}></div>
    {/* Modal content */}
    <div className={windowClass}>
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
      <div className="flex flex-row justify-end absolute bottom-0 right-0 p-4">{actionBar}</div>
      
      <button onClick={onClose}>Close</button>
    </div>
  </>, document.getElementById('portal'))
}

export default Modal
