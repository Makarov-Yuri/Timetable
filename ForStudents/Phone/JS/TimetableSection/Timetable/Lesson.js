
let VueComponentLesson={
	
	
	props:{
		
		LessonDataObject:Object,//Объект данных урока
		
		SubGroup:Number,//Получаем подгруппу
			
		TypeOfWeek:String,//Получаем тип недели
		
		NumberOfActiveLesson:Number,//Номер активного урока или null
			
	},
	
	
	data(){
		
		return{
			
			LessonExists:'',//Показывает существует ли урок
			
			LessonNumber:'',//Номер урока
			
			TimeOfLesson:'',//Время урока
			
			TypeOfLesson:'',//Тип занятия - лаба, лекция, практика
			
			NameOfSubject:'',//Название предмета
			
			Teacher:'',//Преподаватель
			
			Auditorium:'',//Аудитория
				
		}		
	},
	
	
	created(){
		
		//Во время создания блока определяем, какие данные в нем должны быть из объекта общих данных 
		//и загружаем их
		
		this.LessonNumber=this.LessonDataObject.LessonNumber;
			
		this.TimeOfLesson=this.LessonDataObject.TimeOfLesson;
		
		this.SetInformationOfLesson();
		
		//Если изменился тип недели, то заного проводим отображение соовтетствующей информации
		this.$watch('TypeOfWeek', (TypeOfWeek_newValue, TypeOfWeek_oldValue)=>{
			
			this.SetInformationOfLesson();
				
		});
		
		//Если изменился тип недели, то заного проводим отображение соовтетствующей информации
		this.$watch('SubGroup', (TypeOfWeek_newValue, TypeOfWeek_oldValue)=>{
			
			this.SetInformationOfLesson();
				
		});		
		
	},
	
	
	template:`
	
	<div class='Lesson' v-if="LessonExists=='Exists'">
		
		<div class='LessonNumber' ref='HTMLBlockOfLessonNumber'>{{LessonNumber}}</div>
		<div class='TypeOfLesson'>{{TypeOfLesson}}</div>
		<div class='TimeOfLesson'>{{TimeOfLesson}}</div>
		<div class='NameOfSubject'>{{NameOfSubject}}</div>
		<div class='Teacher'>{{Teacher}}</div>
		<div class='Auditorium'>{{Auditorium}}</div>
	</div>
		
		
	`,
	



	methods:{
		
		
		SetInformationOfLesson:function(){
			
			if(this.SubGroup=='1' && this.TypeOfWeek=='Top'){
				
				this.LessonExists=this.LessonDataObject.FirstSubGroupTopWeek.LessonExists;
				
				this.TypeOfLesson=this.LessonDataObject.FirstSubGroupTopWeek.TypeOfLesson;
				
				this.NameOfSubject=this.LessonDataObject.FirstSubGroupTopWeek.NameOfSubject;
				
				this.Teacher=this.LessonDataObject.FirstSubGroupTopWeek.Teacher;
				
				this.Auditorium=this.LessonDataObject.FirstSubGroupTopWeek.Auditorium;
				
			}
			
			
			if(this.SubGroup=='1' && this.TypeOfWeek=='Bottom'){
				
				this.LessonExists=this.LessonDataObject.FirstSubGroupBottomWeek.LessonExists;
				
				this.TypeOfLesson=this.LessonDataObject.FirstSubGroupBottomWeek.TypeOfLesson;
				
				this.NameOfSubject=this.LessonDataObject.FirstSubGroupBottomWeek.NameOfSubject;
				
				this.Teacher=this.LessonDataObject.FirstSubGroupBottomWeek.Teacher;
				
				this.Auditorium=this.LessonDataObject.FirstSubGroupBottomWeek.Auditorium;
				
			}
			
			if(this.SubGroup=='2' && this.TypeOfWeek=='Top'){
				
				this.LessonExists=this.LessonDataObject.SecondSubGroupTopWeek.LessonExists;
				
				this.TypeOfLesson=this.LessonDataObject.SecondSubGroupTopWeek.TypeOfLesson;
				
				this.NameOfSubject=this.LessonDataObject.SecondSubGroupTopWeek.NameOfSubject;
				
				this.Teacher=this.LessonDataObject.SecondSubGroupTopWeek.Teacher;
				
				this.Auditorium=this.LessonDataObject.SecondSubGroupTopWeek.Auditorium;
				
			}
			
			
			if(this.SubGroup=='2' && this.TypeOfWeek=='Bottom'){
				
				this.LessonExists=this.LessonDataObject.SecondSubGroupBottomWeek.LessonExists;
				
				this.TypeOfLesson=this.LessonDataObject.SecondSubGroupBottomWeek.TypeOfLesson;
				
				this.NameOfSubject=this.LessonDataObject.SecondSubGroupBottomWeek.NameOfSubject;
				
				this.Teacher=this.LessonDataObject.SecondSubGroupBottomWeek.Teacher;
				
				this.Auditorium=this.LessonDataObject.SecondSubGroupBottomWeek.Auditorium;
				
			}
			
		},
		
		SetLessonActivity:function(){
				
			if(this.NumberOfActiveLesson==this.LessonNumber && this.LessonExists=='Exists'){//Если блок урока существует в DOM и его номер равен
				//номеру активного урока, то выделяем этот урок
					
					this.$refs.HTMLBlockOfLessonNumber.style.background='green';
					this.$refs.HTMLBlockOfLessonNumber.style.color='white';
						
				}else if(this.LessonExists=='Exists'){//Иначе, если блок активен, то убарем у него стили
													
					this.$refs.HTMLBlockOfLessonNumber.style.background='';
					this.$refs.HTMLBlockOfLessonNumber.style.background='';
					
				}
					
		}	
			
	},
	
	
	mounted(){
		//Когда смонтировали DOM, начинаем работать с ним:
		this.SetLessonActivity();//Изначально выделяем "активный сейчас урок"
			
		//Далее следим за изменениями NumberOfActiveLesson
		this.$watch('NumberOfActiveLesson', (NumberOfActiveLesson_newValue, NumberOfActiveLesson_oldValue)=>{
			
			this.NumberOfActiveLesson=NumberOfActiveLesson_newValue;//Получаем и присваиваем новое значение NumberOfActiveLesson
			this.SetLessonActivity();//Устанавливаем активность урока или дезактивируем его
				
		});
		
		
		//Если изменился тип недели, то заного проводим отображение соовтетствующей информации
		this.$watch('TypeOfWeek', (TypeOfWeek_newValue, TypeOfWeek_oldValue)=>{
			
			this.LessonNumber=this.LessonDataObject.LessonNumber;
			
			this.TimeOfLesson=this.LessonDataObject.TimeOfLesson;
			
			this.SetInformationOfLesson();
			
			this.SetLessonActivity();
			
		});
		
		//Если изменился тип недели, то заного проводим отображение соовтетствующей информации
		this.$watch('SubGroup', (TypeOfWeek_newValue, TypeOfWeek_oldValue)=>{
			
			this.LessonNumber=this.LessonDataObject.LessonNumber;
			
			this.TimeOfLesson=this.LessonDataObject.TimeOfLesson;
			
			this.SetInformationOfLesson();
			
			this.SetLessonActivity();
					
		});		
			
	
	},
	
	
}

















