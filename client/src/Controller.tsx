import React, { useState } from 'react'
import { Item } from './App';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

interface ControllerProps {
    setItems: (x: Item[]) => void,
    setHasAnimated: (x: boolean) => void,
    disabled: boolean
}

function Controller({setItems, setHasAnimated, disabled}: ControllerProps) {
  const MAX_VALUE_ALLOWED = 50
  const [error, setError] = useState<String | null>(null)

  function handleSubmit(e: any) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.target);
    const valuesString: string = formData.get("values") as string

    let v
    try {
        const values: number[] = valuesString.split(",").map(value => {
            v = value.trim()
            const num = Number(v)
            if (isNaN(num)) throw new Error(`"${v}" is not a valid number`)
            if (v === "") throw new Error("Invalid commas.")
            if (num > MAX_VALUE_ALLOWED) throw new Error(`${v} is too large. Max allowed: ${MAX_VALUE_ALLOWED}`)
            if (num < 1) throw new Error(`${v} is too small. Min allowed: 1`)

            return Number(v)
        })

        makeItems(values)
    } catch(e: any) {
        setError(e.message as string)
        setItems([])
    }
  }

  function handleSetRandomValues() {
    const values: number[] = []
    for (let i = 0; i < 10; i++)
        values.push(Math.floor(Math.random() * MAX_VALUE_ALLOWED) + 1)

    makeItems(values)
  }

  function makeItems(values: number[]) {
    setHasAnimated(false)

    const items = values.map((value, index) => (
        {value, index, color:"aqua"}
    ))

    setItems(items)
  }

  return (
    <>
        <Form onSubmit={handleSubmit} >
            <Form.Group>
                <Form.Label>Values:</Form.Label>
                <Form.Control type="text" name="values" disabled={disabled} required />
            </Form.Group>
            <ButtonGroup className='p-0 w-100'>
                <Button type="submit" variant='primary' disabled={disabled}>Create</Button>
                <Button type='button' variant='secondary' disabled={disabled} onClick={handleSetRandomValues}>Random values</Button>
            </ButtonGroup>
        </Form>

        {error != null && <span>Error: {error}</span>}
    </>
  )
}

export default Controller
