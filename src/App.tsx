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
    { id: 1, label: 'Label 0' },
    { id: 2, label: 'Label 1' },
    { id: 3, label: 'Label 2' },
    { id: 4, label: 'Label 3' },
    { id: 5, label: 'Label 4' },
    { id: 6, label: 'label 5' },
    { id: 7, label: 'label 6' },
    { id: 8, label: 'label 7' },
    { id: 9, label: 'label 8' },
    { id: 10, label: 'label 9' },
  ])

  const inputHandler = (val: string) => {
    // console.log(val)
    setString(val)
  }

  return (
    <S.App>
      <Input
        value={string}
        options={options}
        placeholder="Placeholder"
        valueHandler={inputHandler}
        error={{ isError: true, errorText: "Error" }}
      />
    </S.App>
  );
}

export default App;