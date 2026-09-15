//import classnames library as cx to conditionally apply classes based on props
import cx from 'classnames'
// use tailwind merge utility to merge tailwind classes together
import {twMerge} from 'tailwind-merge'

const Button = (props) => {
  const {children, primary, secondary, success, danger, warning, rounded, outline,
    // HW
    small, large, 
    //spreads rest of props to button element
    ...otherProps} = props
  
  // only one color variant can be used at a time
  // !! coerces a boolean value to true or false
  // Number to coerce a boolean value to 0 or 1

  const count = 
  Number(!!primary) +
  Number(!!secondary) +
  Number(!!success) +
  Number(!!danger) + 
  Number(!!warning) 

  //if we get a count > 1 we used 2 color variants at the same time
  if (count > 1) {
    console.warn(
      'You silly goose, you can only use one color variant boolean at a time!'
    )
  }
  const baseClasses = 'flex items-center px-8 py-3 border'
  const classes = twMerge(
  cx(otherProps.className, baseClasses, {
    // color variants, only one can be true at a time
    'bg-blue-500 border-blue-500 text-white' : primary, 
    'bg-gray-500 border-gray-500 text-white' : secondary, 
    'bg-green-500 border-green-500 text-white' : success, 
    'bg-red-500 border-red-500 text-white' : danger, 
    'bg-yellow-500 border-yellow-500 text-white' : warning, 
    // modifiers can be combined with color variants
    'rounded-full': rounded,
    'bg-white': outline,
    // size variants, only one should be used at a time
    // HW
    'px-1 py-1 text-sm': small,
    'px-10 py-10 text-lg': large,
    'text-blue-500': outline && primary, 
    'text-gray-500': outline && secondary,   
    'text-green-500': outline && success, 
    'text-red-500': outline && danger, 
    'text-yellow-500': outline && warning, 
  }
  )
)



  // let classes = 'px-8 py-3 border'
  // if (primary) {
  //   classes += 'bg-blue-500 border-blue-500 text-white'
  // }
  // if (secondary) {
  //   classes += 'bg-gray-500 border-gray-500 text-white'
  // }
  // if (success) {
  //   classes += 'bg-green-500 border-green-500 text-white'
  // }
  // ...



  return <button {...otherProps} className={classes}>{children}</button>
}

export default Button
