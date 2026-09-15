import {GoBell, GoTrash} from 'react-icons/go'
import Button from '../components/Button'

const ButtonPage = () => {
  return (
    <>
      <h1 className="text-3xl mb-4">Button Page!</h1>
      <div className="mb-3">
        <Button primary onClick={()=> console.log('primary clicked!')}>
                  <GoBell/>
          Buy Now</Button>
      </div>
      <div className="mb-3">
        <Button secondary>Secondary</Button>
      </div>      
      <div className="mb-3">
        <Button success>Success</Button>
      </div>      
      <div className="mb-3">
        <Button danger>Danger</Button>
      </div>      
      <div className="mb-3">
        <Button warning>Warning</Button>
      </div>
      <div className="mb-3">
        <Button danger outline>
                <GoTrash />
          Danger Outline</Button>
      </div>
      <div className="mb-3">
        <Button success rounded>Success Rounded</Button>
      </div>
      <div className="mb-3">
        <Button primary outline rounded>Primary Outline Rounded</Button>
      </div>
      {/* only one color variant can be use a  time */}
      <div className="mb-3">
        <Button primary secondary outline>Primary Secondary Outline</Button>
      </div>

      {/* <button className="px-8 py-3 bg-blue-500 text-white border border-blue-500">Click Me</button> */}
    </>
  )
}

export default ButtonPage
