import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const UpdStates = ( {butfunction} ) => {
  console.log('UpdStates occurred')
  //console.log('props', props)

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  console.log('content', content)
  console.log('author', author)
  console.log('info', info)

  return (
    <button id="reset" value="Reset" onClick=butfunction>{ 'Reset Data' }< />
  )
}

export default UpdStates