

const actions={
	
	 
	LoadDataInAllMonthBlockDataObject:(context,payload)=>{
		
		//Загрузаем данные в PresentBlockDataObject
		context.commit({
			
			type: 'LoadDataInPresentBlockDataObject',
			
			PresentBlockDataObject: payload.PresentBlockDataObject,
			
		});
		
		//Генерируем и устанавливаем данные в LeftBlockDataObject на основе PresentBlockDataObject
		context.commit({type: 'GenerateAndSetDataForLeftBlockDataObject'});
		
		//Генерируем и устанавливаем данные в RightBlockDataObject на основе PresentBlockDataObject
		context.commit({type: 'GenerateAndSetDataForRightBlockDataObject'});
		
	},
	
	
	
	
	ChangeActiveDateButtonsInThisMonth:(context, payload)=>{ 
		
		//Если анимация месяца не проигрывается, то нажатие на кнопки дней в объекте месяца будет работать
		//устанавлиаем новую дату в центральный блок и блоки справа и слева
		if(context.state.AnimationOfMonthIsPlaying==false){
			
			let SelectedMonth=context.state.PresentBlockDataObject.SelectedMonth;
			
			let SelectedDate=payload.NewDate;//Получаем из объекта новую дату
			
			let PresentBlockDataObject={Exists:'Exist', SelectedMonth:SelectedMonth, SelectedDate:SelectedDate}
				
			//Загрузаем данные в PresentBlockDataObject
			context.commit({
				
				type: 'LoadDataInPresentBlockDataObject',
				
				PresentBlockDataObject: PresentBlockDataObject,
				
			});
			
			//Генерируем и устанавливаем данные в LeftBlockDataObject на основе PresentBlockDataObject
			context.commit({type: 'GenerateAndSetDataForLeftBlockDataObject'});
			
			//Генерируем и устанавливаем данные в RightBlockDataObject на основе PresentBlockDataObject
			context.commit({type: 'GenerateAndSetDataForRightBlockDataObject'});
			
		}
				
	},
	
	
	ChangeActiveMonthAndDateButtons(context, payload){
		
		if(context.state.AnimationOfMonthIsPlaying==false && context.state.AnimationOfCalendarIsPlaying==false){	
			
			/* //Лагает - на время отключаем
			
			if(context.state.ActiveMonthOrWeek=='Month'){
				
				let PresentBlockDataObject=context.state.PresentBlockDataObject;
					
				if(payload.StatusOfMonth=='DayFromLastMonth' && PresentBlockDataObject.SelectedMonth>1){
					
					//Изменяем AnimationOfCalendarIsPlaying за счет мутации (в действии можно только включить(начать) анимацию, если она выключена)
					context.commit({type: 'SetDirectionOfCalendarAnimation', DirectionOfCalendarAnimation:'Left'});
					//Отключить анимацию нужно вручную
					
					//Изменяем AnimationOfCalendarIsPlaying за счет мутации (в действии можно только включить(начать) анимацию, если она выключена)
					context.commit({type: 'SetAnimationOfCalendarIsPlaying', AnimationOfCalendarIsPlaying:true});
					//Отключить анимацию нужно вручную
					
				}else if(payload.StatusOfMonth=='DayFromNextMonth' && PresentBlockDataObject.SelectedMonth<12){
					
					//Изменяем AnimationOfCalendarIsPlaying за счет мутации (в действии можно только включить(начать) анимацию, если она выключена)
					context.commit({type: 'SetDirectionOfCalendarAnimation', DirectionOfCalendarAnimation:'Right'});
					//Отключить анимацию нужно вручную
					
					//Изменяем AnimationOfCalendarIsPlaying за счет мутации (в действии можно только включить(начать) анимацию, если она выключена)
					context.commit({type: 'SetAnimationOfCalendarIsPlaying', AnimationOfCalendarIsPlaying:true});
					//Отключить анимацию нужно вручную
					
				}
				
			}else 
				
			*/
			
			if(context.state.ActiveMonthOrWeek=='Week'){
				
				let PresentBlockDataObject=context.state.PresentBlockDataObject;
					
				if(payload.StatusOfMonth=='DayFromLastMonth' && PresentBlockDataObject.SelectedMonth>1){
					
					//Загрузаем данные в PresentBlockDataObject
					context.commit({
					
						type: 'LoadDataInPresentBlockDataObject',
							
						PresentBlockDataObject:{Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth-1, SelectedDate:payload.NewDate},
							
					});
					
					//Генерируем и устанавливаем данные в LeftBlockDataObject на основе PresentBlockDataObject
					context.commit({type: 'GenerateAndSetDataForLeftBlockDataObject'});
					
					//Генерируем и устанавливаем данные в RightBlockDataObject на основе PresentBlockDataObject
					context.commit({type: 'GenerateAndSetDataForRightBlockDataObject'});
						
					
					
				}else if(payload.StatusOfMonth=='DayFromNextMonth' && PresentBlockDataObject.SelectedMonth<12){
						
					//Загрузаем данные в PresentBlockDataObject
					context.commit({
								
						type: 'LoadDataInPresentBlockDataObject',
								
						PresentBlockDataObject:{Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth+1, SelectedDate:payload.NewDate},
								
					});
						
					//Генерируем и устанавливаем данные в LeftBlockDataObject на основе PresentBlockDataObject
					context.commit({type: 'GenerateAndSetDataForLeftBlockDataObject'});
							
					//Генерируем и устанавливаем данные в RightBlockDataObject на основе PresentBlockDataObject
					context.commit({type: 'GenerateAndSetDataForRightBlockDataObject'});
					
				}
					
			}
			
		}	
			
	},
	
	
	ChangeActiveModeMonthOrWeek:(context)=>{
		
		//Если анимация месяца не проигрывается, то можно изменить состояние отображения месяца
		if(context.state.AnimationOfMonthIsPlaying==false && context.state.AnimationOfCalendarIsPlaying==false){
			
			//Получаем ActiveMonthOrWeek	
			let ActiveMonthOrWeek=context.state.ActiveMonthOrWeek;
			
			
			if(ActiveMonthOrWeek=='Week'){
				
				//Изменяем ActiveMonthOrWeek за счет мутации
				context.commit({type: 'SetActiveMonthOrWeek',ActiveMonthOrWeek:'Month'});
				
			}else if(ActiveMonthOrWeek=='Month'){
				
				//Изменяем ActiveMonthOrWeek за счет мутации
				context.commit({type: 'SetActiveMonthOrWeek',ActiveMonthOrWeek:'Week'});
				
			}
			
			
			//Чтобы новый блок не появлялся сперва включаем новую анимацию
			
			
			
			
			
			//Изменяем блоки с данными для месяцев
			
			//Генерируем и устанавливаем данные в LeftBlockDataObject на основе PresentBlockDataObject
			context.commit({type:'GenerateAndSetDataForLeftBlockDataObject'});
			
			//Генерируем и устанавливаем данные в RightBlockDataObject на основе PresentBlockDataObject
			context.commit({type:'GenerateAndSetDataForRightBlockDataObject'});
			
			
			
			
			//Изменяем AnimationOfMonthIsPlaying за счет мутации (в действии можно только включить(начать) анимацию, если она выключена)
			//context.commit({type: 'SetAnimationOfMonthIsPlaying',AnimationOfMonthIsPlaying:true});
			//Отключить анимацию нужно вручную	
			
			
			
				
		}	
		
	},
	
	
		
	DayForward:(context)=>{
		
		//Если анимация месяца не проигрывается, то можно изменить состояние отображения месяца
		if(context.state.AnimationOfMonthIsPlaying==false && context.state.AnimationOfCalendarIsPlaying==false){
			
			let PresentBlockDataObject=context.state.PresentBlockDataObject;
			
			if(PresentBlockDataObject.SelectedDate<new Date(new Date().getFullYear(),PresentBlockDataObject.SelectedMonth-1,1).daysInMonth()){
							
					PresentBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:PresentBlockDataObject.SelectedDate+1};	
							
				}else if(PresentBlockDataObject.SelectedDate==new Date(new Date().getFullYear(),PresentBlockDataObject.SelectedMonth-1,1).daysInMonth()){
							
					if(PresentBlockDataObject.SelectedMonth<12){
								
						PresentBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth+1,SelectedDate:1};	
								
					}
							
				}
					
						
				//Загрузаем данные в PresentBlockDataObject
					context.commit({
								
					type: 'LoadDataInPresentBlockDataObject',
								
					PresentBlockDataObject:PresentBlockDataObject,
								
				});
				
				console.log(PresentBlockDataObject.SelectedDate +'.0'+PresentBlockDataObject.SelectedMonth);
				
				//Изменяем блоки с данными для месяцев
				
				//Генерируем и устанавливаем данные в LeftBlockDataObject на основе PresentBlockDataObject
				context.commit({type:'GenerateAndSetDataForLeftBlockDataObject'});
				
				//Генерируем и устанавливаем данные в RightBlockDataObject на основе PresentBlockDataObject
				context.commit({type:'GenerateAndSetDataForRightBlockDataObject'});
				
		}	
		
	},
	
	
	DayBack:(context)=>{
		
		//Если анимация месяца не проигрывается, то можно изменить состояние отображения месяца
		if(context.state.AnimationOfMonthIsPlaying==false && context.state.AnimationOfCalendarIsPlaying==false){
			
			
			let PresentBlockDataObject=context.state.PresentBlockDataObject;
			
			if(PresentBlockDataObject.SelectedDate>1){
							
				PresentBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth,SelectedDate:PresentBlockDataObject.SelectedDate-1};	
							
			}else if(PresentBlockDataObject.SelectedDate==1){
							
				if(PresentBlockDataObject.SelectedMonth>1){
								
					let DateInLastMonthForPresentBlockDataObject=new Date(new Date().getFullYear(),PresentBlockDataObject.SelectedMonth-2,1).daysInMonth();
								
					PresentBlockDataObject={Exists:'Exist', SelectedMonth:PresentBlockDataObject.SelectedMonth-1,SelectedDate:DateInLastMonthForPresentBlockDataObject};	
								
				}
				
				
				
				
				
				
				
							
			}
						
			//Загрузаем данные в PresentBlockDataObject
			context.commit({
								
				type: 'LoadDataInPresentBlockDataObject',
								
				PresentBlockDataObject:PresentBlockDataObject,
								
			});
			
			
			console.log(PresentBlockDataObject.SelectedDate +'.0'+PresentBlockDataObject.SelectedMonth);
			
			
			//Изменяем блоки с данными для месяцев
			
			//Генерируем и устанавливаем данные в LeftBlockDataObject на основе PresentBlockDataObject
			context.commit({type:'GenerateAndSetDataForLeftBlockDataObject'});
			
			//Генерируем и устанавливаем данные в RightBlockDataObject на основе PresentBlockDataObject
			context.commit({type:'GenerateAndSetDataForRightBlockDataObject'});
			
				
		}	
		
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
};

























