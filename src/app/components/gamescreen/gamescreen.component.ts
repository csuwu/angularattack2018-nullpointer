import { Component, OnInit } from '@angular/core';
import { Question } from '../../classes/question';
import { QuestionService } from '../../services/question/question.service';
import { ScoreComponent } from '../../components/gamescreen/score/score.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessage } from '../../classes/errormessage';

const INTERVAL:number = 1000;

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit {

  questions: Question[];
  question: Question = null;
  timer: any;
  score: number = 0;
  timetogo: number = 120;
  errormessages: ErrorMessage[] = new Array();
  

  constructor(private questionservice: QuestionService, private router: Router) { 
  }

  getQuestions() :void {
    this.questions = this.questionservice.getQuestions();
  }

  randomQuestion(): void {
    this.question = this.questions[Math.trunc((Math.random() * 10000) % this.questions.length)];
    console.log(this.question);
  }

  clearErrorMessages() : void {
    this.errormessages = new Array();
  }

  addErrorMessage(error : ErrorMessage) : void {
    this.errormessages.push(error);
  }

  processChildInput(input: string): void {
    if(this.question.answer == input) {
      this.score += this.question.points;
    }
    else {
      this.score -= 1;
      this.addErrorMessage({
        type : 'ERROR',
        content : 'Not found'
      });
    }
    this.randomQuestion();
  }

  ngOnInit() {
    this.getQuestions();
    this.randomQuestion();
    this.timer = setInterval(()=> {
      
      console.log(this.timetogo);
      if(this.timetogo == 0) {
        clearInterval(this.timer);
        this.router.navigateByUrl('/finish');
      }
      this.timetogo --;
    },
    INTERVAL);
    
  }

}
