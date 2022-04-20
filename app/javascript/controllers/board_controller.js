import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  initialize() {
    var myId = document.body.dataset['playerId'];
    var activeId = this.element.dataset["activePlayer"];
    if(this.element.dataset["finished"] || myId !== activeId){
      this.submitButtons().forEach(button => {
        button.disabled = true
      })
    } else{
      this.submitButtons().forEach(button => {
        if(!button.innerHTML){
          button.classList.add("active");
        }
      })
    }
  }
  submitButtons() {
    return this.element.querySelectorAll("button[type='submit']")
  }
}
