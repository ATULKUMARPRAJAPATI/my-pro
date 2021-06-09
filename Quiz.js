class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //here we are hiding the question elements
    question.hide();
    
    //here we are changing the background color 
    background("Yellow");

    //here we are writing a code to show heading for showing the result of Quiz
    fill(0);
    textSize(30);
    text("Result of the Quiz", 340, 50);
    text("----------------------------",320,65);

    //call getContestantInfo( ) here
    // here we are calling getPlayerInfo()
    Contestant.getPlayerInfo();

    //here we are write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      debugger;
      var display_Answers = 230;
      // here we are writing code to highlight contest who answered correctly
      fill("Blue");
      textSize(20);
       //here we are writing code to add a note 
      text("*NOTE : Contestant who answered correct are highlighted in green color!",130,230);

      for(var plr in allContestants){
        debugger;
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer)
        fill("Green");
        else
        fill("red");

        display_Answers+=30;
        textSize(20);
        text(allContestants[plr].name+":"+ allContestants[plr].answer,205,display_Answers)
        
      }
    }
    
  }

}
