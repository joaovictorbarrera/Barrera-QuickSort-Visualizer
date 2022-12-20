import React, { useMemo, useState } from "react"
import "./App.modules.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Controller from "./Controller"
import quickSort, { UnparsedCommand } from "./services/quicksort"
import Button from 'react-bootstrap/esm/Button';
import Board from "./Board"
import { Form } from 'react-bootstrap';

export interface Item {
  value: number,
  index: number,
  color: string
}

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const [speed, setSpeed] = useState<string>("3");

  function swap(itemIndex1:number, itemIndex2:number) {
    setItems(i => {
      let newItems = [...i]

      const item1 = newItems.find(item => item.index === itemIndex1)
      const item2 = newItems.find(item => item.index === itemIndex2)
      if (!item1 || !item2) return i;

      const arrIndex1 = newItems.indexOf(item1)
      const arrIndex2 = newItems.indexOf(item2)

      newItems[arrIndex1] = {...item1, index: item2.index}
      newItems[arrIndex2] = {...item2, index: item1.index}

      return newItems
    })
  }

  function changeColor(itemIndex:number, color:string) {
    setItems(i => {
      const newItems = [...i]

      const item = newItems.find(item => item.index === itemIndex)
      if (!item) return i

      const arrayIndex = newItems.indexOf(item)

      newItems[arrayIndex] = {...item, color}

      return newItems
    })
  }

  const BASE_DELAY = 120
  const DELAY = ((parseInt(speed) - 6) * -1) * BASE_DELAY
  function animate(commands: {func: (() => void), delay: number}[], i: number) {
    if (i >= commands.length) {
      setAnimating(false)
      return
    }
    commands[i].func()
    setTimeout(() => animate(commands, ++i), DELAY * commands[i].delay)
  }

  function handleAnimate(e: any) {
    e.preventDefault()
    setHasAnimated(true)
    setAnimating(true)
    const unparsedCommands = quickSort([...items.map(item => item.value)]) as UnparsedCommand[]
    const commands = unparsedCommands.map(comm => {
      if (comm.type === "SWAP") return {func: () => swap(comm.index1, comm.index2), delay: 1}
      else return {func: () => changeColor(comm.index, comm.color), delay: 0.5}
    })
    animate(commands, 0)
  }

  return (
    <main>
      <div className="p-2">
        <h1>Quick Sort Visualizer</h1>
        <Controller setItems={setItems} setHasAnimated={setHasAnimated} disabled={animating}/>
      </div>
      <Board items={items} />

      {items.length > 0 ?
      <Form className="mt-5 p-2" onSubmit={handleAnimate}>
        <Form.Group>
          <Form.Label>Speed</Form.Label>
          <Form.Control onChange={(e) => {setSpeed(e.target.value)}} type="number" min={1} max={5} defaultValue={speed}/>
        </Form.Group>
        <Button type="submit" variant='success' disabled={hasAnimated}>
          Animate
        </Button>
      </Form>
      : null}
    </main>
  )
}

export default App;

