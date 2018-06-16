import { Event } from "./event"
import { Position } from "./position"

class WorkItem {
  public readonly position: Position
  public readonly onComplete

  constructor(position, onComplete) {
    this.position = position
    this.onComplete = onComplete
  }
}

export class StockfishQueue {
  private readonly stockfish
  private readonly log
  private readonly workItems: WorkItem[] = []

  constructor(stockfish, log) {
    this.stockfish = stockfish
    this.log = log
    this.stockfish.postMessage("setoption name MultiPV value 1")
    this.stockfish.addEventListener("message", event => {
      this.sfEventHandler(event.data)
    })
  }

  private sfEventHandler(event) {
    const e = new Event(event)

    if (this.workItems.length == 0) {
      return
    }

    if (e.isComplete()) {
      let completeItem = this.workItems.shift()
      completeItem!.position.bestMove = e.bestMove()
      completeItem!.onComplete(completeItem!.position)
      if (this.workItems.length > 0) {
        this.processNextWorkItem()
      }
      return
    }

    var score = e.score(this.workItems[0].position.fen)
    if (score != "noScore") {
      this.workItems[0].position.score = score

      return
    }
    this.log("ignored event: " + event)
  }

  enqueue(position: Position, onComplete) {
    this.workItems.push(new WorkItem(position, onComplete))
    if (this.workItems.length == 1) {
      this.processNextWorkItem()
    }
  }

  private processNextWorkItem() {
    let fen = this.workItems[0].position.fen
    this.stockfish.postMessage("position fen " + fen)
    this.stockfish.postMessage("go depth 8")
  }
}
