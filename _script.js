const variant = 3327;
const variantString = variant.toString();
const n1 = parseInt(variantString[0]);
const n2 = parseInt(variantString[1]);
const n3 = parseInt(variantString[2]);
const n4 = parseInt(variantString[3]);

const n = 10 + n3;

let matrix = [];
const koef = 1 - n3 * 0.01 - n4 * 0.005 - 0.15;
for (let i = 0; i < n; i++) {
    let row = []; 
    for (let j = 0; j < n; j++) { 
        let elem = (Math.random() * 2) * koef;
        row.push(Math.floor(elem));
    }
    matrix.push(row); 
}
console.log(matrix);

 // Розміщення вершин у колі
 const nodePositions = [];
 const radius = 450;
 const centerX = 500;
 const centerY = 500;
 const angleIncrement = (2 * Math.PI) / (n - 1);      
        
 for (let i = 0; i < n - 1; i++) {
    const x = centerX + radius * Math.cos(i * angleIncrement);
    const y = centerY + radius * Math.sin(i * angleIncrement);
    nodePositions.push({ x, y });
} 
const x = centerX;
const y = centerY;
nodePositions.push({ x, y });
    
// Малюємо граф на canvas
const canvasArrows = document.getElementById('graphCanvasWithArrows');
const ctxArrow = canvasArrows.getContext('2d');

// Малюємо зв'язки між вершинами
ctxArrow.strokeStyle = 'black';
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // Малюємо лінію між вершинами (зв'язок), якщо існує зв'язок між ними
        if (matrix[i][j] == 1) {
            if(i != j)
            {
                ctxArrow.beginPath();
                ctxArrow.moveTo(nodePositions[j].x, nodePositions[j].y);
                if((nodePositions[j].x < centerX && nodePositions[i].x < centerX) || (nodePositions[j].x > centerX && nodePositions[i].x > centerX))
                {
                    ctxArrow.lineTo(nodePositions[i].x + 20, nodePositions[i].y);
                }
                else {
                    ctxArrow.lineTo(nodePositions[i].x, nodePositions[i].y + 20);
                }
                ctxArrow.stroke();
                const angle = Math.atan2(nodePositions[j].y - nodePositions[i].y, nodePositions[j].x - nodePositions[i].x);
                const offsetX = Math.cos(angle) * 30;
                const offsetY = Math.sin(angle) * 30;          
                drawArrowhead(ctxArrow, nodePositions[j].x - offsetX, nodePositions[j].y - offsetY, angle);
            }
            else {
                selfArrow(i);
            }
        }
        }
    }      

// Малюємо вершини
for (let i = 0; i < n; i++) {
    ctxArrow.fillStyle = 'grey';
    ctxArrow.beginPath();
    ctxArrow.arc(nodePositions[i].x, nodePositions[i].y, 30, 0, Math.PI * 2);
    ctxArrow.fill();
    ctxArrow.closePath();
    ctxArrow.fillStyle = 'white'; 
    ctxArrow.font = '24px Arial';
    ctxArrow.textAlign = 'center';
    ctxArrow.textBaseline = 'middle';
    ctxArrow.fillText(`${i+1}`, nodePositions[i].x, nodePositions[i].y);
}       
        
function drawArrowhead(ctx, x, y, angle) {
    const arrowheadSize = 15;
    ctxArrow.save();
    ctxArrow.translate(x, y);
    ctxArrow.rotate(angle);
    ctxArrow.beginPath();
    ctxArrow.moveTo(0, 0);
    ctxArrow.lineTo(-arrowheadSize, arrowheadSize / 2);
    ctxArrow.lineTo(-arrowheadSize, -arrowheadSize / 2);
    ctxArrow.closePath();
    ctxArrow.fill();
    ctxArrow.restore();
}


function selfArrow(i) {
    const arrowheadSize = 15;
    let x, y;

    // Визначаємо зміщення для початку стрілки в залежності від положення ноди на канвасі
    const offsetX = nodePositions[i].x < canvasArrows.width / 2 ? -30 : 30;

    // Визначаємо напрямок стрілки в залежності від положення ноди на канвасі
    const angle = nodePositions[i].x < canvasArrows.width / 2 ? Math.PI / 4 : Math.PI * 3 / 4;

    // Розраховуємо координати початку стрілки
    x = nodePositions[i].x + offsetX;
    y = nodePositions[i].y;

    ctxArrow.beginPath();
    ctxArrow.moveTo(nodePositions[i].x, nodePositions[i].y);
    ctxArrow.lineTo(x, y);
    ctxArrow.stroke();
    drawArrowhead(ctxArrow, x, y, angle);

    ctxArrow.beginPath();
    ctxArrow.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5/2);
    ctxArrow.stroke();
    ctxArrow.closePath();
}

function selfCircle(i) {
    let x, y;

    const offsetX = nodePositions[i].x < canvas.width / 2 ? -30 : 30;

    x = nodePositions[i].x + offsetX;
    y = nodePositions[i].y;

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5);
    ctx.stroke();
    ctx.closePath();
}
function Queue() {
    this.head = 0;
    this.tail = 0;
    this.storage = {};
}

Queue.prototype.enqueue = function(data) {
    this.storage[this.tail] = data;
    this.tail++;
};

Queue.prototype.dequeue = function() {
    let head = this.head;
    let tail = this.tail;
    let deletedData;
    if (head !== tail) {
        deletedData = this.storage[head];
        delete this.storage[head];
        this.head++;
        return deletedData;
    }
};

Queue.prototype.contains = function(data) {
    for (let i = this.head; i < this.tail; i++) {
        if (this.storage[i] === data) {
            return true;
        }
    }
    return false;
};

Queue.prototype.delete = function(data) {
    for (let i = this.head; i < this.tail; i++) {
        if (this.storage[i] === data) {
            delete this.storage[i];
            if (i === this.head) {
                this.head++;
            }
            return true;
        }
    }
    return false;
};


const checkIfHasOuterLine = (i) => {
    return matrix[i].includes(1);
}

const connectedNodes = (i) =>{
    let res = [];
    for(let j = 0; j < matrix[i].length; j++)
    {
        if(matrix[i][j] == 1) res.push(j);
    }
    return res;
}

let queue = [];
let visitedNodes = [];
let nodesAndParents = {};
const colorQueueNode = (node) => {
    if(!visitedNodes.includes(node)){
        let i = node;
        ctxArrow.fillStyle = 'blue';
        ctxArrow.beginPath();
        ctxArrow.arc(nodePositions[i].x, nodePositions[i].y, 30, 0, Math.PI * 2);
        ctxArrow.fill();
        ctxArrow.closePath();
        ctxArrow.fillStyle = 'white'; 
    ctxArrow.font = '24px Arial';
    ctxArrow.textAlign = 'center';
    ctxArrow.textBaseline = 'middle';
    ctxArrow.fillText(`${i+1}`, nodePositions[i].x, nodePositions[i].y);
    }
    
}
const colorQueueNodeConnections = (node1, node2) =>{
    let i = node1;
    let j = node2;
    ctxArrow.strokeStyle = 'blue';
            if(i != j)
            {
                ctxArrow.beginPath();
                ctxArrow.moveTo(nodePositions[j].x, nodePositions[j].y);
                if((nodePositions[j].x < centerX && nodePositions[i].x < centerX) || (nodePositions[j].x > centerX && nodePositions[i].x > centerX))
                {
                    ctxArrow.lineTo(nodePositions[i].x + 20, nodePositions[i].y);
                }
                else {
                    ctxArrow.lineTo(nodePositions[i].x, nodePositions[i].y + 20);
                }
                ctxArrow.stroke();
                const angle = Math.atan2(nodePositions[j].y - nodePositions[i].y, nodePositions[j].x - nodePositions[i].x);
                const offsetX = Math.cos(angle) * 30;
                const offsetY = Math.sin(angle) * 30;     
                ctxArrow.fillStyle = 'blue';      
                drawArrowhead(ctxArrow, nodePositions[j].x - offsetX, nodePositions[j].y - offsetY, angle);
            }
            else {
                ctxArrow.fillStyle = 'blue';      
                selfArrow(i);
            }
}
const colorVisitedNode = (node) => {
    let i = node;
    ctxArrow.fillStyle = 'red';
    ctxArrow.beginPath();
    ctxArrow.arc(nodePositions[i].x, nodePositions[i].y, 30, 0, Math.PI * 2);
    ctxArrow.fill();
    ctxArrow.closePath();
    ctxArrow.fillStyle = 'white'; 
    ctxArrow.font = '24px Arial';
    ctxArrow.textAlign = 'center';
    ctxArrow.textBaseline = 'middle';
    ctxArrow.fillText(`${i+1}`, nodePositions[i].x, nodePositions[i].y);
}
const colorVisitedNodeConnections = (node1, node2) =>{
    let i = node1;
    let j = node2;
    ctxArrow.strokeStyle = 'red';
        if (matrix[i][j] == 1 && !queue.includes(i)) {
            if(i != j)
            {
                ctxArrow.beginPath();
                ctxArrow.moveTo(nodePositions[j].x, nodePositions[j].y);
                if((nodePositions[j].x < centerX && nodePositions[i].x < centerX) || (nodePositions[j].x > centerX && nodePositions[i].x > centerX))
                {
                    ctxArrow.lineTo(nodePositions[i].x + 20, nodePositions[i].y);
                }
                else {
                    ctxArrow.lineTo(nodePositions[i].x, nodePositions[i].y + 20);
                }
                ctxArrow.stroke();
                const angle = Math.atan2(nodePositions[j].y - nodePositions[i].y, nodePositions[j].x - nodePositions[i].x);
                const offsetX = Math.cos(angle) * 30;
                const offsetY = Math.sin(angle) * 30;
                ctxArrow.fillStyle = 'red';           
                drawArrowhead(ctxArrow, nodePositions[j].x - offsetX, nodePositions[j].y - offsetY, angle);
            }
            else {
                ctxArrow.fillStyle = 'red';           
                selfArrow(i);
            }
        }
}
const uncolorNodeConnections = (node1, node2) =>{
    let i = node1;
    let j = node2;
    ctxArrow.strokeStyle = 'black';
        if (matrix[i][j] == 1 && !queue.includes(i)) {
            if(i != j)
            {
                ctxArrow.beginPath();
                ctxArrow.moveTo(nodePositions[j].x, nodePositions[j].y);
                if((nodePositions[j].x < centerX && nodePositions[i].x < centerX) || (nodePositions[j].x > centerX && nodePositions[i].x > centerX))
                {
                    ctxArrow.lineTo(nodePositions[i].x + 20, nodePositions[i].y);
                }
                else {
                    ctxArrow.lineTo(nodePositions[i].x, nodePositions[i].y + 20);
                }
                ctxArrow.stroke();
                const angle = Math.atan2(nodePositions[j].y - nodePositions[i].y, nodePositions[j].x - nodePositions[i].x);
                const offsetX = Math.cos(angle) * 30;
                const offsetY = Math.sin(angle) * 30;
                ctxArrow.fillStyle = 'red';           
                drawArrowhead(ctxArrow, nodePositions[j].x - offsetX, nodePositions[j].y - offsetY, angle);
            }
            else {
                ctxArrow.fillStyle = 'black';           
                selfArrow(i);
            }
        }
}

for(let i = 0; i < matrix.length; i++)
{
    if (checkIfHasOuterLine(i)){
        queue.push(i);
        colorQueueNode(i);
        break;
    }
}
let visitedINdex = 0;
const nextStep = () =>{
    let connected;
    connected = connectedNodes(queue[queue.length - 1]);
    visitedNodes.push(queue[queue.length - 1]);
    queue.pop();
    for(let q of connected)
    {
        if(!visitedNodes.includes(q))
        {
            if(queue.includes(q))
            {
                queue.splice(queue.indexOf(q), 1);
            }
            queue.push(q);
            colorQueueNode(q);
            colorQueueNodeConnections(visitedNodes[visitedINdex], q);
            if(matrix[q][q] === 1)
            colorQueueNodeConnections(q, q);
            nodesAndParents[q] = visitedNodes[visitedINdex];
            if (matrix[visitedNodes[visitedNodes.length - 1]][q] === 1)
            uncolorNodeConnections(visitedNodes[visitedNodes.length - 1], q);
        }
    }
    colorVisitedNode(visitedNodes[visitedINdex]);
    console.log(nodesAndParents)
    console.log(visitedNodes[visitedINdex]);
    console.log(nodesAndParents[visitedNodes[visitedINdex]]);
    if(visitedINdex > 0)
    colorVisitedNodeConnections(nodesAndParents[visitedNodes[visitedINdex]], visitedNodes[visitedINdex]);
    visitedNodes.forEach(function(value) {
        if(matrix[value][value] === 1)
        colorVisitedNodeConnections(value, value);
      });
    visitedINdex++;
    console.log(queue);
    console.log(visitedNodes);
}
console.log(queue);
console.log(visitedNodes);
