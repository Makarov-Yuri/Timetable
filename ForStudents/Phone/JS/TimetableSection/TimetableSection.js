

//Устанавливаем для объекта Data новую функцию - получение количества дней в месяце
Date.prototype.daysInMonth = function() {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};





let VueComponentTimetableSection={
	
	
		data(){
		
		return{
				
			//Задаем переменные для компонентов текущей даты:
			
			PresentDate:'',//"Сегодняшняя" дата
			
			PresentMonth:'',//"Сегодняшний" месяц
			
			SelectedDate:'',//Выбранная дата (в серединном блоке)
				
			SelectedMonth:'',//Выбранный месяц	(в серединном блоке)
			
		}
		
	},
	
	
	computed:{
		
		// геттеры вычисляемых значений
		
		ActiveMonthOrWeek:function(){
		
			return this.$store.state.ActiveMonthOrWeek;
		
		},
		
	},
	
	
	created(){
		
		//Сразу после создания блока вычисляем сегодняшнюю дату:
		
		let Now=new Date();//Получаем объект даты для извлечения из него компонентов даты
		this.SelectedMonth=Now.getMonth()+1;//возвращает месяц в формате числа от 0 до 11 		
		//(0 – январь, 1 – февраль, 2 – март, ..., 11 – декабрь);
		this.SelectedDate=Now.getDate();//возвращает число месяца от 1 до 31;
		
		//Загружаем данные в ActiveMonthOrWeek
		this.$store.commit({
			
			type:'SetActiveMonthOrWeek',
			
			ActiveMonthOrWeek:'Week',
			
		});
		
		
		//Загружаем данные в AnimationOfMonthIsPlaying
		this.$store.commit({
			
			type:'SetAnimationOfMonthIsPlaying',
			
			AnimationOfMonthIsPlaying:false,
			
		});
		
		
		
		//Загружаем данные в объекты данных месяцев
		//объектный синтаксис вызова действия
		store.dispatch({
						
			type: 'LoadDataInAllMonthBlockDataObject',
						
			PresentBlockDataObject: {Exists:'Exist', SelectedMonth:this.SelectedMonth, SelectedDate:this.SelectedDate}
			
			//PresentBlockDataObject: {Exists:'Exist', SelectedMonth:9, SelectedDate:2}
			
		});
		
			
		
	},
	
	
	components:{
		
		'Calendar': VueComponentCalendar,
		
		'Timetable': VueComponentTimetable,
		
	},
	
	template:
	
	`
		
		<div id='TimetableSection' ref='TimetableSection'>
			
			<Calendar></Calendar>
			  
			 <Timetable></Timetable>
			
		</div>
		
	`,
	
	
	methods:{
		
	
		
	},
	
	
	
}