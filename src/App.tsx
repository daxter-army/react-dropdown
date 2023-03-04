import React, { useState } from "react"
import Input from './components/Input/Input';

import S from "./Styles"

export type optionItemProps = {
  id: number,
  label: string;
}

function App() {
  const [string, setString] = useState<string>("")
  const [options,] = useState<optionItemProps[]>([
    { id: 1, label: 'Grinning face 😀' },
    { id: 2, label: 'Grinning face with big eyes 😃	' },
    { id: 3, label: 'Beaming face with smiling eyes 😁' },
    { id: 4, label: 'Smiling face with halo 😇' },
    { id: 5, label: 'Star-struck 🤩' },
    { id: 6, label: 'label 5 🤪' },
    { id: 7, label: 'Face in clouds 😶‍🌫️' },
    { id: 8, label: 'Relieved face 😌' },
    { id: 9, label: 'Miling face with sunglasses 😎' },
    { id: 10, label: 'Alien monster 👾' },
  ])

  const inputHandler = (val: string) => {
    // console.log(val)
    setString(val)
  }

  return (
    <S.App>
      <S.ContentCtr>
        <h1>react-dropdown<br /> with <kbd>{`<keyboard/>`}</kbd> navigation</h1>
        <br />
        <p>A completely customisable React dropdown component, <br />equipped with keyboard navigation support</p>
        <br /><br />
        <Input
          value={string}
          options={options}
          valueHandler={inputHandler}
          // validator={(val) => val.includes("hel")}
          placeholder="Type or select value here. . ."
          error={{ isError: false, errorText: "Error" }}
        // customInputStyles={{}}
        // customDropdownItemStyles={{}}
        />
      </S.ContentCtr>
    </S.App>
  );
}

export default App;