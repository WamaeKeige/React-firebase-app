import React, { Component } from 'react'
var firebase = require('firebase');
var uuid = require('uuid');

  var config = {
    apiKey: "AIzaSyB4KruvsG6fYJYNq0RWAjAx88h0H6iUcq4",
    authDomain: "surveyapp-b138d.firebaseapp.com",
    databaseURL: "https://surveyapp-b138d.firebaseio.com",
    projectId: "surveyapp-b138d",
    storageBucket: "surveyapp-b138d.appspot.com",
    messagingSenderId: "1068816821814"
  };
  firebase.initializeApp(config);

class Surveyapp extends Component {
  nameSubmit(event){
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function(){
       console.log(this.state);
    });
  }
   answerSelected(event){
    var answers = this.state.answers;
    if(event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    } else if(event.target.name === 'answer2'){
      answers.answer2 = event.target.value;
    } else if(event.target.name === 'answer3'){
      answers.answer3 = event.target.value;
    }
    this.setState({answers: answers}, function(){
      console.log(this.state);
    });
   }
   questionSubmit(){
     firebase.database().ref('surveyapp/'+this.state.uid).set({
       studentName: this.state.studentName,
       answers: this.state.answers
     });
     this.setState({isSubmitted: true});
   }
  constructor(props) {
    super(props);

    this.state = {
    uid: uuid.v1(),
    studentName: '',
    answers: {
      answer1: '',
      answer2: '',
      answer3: ''
    },
     isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }
  render() {
    var studentName;
    var questions;
    if(this.state.studentName ==='' && this.state.isSubmitted === false){
      studentName =<div class="col">
      <form onSubmit={this.nameSubmit}>
      <div className="form-group">
      <label id="name"/> Tell us your name
      <input className="form-control" type="text" ref="name" placeholder="enter your name"/>
      </div>
      </form>
      </div>;
      questions = ''
    } else if (this.state.studentName !== '' && this.state.isSubmitted === false){
      studentName = <h5>Welcome,<b>{this.state.studentName}</b></h5>

      questions = <div><h5>Please complete the following questionnaire</h5>
      <form onSubmit={this.questionSubmit}>
          <div className="card">
           <label>What kind of courses do you like the most?</label>
           <input type="radio" name="answer1" value="Networking" onChange={this.answerSelected} />Networking
           <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design
           <input type="radio" name="answer1" value="UI/UX Design"  onChange={this.answerSelected} />UI/UX Design
           </div>
           <div className="card">
            <label>What are you doing?</label>
            <input type="radio" name="answer2" value="Studying" onChange={this.answerSelected} />Studying
            <input type="radio" name="answer2" value="Working" onChange={this.answerSelected} />Working
            <input type="radio" name="answer2" value="Unemployed"  onChange={this.answerSelected} />Unemployed
            </div>
            <div className="card">
             <label>Is elearning important to you?</label>
             <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} />Yes
             <input type="radio" name="answer3" value="No" onChange={this.answerSelected} />No
             <input type="radio" name="answer3" value="Not Sure"  onChange={this.answerSelected} />Not Sure
             </div>
             <input className="feedback-button" type="submit" value="Submit" />
      </form>
      </div>
    } else if(this.state.isSubmitted === true){
      studentName = <h1> Thank you {this.state.studentName} !</h1>
    }
    return (
      <div className="container-fluid">
      <div className="row">
      <div className="col-lg-8 col-md-10 mx-auto">
      {studentName}

      {questions}
      </div>
      </div>
      </div>
    );
  }
}
export default Surveyapp
