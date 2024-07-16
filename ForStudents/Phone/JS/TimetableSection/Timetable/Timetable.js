

let VueComponentTimetable={
	
	
	data(){
			return{
				
				ScrollSnapObject:{//объект, в котором будет храниться данные для контейнера с прокруткой
					
					//CSS селектор объекта, который должен быть контейнером с прокруткой ScrollSnap
					Container:'#Timetable',
					
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
				
				ScrollSnap:'',//Хранение объекта ScrollSnap
				
				PresentBlockDataObject:'',//Объект состояния для нынешнего блока
				
				LeftBlockDataObject:'',//Объект состояния для левого блока
				
				RightBlockDataObject:'',//Объект состояния для правого блока

				NumberOfActiveLesson:'',//Объект для хранения номера активного сейчас урока
				
				LessonTime:[//Массив со временем всех уроков
				
					{BottomLimit_Hours:9,BottomLimit_Minutes:30, TopLimit_Hours:11, TopLimit_Minutes:0,},
					{BottomLimit_Hours:11,BottomLimit_Minutes:30, TopLimit_Hours:13, TopLimit_Minutes:0,},
					{BottomLimit_Hours:13,BottomLimit_Minutes:30, TopLimit_Hours:15, TopLimit_Minutes:0,},
					{BottomLimit_Hours:15,BottomLimit_Minutes:10, TopLimit_Hours:16, TopLimit_Minutes:40,},
					{BottomLimit_Hours:16,BottomLimit_Minutes:50, TopLimit_Hours:18, TopLimit_Minutes:20,},
					{BottomLimit_Hours:18,BottomLimit_Minutes:25, TopLimit_Hours:19, TopLimit_Minutes:55,},
					{BottomLimit_Hours:20,BottomLimit_Minutes:00, TopLimit_Hours:21, TopLimit_Minutes:30,}
					
				],
						
			}
			
	},
	
	
	created(){
		
		//Изначально this.SelectedTime будет задаваться так же, как в календаре он изначально задается (тем же алгоритмом):
		//this.SelectedTime={SelectedMonth:'',SelectedDate:''};
		
		//let Now=new Date();//Получаем объект даты для извлечения из него компонентов даты
		//this.SelectedTime.SelectedMonth = Now.getMonth()+1;//возвращает месяц в формате числа от 0 до 11 		
		//(0 – январь, 1 – февраль, 2 – март, ..., 11 – декабрь);
		//this.SelectedTime.SelectedDate = Now.getDate();//возвращает число месяца от 1 до 31;
		//Данные загружены в this.SelectedTime
		
		//Загрузка данных в this.PresentDataObject
		this.PresentBlockDataObject=this.$store.state.PresentBlockDataObject;
		
		//{Exists:'Exist', SelectedMonth:this.SelectedTime.SelectedMonth,SelectedDate:this.SelectedTime.SelectedDate};
		
		//Загрузка данных в this.LeftBlockDataObject
		this.LoadDataInLeftBlockDataObject();
			
		//Загрузка данных в RightBlockDataObject
		this.LoadDataInRightBlockDataObject();
		
		//Функция реагирования на изменения в выбранном времени в блоке календаря
		this.$watch('$store.state.PresentBlockDataObject',(PresentBlockDataObject_newValue)=>{
				
			this.PresentBlockDataObject=this.$store.state.PresentBlockDataObject;
			
			//{Exists:'Exist', SelectedMonth:SelectedTime.SelectedMonth,SelectedDate:SelectedTime.SelectedDate};
		
			//Загрузка данных в this.LeftBlockDataObject
			this.LoadDataInLeftBlockDataObject();
			
			//Загрузка данных в RightBlockDataObject
			this.LoadDataInRightBlockDataObject();
		
		});
		
		//Изначально устанавливаем активный урок
		this.NumberOfActiveLesson=this.GetNumberOfActiveLesson();
		
		//Далее каждую секунду следим за тем, какой  урок сейчас активен (если сейчас никакой урок не активен, то получаем значение null):
		let TimerForCheckActivityOfLessons =setInterval(()=>{//Чтобы нормально работать с this используем стрелочную функцию
			
			if(this.NumberOfActiveLesson!=this.GetNumberOfActiveLesson()){//Если новый активный урок отличается от прошлого
				
				this.NumberOfActiveLesson=this.GetNumberOfActiveLesson();//То присваиваем ему новое значение
						
			}	
					
		},1000);
		
			
	},
	
	
	components:{
	 
		'TimetableBlockOfDay': VueComponentTimetableBlockOfDay,
	  
	},
	

	template:`
	
	<div  id='Timetable' ref='Timetable'>
		
		<TimetableBlockOfDay
		
			v-bind:DataOfDay='LeftBlockDataObject'
			
			v-bind:NumberOfActiveLesson='NumberOfActiveLesson'
		
		></TimetableBlockOfDay>
		
		<TimetableBlockOfDay
		
			v-bind:DataOfDay='PresentBlockDataObject'
			
			v-bind:NumberOfActiveLesson='NumberOfActiveLesson'
		
		></TimetableBlockOfDay>
		
		<TimetableBlockOfDay
		
			v-bind:DataOfDay='RightBlockDataObject'
			
			v-bind:NumberOfActiveLesson='NumberOfActiveLesson'
		
		></TimetableBlockOfDay>
		
	</div>
		
		
	`,
	


	methods:{
			
		//Загрузка данных в this.LeftBlockDataObject
		LoadDataInLeftBlockDataObject:function(){
				
			//Загрузка данных в this.LeftDataObject
			if(this.PresentBlockDataObject.SelectedDate>1){
									
				this.LeftBlockDataObject={Exists:'Exist', SelectedMonth:this.PresentBlockDataObject.SelectedMonth,SelectedDate:this.PresentBlockDataObject.SelectedDate-1};	
									
			}else if(this.PresentBlockDataObject.SelectedDate==1){
									
				if(this.PresentBlockDataObject.SelectedMonth>1){
											
					let DateInLastMonthForPresentBlockDataObject=new Date(new Date().getFullYear(),this.PresentBlockDataObject.SelectedMonth-2,1).daysInMonth();
											
					this.LeftBlockDataObject={Exists:'Exist', SelectedMonth:this.PresentBlockDataObject.SelectedMonth-1,SelectedDate:DateInLastMonthForPresentBlockDataObject};	
											
				}else if(this.PresentBlockDataObject.SelectedMonth==1){
						
					let DateInLastMonthForPresentBlockDataObject=new Date(new Date().getFullYear(),this.PresentBlockDataObject.SelectedMonth-2,1).daysInMonth();
						
					this.LeftBlockDataObject={Exists:'NotExist', SelectedMonth:this.PresentBlockDataObject.SelectedMonth-1,SelectedDate:DateInLastMonthForPresentBlockDataObject};
						
				}
									
			}	
				
		},
			
		//Загрузка данных в RightBlockDataObject
		LoadDataInRightBlockDataObject:function(){
					
			//Загрузка данных в this.RightDataObject	
			if(this.PresentBlockDataObject.SelectedDate<new Date(new Date().getFullYear(),this.PresentBlockDataObject.SelectedMonth-1,1).daysInMonth()){
									
				this.RightBlockDataObject={Exists:'Exist', SelectedMonth:this.PresentBlockDataObject.SelectedMonth,SelectedDate:this.PresentBlockDataObject.SelectedDate+1};	
									
			}else if(this.PresentBlockDataObject.SelectedDate==new Date(new Date().getFullYear(),this.PresentBlockDataObject.SelectedMonth-1,1).daysInMonth()){
										
				if(this.PresentBlockDataObject.SelectedMonth<12){
											
					this.RightBlockDataObject={Exists:'Exist', SelectedMonth:this.PresentBlockDataObject.SelectedMonth+1,SelectedDate:1};	
											
				}else if(this.PresentBlockDataObject.SelectedMonth==12){
						
					this.RightBlockDataObject={Exists:'NotExist', SelectedMonth:this.PresentBlockDataObject.SelectedMonth+1,SelectedDate:1};
						
				}
										
			}
				
		},
			
		ConfigurePositionsOfBlocks:function(){
				
			//Настраиваем положение скрола для отображения соответствующего блока
			if(
					
				this.LeftBlockDataObject.Exists=='Exist' && this.RightBlockDataObject.Exists=='Exist'
							
				||
							
				this.LeftBlockDataObject.Exists=='Exist' && this.RightBlockDataObject.Exists=='NotExist'
							
			){
					
				this.ScrollSnap.SetBlockInCenterOfContainer(1);
					
							
			}else if(this.LeftBlockDataObject.Exists=='NotExist' && this.RightBlockDataObject.Exists=='Exist'){
					
				this.ScrollSnap.SetBlockInCenterOfContainer(0);
					
			}
						
		},
			
			
		GetNumberOfActiveLesson:function(){
				
			NumberOfActiveLesson=null;//Изначально номер активного урока равен null
				
			let Now = new Date();//Получаем нынешнее время
				
			let Year=Now.getFullYear();//Из нынешнего времени получаем год
			let Month=Now.getMonth();//Из нынешнего времени получаем месяц
			let Day=Now.getDate();//Из нынешнего времени получаем число месяца
				
			Now = Now.getTime();//Получаем нынешнее время в секундах
				
			let Time_BottomLimit=null;//Переменная для хранения объекта времени начала урока
					
			let Time_TopLimit=null;//Переменная для хранения объекта времени конца урока
				
				
			for(let i=0; i<=6;i++){
											
				Time_BottomLimit=new Date(Year, Month, Day, this.LessonTime[i].BottomLimit_Hours, this.LessonTime[i].BottomLimit_Minutes).getTime();
					
				Time_TopLimit=new Date(Year, Month, Day, this.LessonTime[i].TopLimit_Hours, this.LessonTime[i].TopLimit_Minutes).getTime();
						
				if(Time_BottomLimit<Now && Now<Time_TopLimit){
				//Если выполнилось условие, что ныншене время находится в одном из промежутков, то выходим из цикла
							
					NumberOfActiveLesson=i+1;

					break;	
						
				}
					
			}
			//Если Now не попало ни в один из промежутков, то NumberOfActiveLesson остается null и мы его возвращаем
				
			return NumberOfActiveLesson;
			
		},			
				
	},
	
	mounted(){
		
		
		//Создаем объект класса ScrollSnap для слежки за скроллом 
		//и реализации свойства Scroll Snap
		
		//Изначальное положение центрального блока задано в объекте конфигурации ScrollSnap
		this.ScrollSnap=new ScrollSnapForTimetable(this.ScrollSnapObject);
		
		//Обновляем массив активных блоков в ScrollSnap:
		
		//Обновляем массив условий активности блоков
		this.ScrollSnap.ArrayOfConditionsForExistOfBlocks[0]=this.LeftBlockDataObject.Exists=='Exist';
		
		//Обновляем массив условий активности блоков
		this.ScrollSnap.ArrayOfConditionsForExistOfBlocks[2]=this.RightBlockDataObject.Exists=='Exist';
		
		//Заполняем массив активным DOM и элементами
		this.ScrollSnap.ArrayOfActiveChildrenBlocks=this.ScrollSnap.getArrayOfActiveChildrenBlocks();
		
		//После создания DOM составляем активные блоки
		
		this.ConfigurePositionsOfBlocks();
		
		
		//Определяем функции реагирвоания на достижение скроллом начала и конца линии прокрутки
		//Если скролл достиг левого края, то включаем функцию
		this.ScrollSnap.StartFunctionIfFirstChildrenBlockWasReached=()=>{
			
			//Обновление положения элементов происходит автоматически
			//В обработчике изменения информации о выбранных днях
			
			if(this.LeftBlockDataObject.Exists=='Exist'){
				
				//Отправляем сообщение для обновления данных об отображаемых днях
				this.$store.dispatch({type: 'DayBack'});
							
				//Функция для настройки положения элементов
				this.ConfigurePositionsOfBlocks();	
				
			}
					
		};
		
		
		//Если скролл достиг правого края, то включаем функцию
		this.ScrollSnap.StartFunctionIfLastChildrenBlockWasReached=()=>{
			
			//Обновление положения элементов происходит автоматически
			//В обработчике изменения информации о выбранных днях

			if(this.RightBlockDataObject.Exists=='Exist'){
					
				//Отправляем сообщение для обновления данных об отображаемых днях
				this.$store.dispatch({type: 'DayForward'});
							
				//Функция для настройки положения элементов
				this.ConfigurePositionsOfBlocks();
					
				}

			};
			
			
			//Отслеживание изменений в $store.state.LeftBlockDataObject.Exists
			this.$watch('LeftBlockDataObject.Exists', (LeftBlockExists_newValue)=>{
				//Обновляем массив активных блоков в ScrollSnap:
				
				//Обновляем массив условий активности блоков
				this.ScrollSnap.ArrayOfConditionsForExistOfBlocks[0]=this.LeftBlockDataObject.Exists=='Exist';
				
				//Заполняем массив активным DOM и элементами
				this.ScrollSnap.ArrayOfActiveChildrenBlocks=this.ScrollSnap.getArrayOfActiveChildrenBlocks();
				
//----------------------------------------------------------------------------------------------------------------------------------------			
				//В зависимости от полученных данных изменяем расположение блоков
				this.ConfigurePositionsOfBlocks();//Эксперимент - при любом изменении видимости центрируем блоки
				
				
				
				
			});
			
			//Отслеживание изменений в $store.state.RightBlockDataObject.Exists
			this.$watch('RightBlockDataObject.Exists', (RightBlockExists_newValue)=>{
				//Обновляем массив активных блоков в ScrollSnap:
				
				//Обновляем массив условий активности блоков
				this.ScrollSnap.ArrayOfConditionsForExistOfBlocks[2]=this.RightBlockDataObject.Exists=='Exist';
				
				//Заполняем массив активными DOM элементами
				this.ScrollSnap.ArrayOfActiveChildrenBlocks=this.ScrollSnap.getArrayOfActiveChildrenBlocks();
				
//----------------------------------------------------------------------------------------------------------------------------------------			
				//В зависимости от полученных данных изменяем расположение блоков
				this.ConfigurePositionsOfBlocks();//Эксперимент - при любом изменении видимости центрируем блоки
				
				
			});	

	},	
	
}



































