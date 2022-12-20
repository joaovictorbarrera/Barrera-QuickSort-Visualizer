import React from 'react'
import Container from 'react-bootstrap/esm/Container';
import { Item } from './App';
import useWindowDimensions from './hooks/useWindowDimensions';

interface BoardProps {
    items: Item[]
}

function Board({items}: BoardProps) {
    const { height, width } = useWindowDimensions();

    const MAX_ITEM_WIDTH = 75
    const NUM_GAPS = (items.length + 1)
    const MAX_GAP_SIZE = 8

    const TOTAL_ITEM_GAP_SIZE = width / 10 < NUM_GAPS * MAX_GAP_SIZE ? width / 10 : NUM_GAPS * MAX_GAP_SIZE
    const ITEM_GAP_SIZE = TOTAL_ITEM_GAP_SIZE / NUM_GAPS
    const ITEM_WIDTH = (items.length * MAX_ITEM_WIDTH + TOTAL_ITEM_GAP_SIZE) < width ?
    MAX_ITEM_WIDTH :
    (width - TOTAL_ITEM_GAP_SIZE) / items.length
    console.log(width)
    console.log(TOTAL_ITEM_GAP_SIZE)
    console.log(ITEM_GAP_SIZE)
    console.log(ITEM_WIDTH)
    console.log(ITEM_WIDTH * items.length + TOTAL_ITEM_GAP_SIZE)

    const TRANSLATE_BIAS = ITEM_WIDTH + ITEM_GAP_SIZE
    const HEIGHT_BIAS = 5
    return (
        <div className="board" style={{marginTop: `${51*HEIGHT_BIAS}px`}}>
            {items == null ? [] :
            items.map((item, index) =>
            <div key={index} className="item" style={
            {height: `${item.value * HEIGHT_BIAS}px`,
            width: `${ITEM_WIDTH}px`,
            translate: `${item.index * TRANSLATE_BIAS + ITEM_GAP_SIZE}px 0`,
            backgroundColor: item.color}}>
            <span className="item-number" style={{fontSize: ITEM_WIDTH * .5}}>{item.value}</span>
            </div>)}
        </div>
    )
}

export default Board
