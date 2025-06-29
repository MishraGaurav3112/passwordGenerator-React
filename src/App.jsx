import { useState,useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [Length, setLength] = useState(6)

  const [NumberAllowed, setNumberAllowed] = useState(false)


  const [CharAllowed, setCharAllowed] = useState(false)


  const [Password, setpassword] = useState("")

  const passwordref = useRef(null)
  const PasswordGenerator = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(NumberAllowed) str += "1234567890";

    if(CharAllowed)  str+= "!@#$%^&890-=?.,<>";

    for(let i =0; i < Length; i++){
      let char = Math.floor(Math.random()*str.length + 1)

      pass += str.charAt(char);
    }

    setpassword(pass);

  },[Length,NumberAllowed,CharAllowed])
  passwordref.current?.select()
  passwordref.current?.setSelectionRange(0, 9)

  const  copypassworfToClipboard = useCallback( ()=>{

    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{
    PasswordGenerator()
  },[Length,NumberAllowed,CharAllowed])



  return (
<>
   <h1 className='text-blue-600 bg-amber-400 text-4xl'>Password Generator</h1>
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3 bg-amber-50"
            placeholder="Password"
            readOnly
            ref ={passwordref}
     
        />
        <button
        onClick={copypassworfToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={Length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {Length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={NumberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={CharAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>

</>
  )
}

export default App
