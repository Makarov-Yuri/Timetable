

//Устанавливаем для объекта Data новую функцию - получение количества дней в месяце
Date.prototype.daysInMonth = function() {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};



//Устанавливаем для объекта Data новую функцию - получение номера недели
Date.prototype.getNumberOfWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}



// Устанавливаем для объекта Data новую функцию получение номера недели в месяце, начиная с 1
Date.prototype.getWeekOfMonth = function() {
  var firstWeekday = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
  var offsetDate = this.getDate() + firstWeekday - 1;
  return Math.floor(offsetDate / 7)+1;
}


//Устанавливаем для объекта Data новую функцию - получение номера дня недели ( целое число из следующего отрезка:[1;7])
 Date.prototype.getDayInWeek = function() {
		
	if(this.getDay()==0){
		
		return 7;	
		
	}else{
		
		return	this.getDay();
		
	}
};





//Добавить обработку анимации скролла: отключить возможность смены режима месяца во время скролла



let VueComponentCalendar={
	
	
	data(){
		
		return{
				
			ScrollSnapObject:{//объект, в котором будет храниться данные для контейнера с прокруткой
					
				//CSS селектор объекта, который должен быть контейнером с прокруткой ScrollSnap
				Container:'#Calendar',
					
				//критический сдвиг - минимальное расстояние, на которое нужно сдвинуть блок, 
				//чтобы произошла прокрутка к следующему элементу (справа или слева), иначе будет возврат назад
				CriticalShift:10,
					
				//duration in milliseconds - продожительность движения в миллисекундах
				DurationOfAnimation:200,//Передаем продолжительность анимаций
					
				//Номер блока,который изначально будет установлен в центре контейнера
				NumberOfBlockForInitialInstallationInCenterOfContainer:0,
				
				//Передаем массив из условий существования блоков
				ArrayOfConditionsForExistOfBlocks:[true,true,true],
				
			},
			
			ScrollSnap:{},//Хранение объекта ScrollSnap
			
			
			
			
		}
		
	},
	
	
	
	computed:{
		
		AnimationOfMonthIsPlaying:function(){return this.$store.state.AnimationOfMonthIsPlaying},
		
		AnimationOfCalendarIsPlaying:function(){return this.$store.state.AnimationOfCalendarIsPlaying},
		
		ActiveMonthOrWeek:function(){return this.$store.state.ActiveMonthOrWeek},
		
	},
	
	
	
	
	components:{
			
		'Month': VueComponentMonth,
			
	},
	
	created(){
		
		
	},
	
	
	
	
	
	
	
			
		
	
	template:
	
	`
		<div id='Calendar' ref='Calendar'>
			
			<Month 
				
				v-bind:DataOfMonth='$store.state.LeftBlockDataObject'
				
			></Month>
			
			
			<Month 
				
				v-bind:DataOfMonth='$store.state.PresentBlockDataObject'
				
			></Month>
			
			
			<Month 
				
				v-bind:DataOfMonth='$store.state.RightBlockDataObject'
				
			></Month>
			
		</div>
	`,	
	
	
	methods:{
		
		 ConfigurePositionsOfBlocks:function(){
			
			//Настраиваем положение скрола для отображения соответствующего блока
			if(
				
				this.$store.state.LeftBlockDataObject.Exists=='Exist' && this.$store.state.RightBlockDataObject.Exists=='Exist'
						
				||
						
				this.$store.state.LeftBlockDataObject.Exists=='Exist' && this.$store.state.RightBlockDataObject.Exists=='NotExist'
						
			){
				
				this.ScrollSnap.SetBlockInCenterOfContainer(1);
				
						
			}else if(this.$store.state.LeftBlockDataObject.Exists=='NotExist' && this.$store.state.RightBlockDataObject.Exists=='Exist'){
				
				this.ScrollSnap.SetBlockInCenterOfContainer(0);
				
			}
					
		},
			   	
	},
			
	
	
	
	mounted(){//После заполнения шаблона можно работать с ним:
		
		//Создаем объект класса ScrollSnap для слежки за скроллом 
		//и реализации свойства Scroll Snap
		
		//Изначальное положение центрального блока задано в объекте конфигурации ScrollSnap
		this.ScrollSnap=new ScrollSnapForCalendar(this.ScrollSnapObject);
		
		//Обновляем массив активных блоков в ScrollSnap:
		
		//Обновляем массив условий активности блоков
		this.ScrollSnap.ArrayOfConditionsForExistOfBlocks[0]=this.$store.state.LeftBlockDataObject.Exists=='Exist';
		
		//Обновляем массив условий активности блоков
		this.ScrollSnap.ArrayOfConditionsForExistOfBlocks[2]=this.$store.state.RightBlockDataObject.Exists=='Exist';
		
		//Заполняем массив активным DOM и элементами
		this.ScrollSnap.ArrayOfActiveChildrenBlocks=this.ScrollSnap.getArrayOfActiveChildrenBlocks();
		
		//После создания DOM составляем активные блоки
		
		this.ConfigurePositionsOfBlocks();
		
		//Определяем функции реагирвоания на достижение скроллом начала и конца линии прокрутки
		//Если скролл достиг левого края, то включаем функцию
		this.ScrollSnap.StartFunctionIfFirstChildrenBlockWasReached=()=>{
			
			let LeftBlockDataObject=this.$store.state.LeftBlockDataObject;
			
			if(LeftBlockDataObject.Exists=='Exist'){
				
				console.log('Левый конец достигнут');
				
				let PresentBlockDataObject=null;//Переменная для нового блока нынешней даты
				
				if(this.$store.state.ActiveMonthOrWeek=='Month'){
					
					//Если левый блок активен, то ему присуще свойство SelectedMonth
					if(LeftBlockDataObject.SelectedMonth>=1){
									
						//Копируем все свойства из this.LeftBlockDataObject в this.PresentBlockDataObject
						PresentBlockDataObject={Exists:LeftBlockDataObject.Exists, SelectedMonth:LeftBlockDataObject.SelectedMonth,SelectedDate:LeftBlockDataObject.SelectedDate};					
											
					}
					
				}else if(this.$store.state.ActiveMonthOrWeek=='Week'){
						
					if(LeftBlockDataObject.SelectedMonth>1 || LeftBlockDataObject.SelectedMonth==1 && LeftBlockDataObject.SelectedDate>7){
						
						//Копируем все свойства из this.LeftBlockDataObject в this.PresentBlockDataObject
						PresentBlockDataObject={Exists:LeftBlockDataObject.Exists, SelectedMonth:LeftBlockDataObject.SelectedMonth,SelectedDate:LeftBlockDataObject.SelectedDate};					
						
					}else if(LeftBlockDataObject.SelectedMonth==1 && LeftBlockDataObject.SelectedDate<7 && LeftBlockDataObject.SelectedDate>1){
						
						//Копируем все свойства из this.LeftBlockDataObject в this.PresentBlockDataObject
						PresentBlockDataObject={Exists:LeftBlockDataObject.Exists, SelectedMonth:LeftBlockDataObject.SelectedMonth,SelectedDate:LeftBlockDataObject.SelectedDate};					
						
					}else if(LeftBlockDataObject.SelectedDate==1){
									
						//Копируем все свойства из this.LeftBlockDataObject в this.PresentBlockDataObject
						PresentBlockDataObject={Exists:LeftBlockDataObject.Exists, SelectedMonth:LeftBlockDataObject.SelectedMonth,SelectedDate:LeftBlockDataObject.SelectedDate};					
											
					}
		
				}
				
				
				//Если фукнция не дала новое значение для PresentBlockDataObject, значит, слева уже нет блоков, поэтому никакого действия не требуется
				//иначе, если данные загружены, то отправляем запрос на изменение данных у блоков
				if(PresentBlockDataObject!=null){
					
					//Отправляем запрос на совершение действия для изменения данных в месяцах:
					
					//Загружаем данные в объекты данных месяцев
					//объектный синтаксис вызова действия
					this.$store.dispatch({
									
						type: 'LoadDataInAllMonthBlockDataObject',
									
						PresentBlockDataObject:PresentBlockDataObject,
									
					});
							
					//Функция для настройки положения элементов
					this.ConfigurePositionsOfBlocks();
					
					
				}
				
				//----------------------------------------------------------------------------------------------------------------------------------
				//Анимация может быть вызвана за счет нажатия на кнопку из другого месяца, для дальнейшней работы подобных кнопок в конце анимации 
				//указываем, что анимация закончилась - изменяем AnimationOfCalendarIsPlaying за счет мутации
				this.$store.commit({type: 'SetAnimationOfCalendarIsPlaying',AnimationOfCalendarIsPlaying:false});
				
				
			}
				
		};
		
		
		//Если скролл достиг правого края, то включаем функцию
		this.ScrollSnap.StartFunctionIfLastChildrenBlockWasReached=()=>{
			
			let RightBlockDataObject=this.$store.state.RightBlockDataObject;
			
			if(RightBlockDataObject.Exists=='Exist'){
				
				console.log('Правый конец достигнут');
				
				let PresentBlockDataObject=null;//Переменная для нового блока нынешней даты
				
				if(this.$store.state.ActiveMonthOrWeek=='Month'){
											
					//Если правый блок активен, то ему присуще свойство SelectedMonth
					if(RightBlockDataObject.SelectedMonth<=12){
						
						//Копируем все свойства из this.RightBlockDataObject в this.PresentBlockDataObject
						PresentBlockDataObject={Exists:RightBlockDataObject.Exists, SelectedMonth:RightBlockDataObject.SelectedMonth,SelectedDate:RightBlockDataObject.SelectedDate};	
						
					}
					
											
				}else if(this.$store.state.ActiveMonthOrWeek=='Week'){
					
					if(RightBlockDataObject.SelectedMonth<12 || RightBlockDataObject.SelectedMonth==12 && RightBlockDataObject.SelectedDate+7<31){
						
						//Копируем все свойства из this.RightBlockDataObject в this.PresentBlockDataObject
						PresentBlockDataObject={Exists:RightBlockDataObject.Exists, SelectedMonth:RightBlockDataObject.SelectedMonth,SelectedDate:RightBlockDataObject.SelectedDate};	
						
					}else if(RightBlockDataObject.SelectedDate+7>31){
						
						//Копируем все свойства из this.RightBlockDataObject в this.PresentBlockDataObject
						PresentBlockDataObject={Exists:RightBlockDataObject.Exists, SelectedMonth:RightBlockDataObject.SelectedMonth,SelectedDate:RightBlockDataObject.SelectedDate};
						
					}
					
				}
				
				//Если фукнция не дала новое значение для PresentBlockDataObject, значит, справа уже нет блоков, поэтому никакого действия не требуется
				//иначе, если данные загружены, то отправляем запрос на изменение данных у блоков
				if(PresentBlockDataObject!=null){
					
					//Отправляем запрос на совершение действия для изменения данных в месяцах:
					
					//Загружаем данные в объекты данных месяцев
					//объектный синтаксис вызова действия
					this.$store.dispatch({
									
						type: 'LoadDataInAllMonthBlockDataObject',
									
						PresentBlockDataObject:PresentBlockDataObject,
									
					});
							
					//Функция для настройки положения элементов
					this.ConfigurePositionsOfBlocks();
					
				}
				
				
				//----------------------------------------------------------------------------------------------------------------------------------
				//Анимация может быть вызвана за счет нажатия на кнопку из другого месяца, для дальнейшней работы подобных кнопок в конце анимации 
				//указываем, что анимация закончилась - изменяем AnimationOfCalendarIsPlaying за счет мутации
				this.$store.commit({type: 'SetAnimationOfCalendarIsPlaying',AnimationOfCalendarIsPlaying:false});
				
			}
				
		};
		
		
		//Отслеживание изменений в $store.state.LeftBlockDataObject.Exists
		this.$watch('$store.state.LeftBlockDataObject.Exists', (LeftBlockExists_newValue)=>{
			//Обновляем массив активных блоков в ScrollSnap:
			
			//Обновляем массив условий активности блоков
			this.ScrollSnap.ArrayOfConditionsForExistOfBlocks[0]=this.$store.state.LeftBlockDataObject.Exists=='Exist';
			
			//Заполняем массив активным DOM и элементами
			this.ScrollSnap.ArrayOfActiveChildrenBlocks=this.ScrollSnap.getArrayOfActiveChildrenBlocks();
//----------------------------------------------------------------------------------------------------------------------------------------			
			this.ConfigurePositionsOfBlocks();//Эксперимент - при любом изменении видимости центрируем блоки
		});
		
		//Отслеживание изменений в $store.state.RightBlockDataObject.Exists
		this.$watch('$store.state.RightBlockDataObject.Exists', (RightBlockExists_newValue)=>{
			//Обновляем массив активных блоков в ScrollSnap:
			
			//Обновляем массив условий активности блоков
			this.ScrollSnap.ArrayOfConditionsForExistOfBlocks[2]=this.$store.state.RightBlockDataObject.Exists=='Exist';
			
			//Заполняем массив активными DOM элементами
			this.ScrollSnap.ArrayOfActiveChildrenBlocks=this.ScrollSnap.getArrayOfActiveChildrenBlocks();
//----------------------------------------------------------------------------------------------------------------------------------------
			this.ConfigurePositionsOfBlocks();//Эксперимент - при любом изменении видимости центрируем блоки
			
			
		});
		
						
		//Отслеживание изменений в ActiveMonthOrWeek для редактирования шаблона
		this.$watch('ActiveMonthOrWeek', (ActiveMonthOrWeek_newValue, ActiveMonthOrWeek_oldValue)=>{
			
			//При любом изменении режима месяца обновляем положение центрального блока
			//Так как может появится или исчезнуть какой-то блок, что приведет к смещению видимого блока
			//и может быть виден другой, неативный блок
			
			//this.ConfigurePositionsOfBlocks();
			
			
		});
		
		
		//Отслеживание изменений в AnimationOfMonthIsPlaying для редактирования шаблона
		this.$watch('AnimationOfMonthIsPlaying', (AnimationOfMonthIsPlaying_newValue, AnimationOfMonthIsPlaying_oldValue)=>{	
			//Если AnimationOfMonthIsPlaying==true, то "выключаем" возможность скроллить календарь, иначе "включаем" такую возможность
			//Если началась анимация календаря, то устанавливаем серединный блок по середине (это будет иметь влияние,
			//если у нас происходит анимация крайнего месяца - тогда активным блоком станет ранее неактивный)
			
			if(AnimationOfMonthIsPlaying_newValue==false){
				//После конца анимации загружаем новые данные в объекты месяцев и далее блоки месяцев
				
				//Генерируем и устанавливаем данные в LeftBlockDataObject на основе PresentBlockDataObject
				this.$store.commit({type:'GenerateAndSetDataForLeftBlockDataObject'});
			
				//Генерируем и устанавливаем данные в RightBlockDataObject на основе PresentBlockDataObject
				this.$store.commit({type:'GenerateAndSetDataForRightBlockDataObject'});
				
				this.$refs.Calendar.style.overflow='';
				
			}else if(AnimationOfMonthIsPlaying_newValue==true){
				
				this.$refs.Calendar.style.overflow='hidden';
			}
			
		});
		
		
		
		//Отслеживание изменений в AnimationOfCalendarIsPlaying для запуска анимации
		this.$watch('AnimationOfCalendarIsPlaying', (AnimationOfCalendarIsPlaying_newValue, AnimationOfCalendarIsPlaying_oldValue)=>{	
			//Если AnimationOfMonthIsPlaying==true, то "выключаем" возможность скроллить календарь, иначе "включаем" такую возможность
			
			//StartAnimation(NumberOfChildrenBlock(NextBlock),ScrollDirection)
			
			if(AnimationOfCalendarIsPlaying_newValue==true){
			
				console.log('Начинаем анимацию '+ this.$store.state.DirectionOfCalendarAnimation);
				
				if(this.$store.state.DirectionOfCalendarAnimation=='Right'){
					
					//Если у нас левый блок активен, то блок справа имеет номер 2
					if(this.$store.state.LeftBlockDataObject.Exists=='Exist'){
						
						this.ScrollSnap.StartAnimation(2,'Right');
					
					//Если у нас левый блок неактивен, то блок справа имеет номер 1					
					}else if(this.$store.state.LeftBlockDataObject.Exists=='NotExist'){
						
						this.ScrollSnap.StartAnimation(1,'Right');
						
					}
					
				}else if(this.$store.state.DirectionOfCalendarAnimation=='Left'){
					
					this.ScrollSnap.StartAnimation(0,'Left');
					
				}	
			
			}
			
		});
		
		
	},
	
		
}
	
	
	
	
	





































