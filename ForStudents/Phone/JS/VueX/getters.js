

const getters={
	
	
	ButtonsCanBePressed:(state)=>{
		
		
		if(state.AnimationOfMonthIsPlaying==false && state.AnimationOfCalendarIsPlaying==false){
		
			return true;		
			
		}else if(state.AnimationOfMonthIsPlaying!=false && state.AnimationOfCalendarIsPlaying!=false){
			
			return false;
			
		}
			
	},

}















