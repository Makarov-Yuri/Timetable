


//Создаем компонент Vue для отображения месяца

let VueComponentMonth={
	
	
	data(){
			return{
				
				//Задаем имена всех месяцев в соответствии с их номерами
				NamesOfMonths:this.$store.state.NamesOfMonths,//Получаем имена всех месяцев в соответствии с их номерами
				
				MaximumNumberOfIterations:50,//Число итераций в анимации изменения режима отображения блока месяца: недели и месяца
				
				//Задержка между итерациями в миллисекундах в анимации изменения режима отображения блока месяца: недели и месяца
				DelayBetweenIterations:0,
				
				//Минимально возможное время задержки (даже если указать DelayBetweenIterations=0) будет равно 5 миллисекундам
				//То есть минимальное время анимации будет равно MaximumNumberOfIterations*5
				//Время анимации = это число итераций умноженное на задержку между итерациями (получаем приблизительное время анимации)
				
				//Название текущего месяца
				NameOfSelectedMonth:null,
				
				//Модель месяца
				MonthModel:null,
				
				//Объект видимости месяца
				StyleDisplayObject:null,
				
				
			}
			
	},
	
	props:{
		
		DataOfMonth:Object,//Получаем объект с данными о месяце
			
	},
	
		
	//Вычисляем свойства, если изменились их зависимости
	computed:{
		
		ActiveMonthOrWeek:function(){return this.$store.state.ActiveMonthOrWeek},//Получаем значение активности
		//режима месяца: отображение в виде недели или в виде полного месяца
		
		//Получаем информацию о том, происходит ли сейчас анимация месяца или нет (геттер)
		AnimationOfMonthIsPlaying:function(){return this.$store.state.AnimationOfMonthIsPlaying},
		
		//Переменная хранит активную неделю (неделю с выбранной датой) - нужно для ее отображения в режиме недели поверх остальных недель	
		ActiveWeek:function(){return this.getActiveWeek(this.MonthModel,this.DataOfMonth.SelectedDate)},
		
		//Переменная хранит активную неделю (неделю с выбранной датой) - нужно для ее отображения в режиме недели поверх остальных недель	
		//ActiveWeek:function(){console.log('Был перерасчет активной недели');return this.getActiveWeek(this.MonthModel,this.DataOfMonth.SelectedDate)},
		
		TypeOfWeek:function(){
			
			Now = new Date(new Date().getFullYear(),this.DataOfMonth.SelectedMonth-1,this.DataOfMonth.SelectedDate);//Метка времени "сейчас"
			
			var FirstJanuary = new Date(Now.getFullYear(),0,1);//Метка времени 1 января текущего года
			
			//Получаем разницу в количестве дней между сейчас и 1 января текущего года
			var NumberOfDays = Math.floor((Now - FirstJanuary) / (24 * 60 * 60 * 1000));
			
			var WeekNumber = Math.ceil((NumberOfDays)/7);
			
			if(WeekNumber% 2 === 0){return 'нижняя'}else{return 'верхняя'}
			

			
		},//Пишем какая сейчас неделя: четная или нечетная	
		
	},
	
	
	created(){
		
		this.NameOfSelectedMonth=this.NamesOfMonths[this.DataOfMonth.SelectedMonth-1];
		
		this.MonthModel= this.CreateMonthModel(this.DataOfMonth.SelectedMonth);
		
		if(this.DataOfMonth.Exists=="NotExist"){
				
			this.StyleDisplayObject={display:'none'}
				
		}else if(this.DataOfMonth.Exists=="Exist"){
				
			this.StyleDisplayObject={display:''}
				
		}
		
	},
	

	components:{
	 
		"ButtonOfDay":VueComponentButtonOfDay,
	  
		},
		

	template:`
	
	<div ref='Month' class='Month' v-bind:style="StyleDisplayObject">
		
		<div class="LineWithNamesOfDaysOfWeek">
						
						<div class='NameOfDay'>Пн</div>
						<div class='NameOfDay'>Вт</div>
						<div class='NameOfDay'>Ср</div>
						<div class='NameOfDay'>Чт</div>
						<div class='NameOfDay'>Пт</div>
						<div class='NameOfDay'>Сб</div>
						<div class='NameOfDay'>Вс</div>
			
		</div>
			
			<div class="Week" v-for='Week in 6' ref="Weeks">
					
				<ButtonOfDay 
					
					v-for='Day in MonthModel.DaysOfMonth.slice((Week-1)*7,(Week-1)*7+7)' 
						
					v-bind:key='Day.NumberOfDay'

					v-bind:DataOfDay='Day'
					
					v-bind:SelectedDate='DataOfMonth.SelectedDate'
						
					>

				</ButtonOfDay>
						
			</div>
				
			
		<button class='BottomBlock' v-on:click='ChangeActiveModeMonthOrWeek' ref='BottomBlock'>
			
		<div>
			
			{{DataOfMonth.SelectedDate}} {{NameOfSelectedMonth}}, {{TypeOfWeek}}
				
		</div>
			
			
		<img src='ForStudents/Phone/IMG/Стрелка вниз.png' v-if="ActiveMonthOrWeek!='Month'">
			
		<img src='ForStudents/Phone/IMG/Стрелка вверх.png' v-else>
			
		</button>
		
	</div>
		
	`,
	
	

	mounted(){
		
		//После создания DOM следим за ним:
		
		this.ActiveWeekMode_SetActiveWeekInDOM();//При первоначальной загрузке устанавливаем активную неделю, если установлен режим активной недели
		
		
		//Стиль отображения объекта
		this.$watch('DataOfMonth.Exists', (SelectedMonth_newValue, SelectedMonth_oldValue)=>{
			
			console.log('Был перерасчет видимости месяца');
				
			if(this.DataOfMonth.Exists=="NotExist"){
					
				this.StyleDisplayObject={display:'none'}
					
			}else if(this.DataOfMonth.Exists=="Exist"){
					
				this.StyleDisplayObject={display:''}
					
			}
					
		});	
		
		
		this.$watch('DataOfMonth.SelectedMonth', (SelectedMonth_newValue, SelectedMonth_oldValue)=>{
			
			console.log('Название месяца было обновлено!');		
			this.NameOfSelectedMonth=this.NamesOfMonths[SelectedMonth_newValue-1];
			
			//console.log('Был перерасчет модели месяца');
			this.MonthModel= this.CreateMonthModel(SelectedMonth_newValue);
			
				
		});	

		

		//Отслеживание изменений в свойстве ActiveWeek (ActiveWeek изменяется, когда изменяется DataOfMonth)
		this.$watch('ActiveWeek', (ActiveWeek_newValue, ActiveWeek_oldValue)=>{
			
			//Если анимация движения месяца не проигрывается, то можно изменить активную неделю
			
			if(this.AnimationOfMonthIsPlaying==false){
				
				//console.log('активная неделя изменена!');
				//Если установлен режим активной недели (проверяется внутри функции),	
				this.ActiveWeekMode_SetActiveWeekInDOM();//то устанавливаем активную неделю (делаем ее видимой поверх других недель)
				
			}	
			
		});
		
		
		//Отслеживание изменений в ActiveMonthOrWeek
		this.$watch('ActiveMonthOrWeek', (ActiveMonthOrWeek_newValue, ActiveMonthOrWeek_oldValue)=>{
			
			if(ActiveMonthOrWeek_newValue=='Month' && ActiveMonthOrWeek_oldValue=='Week'){
					
				this.AnimationBottomMove();
					
			}else if(ActiveMonthOrWeek_newValue=='Week' && ActiveMonthOrWeek_oldValue=='Month'){
					
				this.AnimationTopMove();
					
			}
				
		});	
		
		
		
		
			//Изменяем высоту блока с расписанием:
//НОВОЕ!----------------------------------------------------------------------------------------------------------------				
				Timetable.style.height=(TimetableSection.clientHeight-this.$refs.Month.clientHeight)+'px';
	
	},
	
	



	methods:{
		
		ActiveWeekMode_SetActiveWeekInDOM:function(){//Функция устанавливаем активную неделю (если активен режим недели)
			
			//Если блок месяца существует в DOM, то:
			//Если переданный параметр указывает, что активен режим недели, то изменяем шаблон: убираем все неактивные недели
			if(this.DataOfMonth.Exists=='Exist' && this.ActiveMonthOrWeek=='Week'){
					
				//Устанавливаем новые сдвиги для недель в соответствии с номером активной недели
				for(let i=0; i<6;i++){
					//Если итерируется неактивная неделя, то устанавливаем следующие стили:
					if(i!=this.ActiveWeek-1){
						//50px
						this.$refs.Weeks[i].style.transform='translateY('+ (i+1)*(-this.$store.state.HeightOfWeekBlock)+'px)';
						this.$refs.Weeks[i].style.zIndex='0';

					//Если итурируется активная неделя, то устанавливаем следующие стили:				
					}else if(i==this.ActiveWeek-1){
							
						this.$refs.Weeks[i].style.transform='translateY('+ (i)*(-this.$store.state.HeightOfWeekBlock)+'px)';
						this.$refs.Weeks[i].style.zIndex='1';
					}
					
				}
					
				//Устанавливаем сдвиги для нижнего блока (блок с отображением текущей даты) и устанавливаем высоту месяца
				//250px
				this.$refs.BottomBlock.style.transform='translateY('+(-this.$store.state.HeightOfWeekBlock*5)+'px)';
				//50px
				this.$refs.Month.style.height=""+(this.$store.state.HeightOfWeekBlock*3)+"px";
				
				//HeightOfWeekBlock
					
			}
				
		},
		
		
		
		
		//Обработка запроса на изменение режима(недели или месяца): отправляем запрос родителю
		ChangeActiveModeMonthOrWeek:function(){
				
			//Производим действие вызывающее мутацию для запросана изменение состояния месяца
			//(она может приести к результату или не будет никакой реакции-все зависит от дополнительных условий)
				
			//объектный синтаксис вызова действия
			this.$store.dispatch({type:'ChangeActiveModeMonthOrWeek'});	
		},
		
		
		//Функция анимации сворачивания месяца
		AnimationTopMove:function(){
						
			//Изменяем режим месяца: активен режим отображения одной недели или месяца, добавление анимаций
			//При изменении отображения месяцев могут меняться активные недели, поэтому для того, чтобы испключить ошибки, вызванные этим
			//все недели нужно сделать неактивными во время работы с DOM
						
			//Делаем все остальные недели неактивными, если включен режим Month
						
			
													
			//Функция отрисовки анимации движения вверх
							
			let TopMove=(PassedTime, NumberOfIterations)=>{
									
				//Анимации недель
									
				for(let i=0; i<6;i++){
										
					if(i>=this.ActiveWeek-1){
														
						//if(NumberOfIterations<=i*10){//Работает только при MaximumNumberOfIterations==50 
														
						if((NumberOfIterations/this.MaximumNumberOfIterations)*5<=i){	
															
							//Работает только при MaximumNumberOfIterations==50:
							//this.$refs.Weeks[i].style.transform='translateY('+(NumberOfIterations*(-5))+'px)';
									
							//50 - высота одного блока недели
							this.$refs.Weeks[i].style.transform='translateY('+Math.floor((NumberOfIterations/this.MaximumNumberOfIterations)*(-this.$store.state.HeightOfWeekBlock*5))+'px)';					
														
						}
													
						//Создаем сдвиг на 50 пикселей вверх для блоков недель ниже блока активной недели
													
						//if(NumberOfIterations==i*10 && i>this.ActiveWeek-1){//Работает только при MaximumNumberOfIterations==50 
														
						if((NumberOfIterations/this.MaximumNumberOfIterations)*5==i && i>this.ActiveWeek-1){
															
							//this.$refs.Weeks[i].style.transform='translateY('+((NumberOfIterations+10)*(-5))+'px)';//Работает только при MaximumNumberOfIterations==50 
															
							this.$refs.Weeks[i].style.transform='translateY('+(Math.floor((NumberOfIterations/this.MaximumNumberOfIterations)*(-this.$store.state.HeightOfWeekBlock*5))-this.$store.state.HeightOfWeekBlock)+'px)';
														
						}
												
													
					}else if(i<this.ActiveWeek-1){
													
						//if(NumberOfIterations<=(i+1)*10){//Работает только при MaximumNumberOfIterations==50 
														
						if((NumberOfIterations/this.MaximumNumberOfIterations)*5<=i+1){		
															
							//this.$refs.Weeks[i].style.transform='translateY('+(NumberOfIterations*(-5))+'px)';//Работает только при MaximumNumberOfIterations==50 
															
							//50 - высота одного блока недели
							this.$refs.Weeks[i].style.transform='translateY('+Math.floor((NumberOfIterations/this.MaximumNumberOfIterations)*(-this.$store.state.HeightOfWeekBlock*5))+'px)';					
																
						}
													
					}
										
				}
									
									
				//Анимация движения нижнего блока (блок с актинвой датой и кнопками):
									
				//this.$refs.BottomBlock.style.transform='translateY('+(-NumberOfIterations*5)+'px)';//Работает только при MaximumNumberOfIterations==50 
									
				this.$refs.BottomBlock.style.transform='translateY('+Math.floor((NumberOfIterations/this.MaximumNumberOfIterations)*(-this.$store.state.HeightOfWeekBlock*5))+'px)';
									
									
				//Настраиваем "высоту календаря":
									
				//Изменить изменение высоты месяца на изменение высоты календаря
				//this.$refs.Month.style.height=390-NumberOfIterations*5+"px";//Работает только при MaximumNumberOfIterations==50 
									
				this.$refs.Month.style.height=this.$store.state.HeightOfMonthBlock-Math.floor((NumberOfIterations/this.MaximumNumberOfIterations)*this.$store.state.HeightOfWeekBlock*5)+"px";
				
				//Изменяем высоту блока с расписанием:
//НОВОЕ!----------------------------------------------------------------------------------------------------------------				
				Timetable.style.height=(TimetableSection.clientHeight-this.$refs.Month.clientHeight)+'px';
							
			}
			
			
			//Изменяем AnimationOfMonthIsPlaying за счет мутации
			this.$store.commit({type: 'SetAnimationOfMonthIsPlaying',AnimationOfMonthIsPlaying:true});
			
			//Для нормлальной работы анимации перед ее началом устанавливаем z-index==1 у активной недели
			//Так как в дальнейшем активной неделей может стать другая
			this.$refs.Weeks[this.ActiveWeek-1].style.zIndex='1';
						
			let NumberOfIterations=0;//Счетчик числа итераций
							
			//Время анимации = это число итераций умноженное на задержку между итерациями (получаем приблизительное время анимации)
							
			let StartOfAnimation = Date.now();//Запомнить время начала
							
						
			let Timer = setInterval(()=>{//Для ссылки this внутри на объект месяца объявляем стрелочную функцию
				//Сколько времени прошло с начала анимации?
									
				NumberOfIterations++;//Увеличиваем счетчик числа прошедшых интераций
									
				let PassedTime = Date.now() - StartOfAnimation;
									
				if (NumberOfIterations>this.MaximumNumberOfIterations) {
					clearInterval(Timer); // закончить анимацию примерно через 0,5 секунды (после 50*10 повторений=500 секунд примерно)
					
					//После окончания анимации, делаем запрос на выключение анимации месяца
					//Производим мутацию для запроса на изменение состояния переменной, показывающей происходит анимация или нет
					this.$store.commit({type: 'SetAnimationOfMonthIsPlaying',AnimationOfMonthIsPlaying:false});
					
					return;
				}

				// отрисовать анимацию на момент PassedTime, прошедший с начала анимации
				TopMove(PassedTime, NumberOfIterations);
												  
			}, this.DelayBetweenIterations);				
			
		},
		
		
		
		
		
		
		//Функция анимации разворачивания месяца
		AnimationBottomMove:function(){
			
					
			//Если был включен режим Week, то сменяем его на режим месяца, при этом двигаем соответствующие блоки недель обратно,чтобы они были видыми
												
			//Функция отрисовки анимации движения вниз
			let BottomMove=(PassedTime, NumberOfIterations)=>{
									
				for(let i=0; i<6;i++){
				
					if(i>=this.ActiveWeek-1){
														
													
						//Для блоков после активной недели появление должно происходить тогда,
						//когда количество прошедших шагов должно быть больше, чем количество шагов, за которое выдвинулся прошлый блок
						//кроме первого блока, он выдвигается сразу же
						//высота одного блок равна 250/5 пикселей, то есть как только отношение NumberOfIterations/MaximumNumberOfIterations*10>5-i
						//для второго блока (счет снизу) например (так как первый полность выдвигается за 250/5 шагов) движения начинается, когда
						//NumberOfIterations/MaximumNumberOfIterations>0,2
						//то есть для 4 блока движение начинается, когда NumberOfIterations/MaximumNumberOfIterations>0,2
						//
													
						//if(NumberOfIterations>= (5-i)*10){//Работает только при MaximumNumberOfIterations==50 
																
						if((NumberOfIterations/this.MaximumNumberOfIterations)*5>=(5-i)){
															
							this.$refs.Weeks[i].style.transform='translateY('+Math.floor((((NumberOfIterations/this.MaximumNumberOfIterations)-1)*this.$store.state.HeightOfWeekBlock*5))+'px)';
															
						}
															
					}else if(i<this.ActiveWeek-1){
														
						//if(NumberOfIterations>=(5-(i+1))*10){//Работает только при MaximumNumberOfIterations==50 
														
						if((NumberOfIterations/this.MaximumNumberOfIterations)*5>=(5-(i+1))){
														
							this.$refs.Weeks[i].style.transform='translateY('+Math.floor((((NumberOfIterations/this.MaximumNumberOfIterations)-1)*this.$store.state.HeightOfWeekBlock*5))+'px)';
							
						}
														
					}
											
				}
									
										
				//Анимация движения нижнего блока (блок с актинвой датой и кнопками):
				//250 - максимальный сдвиг нижнего блока вверх
				//В данном случае мы получаем постоянно возврастающую дробь NumberOfIterations/MaximumNumberOfIterations
				//Которая в итоге станет равна 1
				this.$refs.BottomBlock.style.transform='translateY('+Math.floor((((NumberOfIterations/this.MaximumNumberOfIterations)-1)*this.$store.state.HeightOfWeekBlock*5))+'px)';
										
				//Настраиваем "высоту календаря":
										
				//Изменить изменение высоты месяца на изменение высоты календаря
				//this.$refs.Month.style.height=150+NumberOfIterations*5+"px";//Работает только при MaximumNumberOfIterations==50 
										
				this.$refs.Month.style.height=this.$store.state.HeightOfWeekBlock*3+Math.floor((NumberOfIterations/this.MaximumNumberOfIterations)*this.$store.state.HeightOfWeekBlock*5)+"px";
				
				//Изменяем высоту блока с расписанием:
//НОВОЕ!----------------------------------------------------------------------------------------------------------------				
				Timetable.style.height=(TimetableSection.clientHeight-this.$refs.Month.clientHeight)+'px';
				
			}
			
			
			//Изменяем AnimationOfMonthIsPlaying за счет мутации
			this.$store.commit({type: 'SetAnimationOfMonthIsPlaying',AnimationOfMonthIsPlaying:true});
			
			let NumberOfIterations=0;//Счетчик числа итераций
								
			let StartOfAnimation = Date.now();//Запомнить время начала
								
							
			let Timer = setInterval(()=>{//Для ссылки this внутри на объект месяца объявляем стрелочную функцию
				//Сколько времени прошло с начала анимации?
										
				NumberOfIterations++;//Увеличиваем счетчик числа прошедшых интераций
										
				let PassedTime = Date.now() - StartOfAnimation;
											
					if (NumberOfIterations>this.MaximumNumberOfIterations) {
					clearInterval(Timer); // закончить анимацию примерно через 0,5 секунды (после 50*10 повторений=500 секунд примерно)
												
					//Для нормлальной работы анимации после того, как достигнут режим месяца, то убираем z-index у активной недели
					//Так как в дальнейшем активной неделей может стать другая
					this.$refs.Weeks[this.ActiveWeek-1].style.zIndex='0';
					
					//После окончания анимации, делаем запрос на выключение анимации месяца
					//Производим мутацию для запроса на изменение состояния переменной, показывающей происходит анимация или нет					
					this.$store.commit({type: 'SetAnimationOfMonthIsPlaying',AnimationOfMonthIsPlaying:false});
											
					return;
				}

				// отрисовать анимацию на момент PassedTime, прошедший с начала анимации
				BottomMove(PassedTime, NumberOfIterations);
														  
			}, this.DelayBetweenIterations);
				
				
		},
		
		
		//Функция возвращает активную неделю
		getActiveWeek(MonthModel,SelectedDate){
			
			let ActiveWeek=null;//Создаем переменную активной недели
			
			//Определяем активную неделю в месяце по дате:
			for(let i=0; i<42;i++){
					
				if(MonthModel.DaysOfMonth[i].Status=='DayFromThisMonth'&& MonthModel.DaysOfMonth[i].NumberOfDay==SelectedDate){
							
					ActiveWeek=Math.ceil((i+1)/7);
								
				}
					
			}
				
			return	ActiveWeek;
		
		},
		
			
		//Функция для создания модели месяца:

		CreateMonthModel:function(SelectedMonth){//Функция, которая создаем модель месяца
		
			//Массив с днями в месяце
			let ArrayDaysOfMonth=[];
			
			//В JavaScript нумерация номеров идет с 0 до 11, поэтому все передаваемые номера надо уменьшать на единицу
			let NumberOfMonth=SelectedMonth-1;
					
			let Year= new Date().getFullYear();//Получаем нынешний год

			// Создадим объект OtherDate класса Date соовтетствующий 1.Month.2022
			var OtherDate = new Date(Year,NumberOfMonth,1);

			let DaysInMonth=OtherDate.daysInMonth();//Получаем количество дней в месяце

			//Заполняем массив месяца - часть первой недели
			//Находим разницу между понедельником и днем недели первого дня в данном месяце:
			//Если она больше нуля - то данное количество дней берем из прошлого месяца:
			
				
			let Date_LastMonth=null;//Объект даты прошлого месяца
					
			if(NumberOfMonth>0){//Если у нас не певый в году месяц, то показываем числа прошлого месяца
						
				Date_LastMonth=new Date(Year,NumberOfMonth-1);

			}else{//Если у нас первый месяц, то показываем числа из прошлого года и последнего месяца

				Date_LastMonth=new Date(Year-1,12);

			}
						
			let DaysInLastMonth=Date_LastMonth.daysInMonth();//Получаем числа из месяца до этого
						
			

			for(let i=1; i<OtherDate.getDayInWeek();i++){
							
				//Объявляем объект дня
				let DayInMonth={
								
					Status:'DayFromLastMonth',
					NumberOfDay:DaysInLastMonth-(OtherDate.getDayInWeek()-1-i),
									
				}
								
				//Добавляем объект дня в массив
				ArrayDaysOfMonth.push(DayInMonth);
							
			}



			//Заполняем массив днями этого месяца:

			for(let i=1; i<=OtherDate.daysInMonth();i++){
						
				let DayInMonth={
							
					Status:'DayFromThisMonth',
					NumberOfDay:i,
								
				}
						
						
				//Добавляем объект дня в массив
				ArrayDaysOfMonth.push(DayInMonth);
			}

			//Заполняем массив оставшимися нехватающими до 42 элементов (6 недель) днями из следующего месяца

					
				for(let i=1; ArrayDaysOfMonth.length<42; i++){
							
					let DayInMonth={
								
						Status:'DayFromNextMonth',
						NumberOfDay:i,
									
					}
							
					//Добавляем объект дня в массив
					ArrayDaysOfMonth.push(DayInMonth);
							
				}
						
						
			let MonthModel={
				
				
				NumberOfMonth:NumberOfMonth,
						
				DaysOfMonth:ArrayDaysOfMonth,
					
			}


			return MonthModel; 

		},
			
	},
	
}







