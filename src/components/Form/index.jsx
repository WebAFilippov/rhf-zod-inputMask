import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import scss from "./Form.module.scss"
import { onInput } from "../../helpers/getFormatedInput"

const url = 'https://example.com'

export const Form = () => {
  const [err, setErr] = useState(null)

  const formSchema = z.object({
    email: z.string().email({ message: "Неверный e-mail" }),
    number: z.string().optional()
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data) => {
    const data1 = { ...data, number: Number(data.number.replace(/\D/g, '')) || null }
    console.log(data1, "res")
    setErr(null)
    await fetch(url, { method: "POST", body: data })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(error => setErr(error))
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
      {err?.message && <p className={scss.errorResponse}>{err.message}</p>}
      <button className={scss.button}>SEND</button>
    </form>
  )
}
