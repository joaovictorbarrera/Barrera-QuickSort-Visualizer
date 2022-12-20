export type UnparsedCommand = {type: "SWAP", index1:number, index2:number} |
                            {type: "CHANGECOLOR", index:number, color:string}

export default function quickSort(arr: number[]) {
    if (arr == null || arr.length <= 1) return
    const commands: UnparsedCommand[] = []
    quickSortWithIndex(arr, 0, arr.length - 1, commands)
    return commands
}

function quickSortWithIndex(arr: number[], start: number, end: number, commands:UnparsedCommand[]) {
    if (start >= end) {
        for (let i = start; i <= end; i++)
            commands.push({type:"CHANGECOLOR", index: i, color:"orange"})
        return
    };

    // Returns pivotIndex
    const pivotIndex = partition(arr, start, end, commands);

    for (let i = start; i <= end; i++) {
        if (i === pivotIndex) continue;
        commands.push({type:"CHANGECOLOR", index: i, color:"aqua"})
    }


    commands.push({type:"CHANGECOLOR", index: pivotIndex, color:"orange"})

    // Recursively apply the same logic to the left and right subarrays
    quickSortWithIndex(arr, start, pivotIndex - 1, commands);
    quickSortWithIndex(arr, pivotIndex + 1, end, commands);
}

function partition(arr: number[], start: number, end: number, commands:UnparsedCommand[]){
    const randIndex = Math.floor(Math.random() * (end - start)) + start
    commands.push({type:"CHANGECOLOR", index: randIndex, color:"purple"})
    swap(arr, end, randIndex, commands)
    const pivotValue = arr[end];

    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue || (arr[i] === pivotValue && Math.random() > 0.5)) {
            commands.push({type:"CHANGECOLOR", index: i, color:"#99FF66"})
            // Swapping elements
            swap(arr, i, pivotIndex, commands)
            // Moving to next element
            pivotIndex++;
        } else {
            commands.push({type:"CHANGECOLOR", index: i, color:"red"})
        }
    }

    // Putting the pivot value in the middle
    swap(arr, end, pivotIndex, commands)
    return pivotIndex;
}

function swap(arr: number[], index1: number, index2: number, commands:UnparsedCommand[]) {
    if (index1 === index2) return
    commands.push({type: "SWAP", index1, index2})
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
