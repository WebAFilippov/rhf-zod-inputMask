const getInputNumbersValue = (input) => {
  let value = input.value.replace(/\D/g, '')
  value = value.length > 6 ? value.slice(0, 6) : value
  return value
}

export const onInput = (e) => {
  const input = e.target
  let inputValue = getInputNumbersValue(input)
  let formattedInputValue = "";

  if (!inputValue) {
    return "";
  }

  if (inputValue.length > 4) {
    formattedInputValue += `${inputValue.slice(0, 2)}-${inputValue.slice(2, 4)}-${inputValue.slice(4, 6)}`
  } else if (inputValue.length > 2) {
    formattedInputValue += `${inputValue.slice(0, 2)}-${inputValue.slice(2, 4)}`
  } else {
    formattedInputValue = inputValue
  }

  return formattedInputValue
}