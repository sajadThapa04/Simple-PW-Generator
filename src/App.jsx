import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const randomStrGenerator = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-+=/'{}|";

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setPassword(pass); // Update the password state
  };
  const PasswordGenerator = useCallback(randomStrGenerator, [
    length,
    numberAllowed,
    charAllowed,
    setPassword,
  ]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,6)

    window.navigator.clipboard.writeText(password);
    // console.log(window.navigator.clipboard.writeText(password));
  }, [password]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <>
      <div className=" w-screen h-screen bg-black-500">
        <div className="flex flex-col my-10 mx-5 items-center rounded-lg py-4 px-10  bg-gray-700">
          <h1 className="text-5xl text-left text-white my-6">
            Password Generator
          </h1>
          <div className="flex overflow-hidden rounded-lg mb-4 w-full">
            <input
              type="text"
              value={password}
              className="w-screen flex outline-none py-8 px-3 text-xl text-center"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
          </div>
          <button
            className="bg-blue-500 text-3xl text-white py-4 px-4 rounded-lg"
            onClick={PasswordGenerator}
          >
            Generate Password
          </button>

          <button
            className="flex flex-wrap bg-green-500 mt-3 text-black py-4 px-4 rounded-br-full"
            onClick={copyPasswordToClipboard}
          >
            Copy Password
          </button>
          <div className="flex flex-wrap text-3xl my-3 items-center gap-x-1">
            <label className="text-orange-500 px-4"> length:{length}</label>
            <input
              type="range"
              min={8}
              max={64}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="flex text-3xl items-center">
            <label htmlFor="numberInput" className="ml-8 text-orange-500 px-4">
              {" "}
              Number
            </label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              value={length}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
          </div>
          <div className="flex text-3xl items-center">
            <label htmlFor="charInput" className="ml-8 text-orange-500 px-4">
              {" "}
              Character
            </label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              value={length}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
