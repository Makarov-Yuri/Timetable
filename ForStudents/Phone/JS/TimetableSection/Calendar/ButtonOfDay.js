

let VueComponentButtonOfDay={
	
	props:{
		
		/*
		DataOfDay:{
			
			//Статус даты - она из этого месяца или из прошлого 
			Status:'DayFromLastMonth'//Status:'DayFromThisMonth'//Status:'DayFromNextMonth'
			
			//Численное значение даты(1-31)
			NumberOfDay:Number,
								
		}*/
		
		DataOfDay:Object,
		
		SelectedDate:Number,//Реактивная переменная со активной датой (при любом ее изменении из вне происходит перерасчет данных
		//и перестойка стилей соответствующих кнопок)
		
	},
	
	
	data(){
			return{
			
				NumberOfDay:'',//Переменная хранит "дату" этого дня
				
				DayFromAnotherMonth:false,//Переменная хранит информацию, этот день из этого месяца или из другого
				
				
			}
			
	},
	
	
	computed:{//Вычисляемое свойство - будет ли кнопка при нажатии анимироваться
	//(это свойство зависит от некоторых дополнительных переменных)
		
		ButtonsCanBePressed:function(){
	   
			return this.$store.getters.ButtonsCanBePressed;
	
		},
		
		
		//При любом изменении выбранной даты будет происходить пересчет объекта стилей. Если была нажата кнопка,
		//то объект стилей никак не повлияет на аттрибут, если же кнопка не была нажата, но была выбрана другая дата,
		//то объект стилей изменит аттрибут style
		//Если же при изменении выбранной даты объект стилей будет равен null(условие будет равно false - то стили будут убраны)
		
		StyleObject(){
			
			if(this.SelectedDate==this.NumberOfDay && this.DayFromAnotherMonth==false){
				
				return{
				
					color:'white',
					
					background:'green',
				
				}
					
			}
				
		},
		
		ClassObject(){
			
			return{
				
				ButtonOfDay_DayFromThisMonth:this.DayFromAnotherMonth==false,
					
				ButtonOfDay_DayFromAnotherMonth:this.DayFromAnotherMonth==true
				
			}
			
		},	
  
	},
	
	created(){
		//Получаем номер даты
		this.NumberOfDay=this.DataOfDay.NumberOfDay;//Получаем данные о дате, соответствующей этому блоку
		
		//Получаем информацию о том, из этого месяца этот день или из другого
		if(this.DataOfDay.Status!='DayFromThisMonth'){this.DayFromAnotherMonth=true}
		
	},

	template:`
		
		<button 
			
			v-on:click="this.ButtonWasClicked" 
			
			v-bind:class="ClassObject"
				
			ref='Button'
			
		>
			
			<p v-bind:style="StyleObject">{{NumberOfDay}}</p>
		
		</button>
		
		
	`,
	
	

	methods:{
			
		//Обработка нажатия кнопок дней
		ButtonWasClicked(){
			
			if(this.ButtonsCanBePressed==true){
				
				//Если это кнопка из этого месяца, то
				if(this.DayFromAnotherMonth==false){
					
					
					//Производим действие вызывающее мутацию для запроса на изменение данных о выбранной дате в этом и других месяцах
					
					//объектный синтаксис вызова действия
					this.$store.dispatch({
							
						type: 'ChangeActiveDateButtonsInThisMonth',
							
						//Передаем число
						NewDate: this.NumberOfDay
							
					});
					
					
					//Условия для успеха мутации и анимации идентичны, следовательно, анимацию можно реализовывать сразу же
					//Только потом уже реализуется изменение выбранной даты и/или месяца в настроечных объектах месяцев
					
					//Таким образом, если внешняя функция "разрешает" при нажатии происходить анимации, то кнопка сразу же реализует анимацию
					//при условии, что она уже не выбрана (при нажатии на уже выбранную кнопку анимации происходить не будет)
					//и затем изменяет стили в конце анимации
					
					//При анимации будет меняться стиль только что нажатой кнопки, другая кнопка изменит свой стиль только после изменения данных
					//В родителе (происхоидит почти мгновенно)
					if(this.SelectedDate!=this.NumberOfDay){
						
						//заранее добавляем стили для особого отображения выделенной кнопки
						//(во время анимации они не будут влиять на стиль объекта, но после конца анимации сразу же
						//применятся минуя все промежутки времени - не будет "мигания" в период которого они добавляются
						//так как будут присутствовать изначально)
						this.$refs.Button.children[0].style.background="green";
						this.$refs.Button.children[0].style.color="white";	
							
						//Добавляем класс к новой активной кнопке(при этом будет происходить проигрывание анимации)					
						this.$refs.Button.children[0].classList.add("OnclickClass");
							
						//Для того, чтобы setTimeout правильно работал (код запускался через указанное время), используем скобочную функцию
						setTimeout(
								
							//После конца анимации через некоторое время убираем класс анимации, 
							//чтобы его можно было далее использовать на данной кнопке
							()=>{this.$refs.Button.children[0].classList.remove("OnclickClass");}
						,250);	
						
					}
				
				//Если это день из другого месяца, то производим вызов мутации для прокрутки календаря к прошлому/следующему месяцу
				}else if(this.DayFromAnotherMonth==true){
					
					//Производим действие вызывающее мутацию для запроса на изменение данных о выбранном месяце
					
					//объектный синтаксис вызова действия
					this.$store.dispatch({
							
						type: 'ChangeActiveMonthAndDateButtons',
							
						//Передаем число
						NewDate: this.NumberOfDay,
						
						StatusOfMonth:this.DataOfDay.Status,
							
					});
						
				}
				
			}	
							
		},
			
	},	
}




























/*



let VueComponentButtonOfDay={
	
	props:{
		
		DataOfDay:Object,//Содержит информацию о номере дня (1-31) и пояснения какой это день - из этого, следующего или прошлого месяцев
		
		SelectedDate:Number,//Постоянно меняющаяся переменная, которая показывает выбранную в этом месяце дату
		
		Week:Number,//Содержит номер недели
		
		ActiveMonthOrWeek:String,
		
		AnimationIsPlaying:Boolean,
			
	},
	
	
	data(){
			return{
			
				NumberOfDay:'',
				
				DayFromAnotherMonth:false,
				
			}
			
	},
	
	
	created(){
		
		this.NumberOfDay=this.DataOfDay.NumberOfDay;//Получаем данные о дате, соответствующей этому блоку
		
		if(this.DataOfDay.Status!='DayFromThisMonth'){this.DayFromAnotherMonth=true}//Проверяем, что эта дата из этого месяца

		//Отслеживаем изменения в входном параметре SelectedDate
		this.$watch('SelectedDate', (SelectedDate_newValue, SelectedDate_oldValue)=>{

			if(this.SelectedDate==this.NumberOfDay && this.DayFromAnotherMonth==false){
				
				this.$refs.Button.children[0].style.background="green";//Сделать цвет прошлой активной кнопки обычным

				this.$refs.Button.children[0].style.color="white";//Сделать цвет шрифта прошлой активной кнопки обычным
				
			}

			if(this.SelectedDate!=this.NumberOfDay &&this.DayFromAnotherMonth==false){//Если сейчас выбрана не эта кнопка, но этот элементов
					//относится к этому месяцу
				
					this.$refs.Button.children[0].classList.remove("OnclickClass");
					
					this.$refs.Button.children[0].style.background="";//Сделать цвет прошлой активной кнопки обычным

					this.$refs.Button.children[0].style.color="";//Сделать цвет шрифта прошлой активной кнопки обычным
					
			}
			
		});
			
	},

	template:`
		
		<button 
		
			v-if="DayFromAnotherMonth==false" 
			
			class='ButtonOfDay' 
			
			v-on:click="this.OnClick" 
			
		ref='Button'>
		
			<p>{{NumberOfDay}}</p>
			
		</button>
		
		
		
		<button 
		
			v-else-if="DayFromAnotherMonth==true && ActiveMonthOrWeek=='Month'" 
			
		class='DayFromAnotherMonth'
		
		v-on:click="this.ChangeMonth" 
		
		ref='Button'>
		
			<p>{{NumberOfDay}}</p>
			
		</button>
		
		
		
		<button 
		
			v-else-if="DayFromAnotherMonth==true && ActiveMonthOrWeek=='Week'" 
			
			class='DayFromAnotherMonth' 
			
			v-on:click="this.ChangeMonth" 
			
		ref='Button'>
		
		<p>{{NumberOfDay}}</p>
		
			
		</button>
		
	`,
	

	
	
	mounted(){
		
		if(this.SelectedDate==this.NumberOfDay && this.DayFromAnotherMonth==false){
			
			this.$refs.Button.children[0].style.background="green";
			this.$refs.Button.children[0].style.color="white";
				
		}
		
	
	
	},

	methods:{
			
			
			//Обработка нажатия кнопок дней этого месяца
			OnClick(){
				
				
				if(this.AnimationIsPlaying==false && this.SelectedDate!=this.NumberOfDay){
				//Если анимация календаря не проигрывается, то кнопка будет нажиматься, если выбранная в месяце дата будет отлична от даты это кнопки
				//то есть если кнопка активна, то анимации происходить не будет
					
					this.$refs.Button.children[0].classList.add("OnclickClass");//добавить класс к новой активной кнопке(проигрывание анимации)
					
					//Убираем класс анимации, чтобы сохранить свойства кнопки и она не анимировлась при прокручивании блока месяца в режиме месяца
					//Для того, чтобы setTimeout правильно работал (код запускался через указанное время), используем скобочную функцию
					setTimeout(
						
						()=>{this.$refs.Button.children[0].classList.remove("OnclickClass")}
						
					,250)
					
					
					//Отправляем событие для обработки родителем и значение нового выбранного дня
					this.$emit('ButtonWasClicked',this.NumberOfDay,this.Week);
						
				}
				
			},
			
			//Обработка нажатия кнопок дней соседнего месяца
			ChangeMonth(){
				
				if(this.AnimationIsPlaying==false){//Если анимация календаря не проигрывается, то кнопка будет нажиматься
					
					let Message='';
					
					if(this.DataOfDay.Status=='DayFromLastMonth'){
						
						Message='ChooseLastMonth';	
							
					}else if(this.DataOfDay.Status=='DayFromNextMonth'){
						
						Message='ChooseNextMonth';
						
					}
										
					//Отправляем событие для обработки родителем и значение нового выбранного дня
					this.$emit('ChangeMonth',Message,this.NumberOfDay,this.ActiveMonthOrWeek);
				
				}
				
			}
			
		},	
}





*/



