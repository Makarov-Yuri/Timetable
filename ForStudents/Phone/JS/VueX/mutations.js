

const mutations={
	
	//Устанавливаем статус авторизации
	SetStatusOfAutorization:(state, payload)=>{
		
		state.StatusOfAutorization=payload.StatusOfAutorization;
		
	},
	
	//Устанавливаем статус авторизации
	SetSubGroup:(state, payload)=>{
		
		state.SubGroup=payload.SubGroup;
		
	},
		
	//Загружаем новое состояние активности недели или месяца ActiveMonthOrWeek
	SetActiveMonthOrWeek:(state, payload)=>{
		
		state.ActiveMonthOrWeek=payload.ActiveMonthOrWeek;
			
	},
	
	
	//Загружаем новое состояние проигрывания анимации месяца AnimationOfMonthIsPlaying
	SetAnimationOfMonthIsPlaying:(state, payload)=>{
		
		state.AnimationOfMonthIsPlaying=payload.AnimationOfMonthIsPlaying;
			
	},
	
	
	//Загружаем новое состояние проигрывания анимации месяца AnimationOfMonthIsPlaying
	SetAnimationOfCalendarIsPlaying:(state, payload)=>{
		
		state.AnimationOfCalendarIsPlaying=payload.AnimationOfCalendarIsPlaying;
			
	},
		
	//Загружаем новое состояние проигрывания анимации месяца AnimationOfMonthIsPlaying
	SetDirectionOfCalendarAnimation:(state, payload)=>{
		
		state.DirectionOfCalendarAnimation=payload.DirectionOfCalendarAnimation;
			
	},
	
	
	//Загружаем данные в PresentBlockDataObject
	LoadDataInPresentBlockDataObject:(state,payload)=>{

		state.PresentBlockDataObject=payload.PresentBlockDataObject;
		
			
	},

	
	
	

	//Генерируем и устанавливаем данные в LeftBlockDataObject
	GenerateAndSetDataForLeftBlockDataObject:(state)=>{
		
		
		let ActiveModeOfMonthBlock=state.ActiveMonthOrWeek;
		
		let PresentBlockDataObject=state.PresentBlockDataObject;
		
		let LeftBlockDataObject={};
		
				
		if(ActiveModeOfMonthBlock=='Week'){
			
			//Загрузка данных в this.LeftBlockDataObject при активном режиме недели

			if(PresentBlockDataObject.SelectedMonth>1){
											
				if(PresentBlockDataObject.SelectedDate>7){
												
					LeftBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:PresentBlockDataObject.SelectedDate-7};	
												
				}else{
													
					let DateInLastMonth=PresentBlockDataObject.SelectedDate-7 + new Date(new Date().getFullYear(),PresentBlockDataObject.SelectedMonth-2,1).daysInMonth();

					LeftBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth-1,SelectedDate:DateInLastMonth};		
														
				}

			}else if(PresentBlockDataObject.SelectedMonth==1){
								
				//Если выбранная дата минус день недели больше нуля, то это значит, что слева все еще есть данные из этого месяца
				if(PresentBlockDataObject.SelectedDate-new Date(new Date().getFullYear(),PresentBlockDataObject.SelectedMonth-1,PresentBlockDataObject.SelectedDate).getDayInWeek()>0){
												
					//Если слева можно выбрать еще такой же день недели из этого месяца, то выбираем его (выбранная дата минус семь - все еще день из этого месяца)
					if(PresentBlockDataObject.SelectedDate-7>0){
													
						LeftBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:PresentBlockDataObject.SelectedDate-7};
						//Иначе выбираем первое число месяца
					}else{
													
						LeftBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:1};
													
					}
												
												
				}else{
					
					LeftBlockDataObject={Exists:'NotExist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:PresentBlockDataObject.SelectedDate};
											
				}
										
			}
					
		}else if(ActiveModeOfMonthBlock=='Month'){
						
			if(PresentBlockDataObject.SelectedMonth>1){
								
				//Если дату которая должна быть в месяце слева слишком большая, то она будет уменьшена до максимальной в этом месяце даты:	
								
				//Записываем дату, которая должна быть в предыдущем месяце
				let SelectedDate=PresentBlockDataObject.SelectedDate;
									
				//Создаем объект даты указанного месяца с учетом начала нумерации месяцев в JS с нуля
				//Один минус за счет того, что мы работаем с месяцем слева относительно нынешнего, другой минус за счет нумерации 
				//месяце в JS. Выходит, что из числа нынешнего месяца нужно вычесть два, чтобы получить объект прошлого месяца
				let LastMonth_DateObject = new Date(new Date().getFullYear(),PresentBlockDataObject.SelectedMonth-2,1);
								
				//Узнаем меньше ли в указанном месяце дней, чем указанная дата								
				if(LastMonth_DateObject.daysInMonth()<SelectedDate){
											
					//Если да, то ставим самое большое число в предыдущем месяце
					SelectedDate=LastMonth_DateObject.daysInMonth();
											
				}
												
				LeftBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth-1,SelectedDate:SelectedDate};						
								
			}else if(PresentBlockDataObject.SelectedMonth==1){
				
				LeftBlockDataObject={Exists:'NotExist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:PresentBlockDataObject.SelectedDate};

			}
							
		}
		
		
		state.LeftBlockDataObject=LeftBlockDataObject;

	},
	
	

	//Генерируем и устанавливаем данные в RightBlockDataObject
	GenerateAndSetDataForRightBlockDataObject:(state)=>{
		
		
		let ActiveModeOfMonthBlock=state.ActiveMonthOrWeek;
		
		let PresentBlockDataObject=state.PresentBlockDataObject;
		
		let RightBlockDataObject={};
		
				
		if(ActiveModeOfMonthBlock=='Week'){
						
			//Загрузка  данных в RightBlockDataObject при активном режиме недели

			if(PresentBlockDataObject.SelectedMonth<12){
												
				if(PresentBlockDataObject.SelectedDate+7<=new Date(new Date().getFullYear(),PresentBlockDataObject.SelectedMonth-1,1).daysInMonth()){
													
					RightBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:PresentBlockDataObject.SelectedDate+7};	
													
				}else{
														
					let DateInNextMonth=PresentBlockDataObject.SelectedDate+7-new Date(new Date().getFullYear(),PresentBlockDataObject.SelectedMonth-1,1).daysInMonth();

					RightBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth+1,SelectedDate:DateInNextMonth};		
														
				}

			}else if(this.PresentBlockDataObject.SelectedMonth==12){
											
				if(PresentBlockDataObject.SelectedDate+7<new Date(new Date().getFullYear(),PresentBlockDataObject.SelectedMonth-1,1).daysInMonth()){
													
					RightBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:PresentBlockDataObject.SelectedDate+7};
													
				}else{
											
					//RightBlockDataObject={Exists:'NotExist'};
					RightBlockDataObject={Exists:'NotExist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:PresentBlockDataObject.SelectedDate};

													
				}
											
			}
				
		}else if(ActiveModeOfMonthBlock=='Month'){
						
			if(PresentBlockDataObject.SelectedMonth<12){
								
				//Если дату которая должна быть в месяце справа слишком большая, то она будет уменьшена до максимальной в этом месяце даты:	
								
				//Записываем дату, которая должна быть в следующем месяце
				let SelectedDate=PresentBlockDataObject.SelectedDate;
									
				//Создаем объект даты указанного месяца с учетом начала нумерации месяцев в JS с нуля
								
				//Так как необходимо получить объект следующего месяца, то из-за нумерации JS указываем нынешний месяц (для JS 
				//Он будет следующим)
				let NextMonth_DateObject = new Date(new Date().getFullYear(),PresentBlockDataObject.SelectedMonth,1);
								
				//Узнаем меньше ли в указанном месяце дней, чем указанная дата								
				if(NextMonth_DateObject.daysInMonth()<SelectedDate){
												
					//Если да, то ставим самое большое число в предыдущем месяце
					SelectedDate=NextMonth_DateObject.daysInMonth();
												
				}
								
				RightBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth+1,SelectedDate:SelectedDate};
								
			}else if(PresentBlockDataObject.SelectedMonth==12){
				
				//RightBlockDataObject={Exists:'NotExist'};
				RightBlockDataObject={Exists:'NotExist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:PresentBlockDataObject.SelectedDate};

			}
						
		}
						
			
		state.RightBlockDataObject=RightBlockDataObject;
		
	},
		
	
}














