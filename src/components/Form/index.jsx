import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import { onInput } from "../../helpers/getFormatedInput"

import scss from "./Form.module.scss"

const url = 'https://example.com' // URL сервера

export const Form = () => {
  const [err, setErr] = useState(null) // {status , message} сообщение о ошибке с сервера

  const formSchema = z.object({  // Схема валидации формы
    email: z.string().email({ message: "Неверный e-mail" }),
    number: z.string().optional()
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data) => {
    const fetchData = { ...data, number: Number(data.number.replace(/\D/g, '')) || null } // Инфо с полей формы. { email: data.email, number: data.number }
    setErr(null) // Обнуление поля ошибки с сервера перед отправкой запроса
    await fetch(url, { method: "POST", body: fetchData }) // Запрос на сервер
      .then(res => res.json())
      .then(res => console.log(res)) // Печать ответа 
      .catch(error => setErr(error)) // Печать ошибки
  }

  return (
    <form noValidate className={scss.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={scss.title}>FORM</h1>
      <div className={scss.input_group}>
        <label htmlFor="email">Email:</label>
        <input className={scss.input} id="email" type="email" {...register("email")} />
        {errors.email?.message && <p className={scss.error}>{errors.email?.message}</p>}
      </div>
      <div className={scss.input_group}>
        <label htmlFor="number">Number:</label>
        <input className={scss.input} id="number" type="text" inputMode="numeric"  {...register("number")} 
              onChange={(e) => { setValue("number", onInput(e)) }} />
        {errors.number?.message && <p className={scss.error}>{errors.number?.message}</p>}
      </div>
      {err?.message && <p className={scss.errorResponse}>Status: {err.status}<br/>Message: {err.message}</p>}
      <button className={scss.button}>SEND</button>
    </form>
  )
}
