import { Component, OnInit } from '@angular/core';

import { NAMES } from '../mocks/names.mock'
import { Modal } from '../models/modal.models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // declaració de propiedades de la Class //
  public title = 'Adivine el nombre de la Persona';
  public words: string[] = NAMES;
  public wordLetters: string[] = [];
  public viewLetters: string[] = [];
  public userLetters: string[] = [];
  public selectedWord: string = '';
  public selectedOriginalWord: string = '';
  public errorCounter: number = 0;
  public errorLimit: number = 6;
  private interval: any = null
  private intervalHelper: number = 10;
  public helpCounter: number = this.intervalHelper
  public modal: Modal = {
    show: false,
    message: '',
    type: 'winner'
  }
  public userInputFailed: string = '';


  constructor() { }


  ngOnInit(): void {
    this.init()
  }

  init() {
    const randomIndex = this.getRandomIndex()
    this.selectedWord = this.normalizeWord(this.words[randomIndex])
    this.selectedOriginalWord = this.words[randomIndex]
    this.wordLetters = this.selectedWord.split('')
    this.viewLetters = this.wordLetters
    this.userLetters = new Array(this.wordLetters.length).fill('');
    this.helpTimer()
  }

  helpTimer() {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.interval = setInterval(() => {
      const selectedIdx: number[] = [];
      if (this.helpCounter > 0) {
        this.helpCounter--
      } else {
        this.setRandomLetter();
        this.helpCounter = this.intervalHelper
        this.checkResult()
      }
    }, 1000)
  }

  setRandomLetter() {
    const idxRandom = Math.floor(Math.random() * this.wordLetters.length)
    if (this.wordLetters[idxRandom].length === 0) {
      this.setRandomLetter()
      return
    }
    this.userLetters[idxRandom] = this.wordLetters[idxRandom]
    this.wordLetters[idxRandom] = ''
  }

  normalizeWord(word: string): string {
    const lowered: string = word.toLowerCase()
    let normalized: string = lowered.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
    return normalized
  }

  getRandomIndex(): number {
    const rand: number = Math.floor(Math.random() * this.words.length)
    return rand
  }

  setLetter(event: any, index: number) {
    const userInputValue: string = this.normalizeWord(event.target.value)
    if (this.viewLetters[index] === userInputValue) {
      this.userLetters[index] = userInputValue;
      this.wordLetters[index] = ''
    } else {
      this.userInputFailed = `${this.userInputFailed}  ${userInputValue}`
      this.userLetters[index] = '';
      this.errorCounter = this.errorCounter + 1

      if (this.errorCounter === this.errorLimit) {
        this.openModal('loser');
        return;
      }
    }
    this.checkResult()
  }

  checkResult() {
    const wordResult: string = this.selectedWord
    const userResult: string = this.userLetters.join('')
    if (wordResult === userResult) {
      this.openModal('winner', this.selectedOriginalWord)
    }
  }

  openModal(typeModal: 'winner' | 'loser', wordResult?: string) {
    clearInterval(this.interval)
    this.modal.message = typeModal === 'winner'
    ? `Felicidades el nombre ${wordResult} es el correcto`
    : 'Lo siento el nombre no es la correcto'
    this.modal.type = typeModal
    setTimeout(() => {
      this.modal.show = true;
    }, 500);
  }

  closeModal() {
    this.modal.message = '';
    this.modal.show = false;
    this.reset()
  }

  reset() {
    this.wordLetters = [];
    this.viewLetters = [];
    this.userLetters = [];
    this.selectedWord = '';
    this.selectedOriginalWord = '';
    this.errorCounter = 0
    this.helpCounter = this.intervalHelper;
    this.userInputFailed = '';
    this.init()
  }

}





























































