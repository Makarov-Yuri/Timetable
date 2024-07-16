


let VueComponentTimetableBlockOfDay={
	
	
	props:{
		
		DataOfDay:Object,//Объект с данными о дне: месяц, число
		
		NumberOfActiveLesson:Number,//Номер активного урока или null
			
	},
	
	
	data(){
			return{
				
				//Объект видимости 
				StyleDisplayObject:null,
				
				SpecialCommentInHoliday:'Выходной',
						 
			}
			
	},
	
	
	
	computed:{
		
		SubGroup:function(){
			
			return this.$store.state.SubGroup;//Получаем номер выбранной подгруппы
			
		},
		
		//Свойство, которое показывает, есть ли активные уроки в дне у данной группы и подгруппы (если есть разница в расписании подгрупп)
		LessonsInDayExists:function(){
			
			//Lesson in DataOfTimetableForGroup.Days[GetNumberOfDayInWeek(DataOfDay)-1].Lessons
			if(typeof (DataOfTimetableForGroup.Days[this.GetNumberOfDayInWeek(this.DataOfDay)-1].Lessons)=='undefined'){
				
				return false;
				
			}else if(typeof (DataOfTimetableForGroup.Days[this.GetNumberOfDayInWeek(this.DataOfDay)-1].Lessons)=='object'){
				
				
				//return DataOfTimetableForGroup.Days[this.GetNumberOfDayInWeek(this.DataOfDay)-1].Lessons;
				
				let LessonExists=false;
				
				
				for(let i=0;i<=DataOfTimetableForGroup.Days[this.GetNumberOfDayInWeek(this.DataOfDay)-1].Lessons.length-1;i++){
					
					
					if(this.SubGroup=='1' && this.GetTypeOfWeek(this.DataOfDay)=='Top'){
						
						if(DataOfTimetableForGroup.Days[this.GetNumberOfDayInWeek(this.DataOfDay)-1].Lessons[i].FirstSubGroupTopWeek.LessonExists=='Exists'){
							
							LessonExists=true;
							
						}
						
					}
					
					
					if(this.SubGroup=='1' && this.GetTypeOfWeek(this.DataOfDay)=='Bottom'){
						
						if(DataOfTimetableForGroup.Days[this.GetNumberOfDayInWeek(this.DataOfDay)-1].Lessons[i].FirstSubGroupBottomWeek.LessonExists=='Exists'){
							
							LessonExists=true;
							
						}
						
					}
					
					
					if(this.SubGroup=='2' && this.GetTypeOfWeek(this.DataOfDay)=='Top'){
						
						if(DataOfTimetableForGroup.Days[this.GetNumberOfDayInWeek(this.DataOfDay)-1].Lessons[i].SecondSubGroupTopWeek.LessonExists=='Exists'){
							
							LessonExists=true;
							
						}
						
					}
					
					
					if(this.SubGroup=='2' && this.GetTypeOfWeek(this.DataOfDay)=='Bottom'){
						
						if(DataOfTimetableForGroup.Days[this.GetNumberOfDayInWeek(this.DataOfDay)-1].Lessons[i].SecondSubGroupBottomWeek.LessonExists=='Exists'){
							
							LessonExists=true;
							
						}
						
					}
	
				}
				
				return LessonExists;
				
			}
				
		},
		
		LessonExistsInMonth:function(){
			
			if(
				
				DataOfTimetableForGroup.SemesterNumber==1 && this.DataOfDay.SelectedMonth>=9
				
				||
				
				DataOfTimetableForGroup.SemesterNumber==2 && this.DataOfDay.SelectedMonth<=5
				
			){
				
				return true
				
			}else{
			
				return false
			
			}
			
		},	
		
	},
	
	
	created(){
		
		if(this.DataOfDay.Exists=="NotExist"){
				
			this.StyleDisplayObject={display:'none'}
				
		}else if(this.DataOfDay.Exists=="Exist"){
				
			this.StyleDisplayObject={display:''}
				
		}
		
		this.SpecialCommentInHoliday=this.GetSpecialCommentInHoliday();
		
	},
	
	
	components:{
	 
		'Lesson': VueComponentLesson,
	  
	},
	
	
	template:
	
	`
	  
	<div class='TimetableBlockOfDay' v-bind:style="StyleDisplayObject">
	
		<div 
		
			class='Holiday' 
				
			v-if='LessonExistsInMonth==false'
		>
		
			<div class='IMG'><img src='ForStudents/Phone/IMG/ЗнакВШТЭ.png'></div>
			
			<div class='Comment'>Занятий нет</div>
		
		</div>
		
		
		<Lesson
			
			v-if='LessonExistsInMonth==true'
			
			ref="Lessons"
			
			v-for='Lesson in DataOfTimetableForGroup.Days[GetNumberOfDayInWeek(DataOfDay)-1].Lessons'
			
			v-bind:key='GetNumberOfDayInWeek(DataOfDay)*7+Lesson.LessonNumber'
			
			v-bind:SubGroup='SubGroup'
			
			v-bind:TypeOfWeek='GetTypeOfWeek(DataOfDay)'
			
			v-bind:LessonDataObject='Lesson'
			
			v-bind:NumberOfActiveLesson='NumberOfActiveLesson'
			
		></Lesson>
			
		
		<div 
			
			class='Holiday' 
			
			v-if="DataOfTimetableForGroup.Days[GetNumberOfDayInWeek(DataOfDay)-1].TypeOfDay=='Holiday' && LessonExistsInMonth==true"
		
		>
		
			<div class='IMG'><img src='ForStudents/Phone/IMG/ЗнакВШТЭ.png'></div>
			
			
			<div class='Comment'>{{DataOfTimetableForGroup.Days[GetNumberOfDayInWeek(DataOfDay)-1].Comment}}</div>
			
		</div>
		
		<div 
			
			class='Holiday' 
			
			v-if="DataOfTimetableForGroup.Days[GetNumberOfDayInWeek(DataOfDay)-1].TypeOfDay!='Holiday' 
			
			&& LessonsInDayExists==false && LessonExistsInMonth==true"
			
		>
		
			<div class='IMG'><img src='ForStudents/Phone/IMG/ЗнакВШТЭ.png'></div>
			
			<div class='Comment'>{{SpecialCommentInHoliday}}</div>
			
		</div>
		
		
		
		
		
		
		
		
		
		
		
		
	</div>
			
	`,
	
	
	mounted(){
		
		//Стиль отображения объекта
		this.$watch('DataOfDay.Exists', (DataOfDayExists_newValue)=>{
			
			console.log('Был перерасчет видимости дня');
				
			if(this.DataOfDay.Exists=="NotExist"){
					
				this.StyleDisplayObject={display:'none'}
					
			}else if(this.DataOfDay.Exists=="Exist"){
					
				this.StyleDisplayObject={display:''}
					
			}
					
		});	
		
	},
	
	methods:{
		
		//Определяем день недели
		GetNumberOfDayInWeek:function(DataOfDay){
			
			let NumberOfDayInWeek=new Date(new Date().getFullYear(),DataOfDay.SelectedMonth-1,DataOfDay.SelectedDate).getDayInWeek();
			
			return NumberOfDayInWeek;
				
		},
		
		GetTypeOfWeek:function(DataOfDay){
			
			Now = new Date(new Date().getFullYear(),DataOfDay.SelectedMonth-1,DataOfDay.SelectedDate);//Метка времени "сейчас"
			
			var FirstJanuary = new Date(Now.getFullYear(),0,1);//Метка времени 1 января текущего года
			
			//Получаем разницу в количестве дней между сейчас и 1 января текущего года
			var NumberOfDays = Math.floor((Now - FirstJanuary) / (24 * 60 * 60 * 1000));
			
			var WeekNumber = Math.ceil((NumberOfDays)/7);
			
			if(WeekNumber% 2 === 0){return 'Bottom'}else{return 'Top'}
			
			
		},
		
		
		GetSpecialCommentInHoliday:function(){
			
			for(let i=0;i<=DataOfTimetableForGroup.Days.length-1;i++){
				
				if(DataOfTimetableForGroup.Days[i].TypeOfDay=='Holiday'){
					
					if(DataOfTimetableForGroup.Days[i].Comment!='null'||DataOfTimetableForGroup.Days[i].Comment!='Выходной'){
					
						return DataOfTimetableForGroup.Days[i].Comment;
					
					}
				}	
			}	
		},
		
	},
		
	
}




















